import React, { useEffect, useState, useRef } from "react";

const ThirdPage = ({book}) => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerScroll = window.innerWidth <= 768 ? 2 : 6;

  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    // Fetch products and populate the slider
    fetch('https://freetestapi.com/api/v1/books')
      .then(res => res.json())
      .then(json => {
        setProducts(json);
        updateProductCount(0, json.length);  // Update count right after fetching
      })
      .catch(error => console.error('Error fetching data: ', error));
  }, []);


  //useEffect where initialize slider will be callled once the porduct array is ready 
  useEffect(() => {
    if (products.length > 0) {
      initializeSliders();
    }
  }, [products]);

  
//useEffect for the current index 
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);


  //updateProductCount function 
  const updateProductCount = (currentIdx, totalProducts) => {
    const productCountElement = document.querySelector('#ThirdPage .productCount');
    const endRange = Math.min(currentIdx + productsPerScroll, totalProducts);
    productCountElement.textContent = `Showing results ${currentIdx + 1} - ${endRange} of ${totalProducts}`;
  };


  //initializeSliders function 
  const initializeSliders = () => {
    const sliderContainer = document.querySelector('#ThirdPage .sliderContainer');
    const leftControl = document.querySelector('#ThirdPage .leftSlide');
    const rightControl = document.querySelector('#ThirdPage .rightSlide');
    const productWidth = document.querySelector('#ThirdPage .product')?.offsetWidth || 0;
    const productGap = parseInt(getComputedStyle(sliderContainer).gap);
    let scrollAmount = 0;

    // Left control
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

    window.addEventListener('resize', () => {
      updateProductCount(currentIndexRef.current, products.length);
    });
  };

  return (
    <div id="ThirdPage">
      <section id="author">
        <div className="heading">
          <h3>About the Author</h3>
          <span>
            Add author to get new release updates, plus improved recommendations.
          </span>
        </div>

        {/*book card  */}
        <div className="author-card">
          <img src="/Book/images/author.jpg" alt="Image of Author" />
          <div className="details">
            <h4>{book?.author}</h4>
            <div className="cardRating">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
            </div>

            {/** button to add book to favourites  */}
            <button onClick={() => alert('Added to favorites!')}>
              Add to Fav
            </button>
          </div>
        </div>

        
        <div className="description">
           {book?.authorDescription}
        </div>
      </section>

      
      {/*book recommendation slider  */}
      <aside className="featured" id="featured">
        <h1 className="heading">Our Recommendations</h1>
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

            {/*right and left navigation  */}
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
      </aside>
    </div>
  );
};

export default ThirdPage;
