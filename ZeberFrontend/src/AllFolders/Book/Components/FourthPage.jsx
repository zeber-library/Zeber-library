import React, { useEffect, useState , useRef } from "react";

const FourthPage = () => {
  // State to manage the selected star rating
  const [selectedRating, setSelectedRating] = useState(0);
  // State to store fetched comments
  const [comments, setComments] = useState([]);
  // State to control the number of displayed comments
  const [displayedComments, setDisplayedComments] = useState(2);

  const [ratingData, setRatingData] = useState([
    { star: 5, count: 50, review: 120 },
    { star: 4, count: 40, review: 120 },
    { star: 3, count: 3, review: 120 },
    { star: 2, count: 20, review: 120 },
    { star: 1, count: 10, review: 10 }
  ]);

  const [totalRating, setTotalRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  // State to store fetched products
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(currentIndex);
  const productsPerScroll = window.innerWidth <= 768 ? 2 : 6;

  // Calculate total ratings and reviews
  useEffect(() => {
    let totalRatingCount = 0;
    let totalReviewCount = 0;

    ratingData.forEach((rating) => {
      totalRatingCount += rating.count;
      totalReviewCount += rating.review;
    });

    setTotalRating(totalRatingCount);
    setTotalReviews(totalReviewCount);
  }, [ratingData]);


  // Fetch comments and products data
  useEffect(() => {
    fetch("https://dummyjson.com/comments")
      .then((response) => response.json())
      .then((data) => {
        setComments(data.comments);
      })
      .catch((error) => console.error("Error fetching data: ", error));

    fetch("https://freetestapi.com/api/v1/books")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
        updateProductCount(0, json.length);  // Update count right after fetching
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  // Initialize slider and handle controls
  useEffect(() => {
    if (products.length > 0) {
      initializeSlider();
    }
  }, [products]);


    // Update star rating display based on the selected rating
  useEffect(() => {
    const stars = document.querySelectorAll("#ratingContainer .fa-star");
    const updateStars = (rating, permanent = true) => {
      stars.forEach((star) => {
        const starValue = parseInt(star.getAttribute("data-value"));
        if (starValue <= rating) {
          star.classList.add("selected");
        } else {
          star.classList.remove("selected");
        }
        star.style.color = starValue <= rating ? "#ffcc00" : "#ddd";
      });
    };

    // Event listener for star click to set the selected rating
    stars.forEach((star) => {
      star.addEventListener("click", (e) => {
        const rating = e.target.getAttribute("data-value");
        setSelectedRating(rating);
        updateStars(rating);
        const ratingText = ["", "Poor", "Ok", "Good", "Very Good", "Excellent"];
        document.querySelector("#rateText").textContent = ratingText[rating];
      });

      // Event listener for star hover to show preview rating
      star.addEventListener("mouseover", (e) => {
        const hoverValue = e.target.getAttribute("data-value");
        updateStars(hoverValue, false);
      });

      // Event listener for mouse out to revert to selected rating
      star.addEventListener("mouseout", () => {
        updateStars(selectedRating, true);
      });
    });
  }, [selectedRating]);


  //update the product count on moving the slider 
  const updateProductCount = (currentIdx, totalProducts) => {
    const productCountElement = document.querySelector('.Recommendation .productCount');
    const endRange = Math.min(currentIdx + productsPerScroll, totalProducts);
    productCountElement.textContent = `Showing results ${currentIdx + 1} - ${endRange} of ${totalProducts}`;
  };


  //initialize slider for the book coming from the api 
  const initializeSlider = () => {
    const sliderContainer = document.querySelector('.Recommendation .sliderContainer');
    const leftControl = document.querySelector('.Recommendation .leftSlide');
    const rightControl = document.querySelector('.Recommendation .rightSlide');
    const productWidth = document.querySelector('.Recommendation .product')?.offsetWidth || 0;
    const productGap = parseInt(getComputedStyle(sliderContainer).gap);
    let scrollAmount = 0;

    leftControl.addEventListener('click', () => {
      if (scrollAmount > 0) {
        scrollAmount -= (productWidth + productGap) * productsPerScroll;
        sliderContainer.scrollTo({
          left: scrollAmount,
          behavior: 'smooth',
        });
        setCurrentIndex((prevIndex) => {
          const newIndex = Math.max(prevIndex - productsPerScroll, 0);
          updateProductCount(newIndex, products.length);
          return newIndex;
        });
      }
    });

    // Right control
    rightControl.addEventListener('click', () => {
      if (scrollAmount < sliderContainer.scrollWidth - sliderContainer.clientWidth) {
        scrollAmount += (productWidth + productGap) * productsPerScroll;
        sliderContainer.scrollTo({
          left: scrollAmount,
          behavior: 'smooth',
        });
        setCurrentIndex((prevIndex) => {
          const newIndex = Math.min(prevIndex + productsPerScroll, products.length - productsPerScroll);
          updateProductCount(newIndex, products.length);
          return newIndex;
        });
      }
    });


    // Window resize
    window.addEventListener('resize', () => {
      updateProductCount(currentIndexRef.current, products.length);
    });
  };

  // Load more comments when the "Show More" button is clicked
  const handleShowMore = () => {
    setDisplayedComments((prev) => Math.min(prev + 2, comments.length));
  };



  return (
    <div id="FourthPage">
      <section>
        <div className="heading">
          <h1>Ratings & Reviews</h1>
          <button>
            <h2>Write Review</h2>
          </button>
        </div>

        {/*rating */}
        <div className="rating">
          <div className="overall">
            <div className="all-Rating">
              <h1>
                4.3 <span>&#9733;</span>
              </h1>
             
            </div>

            {/*star rating  */}
            <div className="star-rating">
            {ratingData.map((rating, index) => (
                <div className="stars" key={index}>
                  <p>
                    {rating.star} <span className="star">&#9733;</span>
                  </p>
                  <div className="progressRating">
                    <div
                      className="bar"
                      style={{ width: `${(rating.count / totalRating) * 100}%` }}
                    ></div>
                  </div>
                  <p>{rating.count.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>


          {/**give rating  ok poor good  excellent  */}
          <div className="rate">
            <h3>How would you like to rate this book?</h3>

            {/**rating container  */}
            <div id="ratingContainer">
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((value) => (
                  <i key={value} className="fa fa-star" data-value={value}></i>
                ))}
              </div>
              <span id="rateText"></span>
            </div>
          </div>
        </div>
      </section>
      <aside>

        {/*mapping and displaying all  comments  */}
        <div className="comments">
          {comments.slice(0, displayedComments).map((comment, index) => (
            <div key={index} className="comment">
              <div className="CommentHeading">
                <span>
                  4 <span style={{ color: "gold" }}> &#9733; </span>
                </span>
                <span className="title">&nbsp;Worth the money</span>
              </div>
              <div className="commentText">
                <p>{comment.body}</p>
                <p className="aboutWriter">
                  {comment.user.username}{" "}
                  <span className="time">●&nbsp; 1 month ago &nbsp;●</span>
                  <span className="like">
                    <i className="fa fa-thumbs-up"></i>&nbsp;{" "}
                    <span style={{ color: "#007BFF" }}>{comment.likes}</span>
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
        {displayedComments < comments.length && (
          <button className="show-more" onClick={handleShowMore}>
            Show More
          </button>
        )}
      </aside>

      {/**recommendation book slider  */}
      <div className="Recommendation">
        <h3 className="heading">Customers who read this book also read</h3>
        <div className="productSlider">
          <span className="productCount"></span>
          <div className="sliderContainer">
            {products.map((product, index) => (
              <div className="product" key={index}>
                <div className="image">
                  <img src={product.cover_image} alt="Book" />
                </div>
                <div className="information">
                  <div className="title">{product.title}</div>
                  <div className="writer">{product.author}</div>
                  <div className="rating">
                    <i className="fa fa-star" data-value="1"></i>
                    <i className="fa fa-star" data-value="2"></i>
                    <i className="fa fa-star" data-value="3"></i>
                    <i className="fa fa-star" data-value="4"></i>
                    <i className="fa fa-star" data-value="5"></i>
                  </div>
                  <div className="price"><sup>₹</sup> 2436.00</div>
                </div>
              </div>
            ))}

            {/* right and left control  */}
            <nav>
              <span className="control leftSlide">
                <i className="fa fa-chevron-left"></i>
              </span>
              <span className="control rightSlide">
                <i className="fa fa-chevron-right"></i>
              </span>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FourthPage;
