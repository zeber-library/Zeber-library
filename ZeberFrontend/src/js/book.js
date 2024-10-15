let favouriteAside = document.querySelector('#FirstPage aside .social .favourite');
let FavCount = document.querySelector('#FirstPage aside .social .fav span');
let navFav = document.querySelector('#MainNav .navRight .favourite');
let popupContainer = document.querySelector('#popupContainer');
let closePopup = document.querySelector('#popupContainer .close');

let FavData = {
    'likes': 123232,
    'share': 867
};

FavCount.innerHTML = FavData.likes.toLocaleString();

let isLiked = false;
let showPopup = false; // Flag to manage popup visibility

favouriteAside.addEventListener("click", (event) => {
    event.preventDefault();
    let incremented = isLiked ? 0 : 1;
    
    if (isLiked) {
        FavData.likes--;
    } else {
        FavData.likes++;
    }
    isLiked = !isLiked;
    
    navFav.setAttribute('data-increment', incremented); // Update the data attribute
    if (incremented) {
        showPopup = true; // Enable popup visibility when liked
        navFav.classList.add('show'); // Show the badge
    } else {
        showPopup = false; // Disable popup visibility when unliked
        navFav.classList.remove('show'); // Hide the badge
    }

    FavCount.innerHTML = FavData.likes.toLocaleString();
});

navFav.addEventListener("click", (event) => {
    event.preventDefault();
    if (showPopup) {
        popupContainer.style.display = 'flex'; // Show the popup
    }
});

closePopup.addEventListener("click", () => {
    popupContainer.style.display = 'none'; // Hide the popup
});

// Optional: Close popup when clicking outside of the popup content
popupContainer.addEventListener("click", (event) => {
    if (event.target === popupContainer) {
        popupContainer.style.display = 'none'; // Hide the popup
    }
});



// Front Page Slide show
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.querySelectorAll("#FirstPage .slides");
    let thumbnails = document.getElementsByClassName("thumbnail");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < thumbnails.length; i++) {
        thumbnails[i].className = thumbnails[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    thumbnails[slideIndex - 1].className += " active";
}


// Description
document.addEventListener("DOMContentLoaded", function () {
    const paragraph = document.getElementById("Description");
    const toggleReadMoreButton = document.querySelector(".toggleReadMore");
    const visibleTextLength = 350;
    const fullText = paragraph.textContent;

    if (fullText.length > visibleTextLength) {
        paragraph.textContent = fullText.slice(0, visibleTextLength) + '...';
        toggleReadMoreButton.textContent = 'Read More';
    } else {
        toggleReadMoreButton.style.display = 'none';
    }

    toggleReadMoreButton.addEventListener('click', function () {
        if (paragraph.textContent.length > visibleTextLength && paragraph.textContent.endsWith('...')) {
            paragraph.textContent = fullText;
            toggleReadMoreButton.textContent = 'Read Less';
        } else {
            paragraph.textContent = fullText.slice(0, visibleTextLength) + '...';
            toggleReadMoreButton.textContent = 'Read More';
        }
    });
});



// Slider
document.addEventListener('DOMContentLoaded', (event) => {
    const slidesContainer = document.querySelector('#SecondPage .slides');
    const slides = document.querySelectorAll('#SecondPage .slide');
    const prevButton = document.querySelector('#SecondPage .prev');
    const nextButton = document.querySelector('#SecondPage .next');
    let currentIndex = 0;

    function updateSlidePosition() {
        let offset = 0;
        const isMobile = window.innerWidth <= 768;

        if (!isMobile) {
            for (let i = 0; i < currentIndex - 1; i++) {
                offset += slides[i].clientWidth;
            }
        } else {
            for (let i = 0; i < currentIndex; i++) {
                offset += slides[i].clientWidth;
            }
        }

        slidesContainer.style.transform = 'translateX(' + (-offset) + 'px)';
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
        updateSlidePosition();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
        updateSlidePosition();
    });

    window.addEventListener('resize', updateSlidePosition);

    // Initial setup
    updateSlidePosition();
});








// rating
document.addEventListener('DOMContentLoaded', (event) => {
    const stars = document.querySelectorAll('#ratingContainer .fa-star');
    let selectedRating = 0;
    let text = document.querySelector('#rateText');
    stars.forEach(star => {
        star.addEventListener('click', (e) => {
            selectedRating = e.target.getAttribute('data-value');
            updateStars(selectedRating);
            if (e.target.getAttribute('data-value') == 1) {
                text.textContent = 'Poor';
            }
            else if (e.target.getAttribute('data-value') == 2) {
                text.textContent = 'Ok';
            }
            else if (e.target.getAttribute('data-value') == 3) {
                text.textContent = 'Good';
            }
            else if (e.target.getAttribute('data-value') == 4) {
                text.textContent = 'Very Good';
            }
            else if (e.target.getAttribute('data-value') == 5) {
                text.textContent = 'Excellent';
            }
        });

        star.addEventListener('mouseover', (e) => {
            const hoverValue = e.target.getAttribute('data-value');
            updateStars(hoverValue, false);

        });

        star.addEventListener('mouseout', () => {
            updateStars(selectedRating, true);
        });
    });

    function updateStars(rating, permanent = true) {
        stars.forEach(star => {
            const starValue = parseInt(star.getAttribute('data-value'));
            if (starValue <= rating) {
                star.classList.add('selected');
            } else {
                star.classList.remove('selected');
            }
        });

        stars.forEach(star => {
            const starValue = parseInt(star.getAttribute('data-value'));
            if (starValue <= rating) {
                star.style.color = permanent ? '#ffcc00' : '#ffcc00'; // Color for the rating
            } else {
                star.style.color = '#ddd'; // Color for non-selected stars
            }
        });
    }
});

// Products 
// Fetching and inserting in slides

// Fetch products from API
// Fetch data and populate the slider
// Fetch and populate the slider with products

fetch('https://freetestapi.com/api/v1/books')
    .then(res => res.json())
    .then(json => {
        const sliderContainer = document.querySelector('#ThirdPage .sliderContainer');
        json.forEach(product => {
            let slide = `
                <div class="product">
                    <div class="image">
                        <img src="${product.cover_image}" alt="Book" />
                    </div>
                    <div class="information">
                        <div class="title">${product.title}</div>
                        <div class="writer">${product.author}</div>
                        <div class="rating">
                            <i class="fa fa-star" data-value="1"></i>
                            <i class="fa fa-star" data-value="2"></i>
                            <i class="fa fa-star" data-value="3"></i>
                            <i class="fa fa-star" data-value="4"></i>
                            <i class="fa fa-star" data-value="5"></i>
                        </div>
                        <div class="price"><sup>₹</sup> 2436.00</div>
                    </div>
                </div>`;
            sliderContainer.innerHTML += slide;
        });
        initializeSliders();
    })
    .catch(error => console.error('Error fetching data: ', error));

// Initialize slider functionality
function initializeSliders() {
    const sliderContainer = document.querySelector('#ThirdPage .sliderContainer');
    const leftControl = document.querySelector('#ThirdPage .leftSlide');
    const rightControl = document.querySelector('#ThirdPage .rightSlide');
    const productWidth = document.querySelector('#ThirdPage .product').offsetWidth;
    const productGap = parseInt(getComputedStyle(sliderContainer).gap);
    let products = document.querySelectorAll('#ThirdPage .product');
    let productCount = document.querySelector('#ThirdPage .productCount');
    let scrollAmount = 0;
    const productsPerScroll = window.innerWidth <= 768 ? 2 : 6; // Number of products to scroll each time
    let currentIndex = 0; // Starting index

    const updateProductCount = () => {
        productCount.textContent = `Showing results ${currentIndex + 1} - ${Math.min(currentIndex + productsPerScroll, products.length)} of ${products.length}`;
    };
    updateProductCount();

    leftControl.addEventListener('click', () => {
        if (scrollAmount > 0) {
            scrollAmount -= (productWidth + productGap) * productsPerScroll;
            sliderContainer.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
            currentIndex = Math.max(currentIndex - productsPerScroll, 0);
            updateProductCount();
        }
    });

    rightControl.addEventListener('click', () => {
        if (scrollAmount < sliderContainer.scrollWidth - sliderContainer.clientWidth) {
            scrollAmount += (productWidth + productGap) * productsPerScroll;
            sliderContainer.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
            currentIndex = Math.min(currentIndex + productsPerScroll, products.length - productsPerScroll);
            updateProductCount();
        }
    });

    updateProductCount();

    window.addEventListener('resize', () => {
        productsPerScroll = window.innerWidth <= 768 ? 2 : 6;
        updateProductCount();
    });
}


// Rating & review System

let data = [
    {
        'star': 5,
        'count': 50,
        'review': 120
    },
    {
        'star': 4,
        'count': 40,
        'review': 120
    },
    {
        'star': 3,
        'count': 3,
        'review': 120
    },
    {
        'star': 2,
        'review': 120,
        'count': 20
    },
    {
        'star': 1,
        'review': 10,
        'count': 10
    }
]

let totalRating = 0;
let totalReviews = 0;
data.forEach(rating => {
    totalRating += rating.count;
    totalReviews += rating.review;
});
data.forEach(rating => {
    let ratingProgress = `
              <div class="stars">
                <p>${rating.star} <span class="star">&#9733;</span></p>
                <div class="progressRating">
                  <div class="bar" style="width: ${(rating.count / totalRating) * 100}%;"></div>
                </div>
                <p>${rating.count.toLocaleString()}</p>
              </div>`;

    document.querySelector('#FourthPage .star-rating').innerHTML += ratingProgress;
});
document.querySelector('#FourthPage .all-Rating .totalRating').innerHTML = `${totalRating.toLocaleString()} Ratings &<br> ${totalReviews.toLocaleString()} Reviews`;


// Comments

fetch(`https://dummyjson.com/comments`)
    .then(response => response.json())
    .then(data => {
        const commentsContainer = document.querySelector('#FourthPage aside .comments');
        const showMoreButton = document.createElement('button');
        showMoreButton.textContent = 'Show More';
        showMoreButton.className = 'show-more';
        commentsContainer.after(showMoreButton);

        const commentsToShow = 2;
        let displayedComments = 0;

        const displayComments = (start, end) => {
            data.comments.slice(start, end).forEach(comment => {
                let userComment = `
                <div class="comment">
                    <div class="CommentHeading">
                        <span>4 <span style="color: gold;"> &#9733; </span></span> <span class="title">&nbsp;Worth the money</span>
                    </div>
                    <div class="commentText">
                        <p>${comment.body}</p>
                        <p class="aboutWriter">
                            ${comment.user.username} <span class="time">●&nbsp; 1 month ago &nbsp;●</span>
                            <span class="like"><i class="fa fa-thumbs-up"></i>&nbsp; <span style="color: #007BFF">${comment.likes}</span></span>
                        </p>
                    </div>
                </div>`;
                commentsContainer.innerHTML += userComment;
            });
            displayedComments = end;
            if (displayedComments >= data.comments.length) {
                showMoreButton.style.display = 'none';
            }
        };

        displayComments(0, commentsToShow);

        showMoreButton.style.display = 'block';
        showMoreButton.addEventListener('click', () => {
            displayComments(displayedComments, displayedComments + commentsToShow);
        });
    })
    .catch(error => console.error('Error fetching data: ', error));





// Our Recommendation
fetch('https://freetestapi.com/api/v1/books')
    .then(res => res.json())
    .then(json => {
        const sliderContainer = document.querySelector('.Recommendation .sliderContainer');
        json.forEach(product => {
            let slide = `
                <div class="product">
                    <div class="image">
                        <img src="${product.cover_image}" alt="Book" />
                    </div>
                    <div class="information">
                        <div class="title">${product.title}</div>
                        <div class="writer">${product.author}</div>
                        <div class="rating">
                            <i class="fa fa-star" data-value="1"></i>
                            <i class="fa fa-star" data-value="2"></i>
                            <i class="fa fa-star" data-value="3"></i>
                            <i class="fa fa-star" data-value="4"></i>
                            <i class="fa fa-star" data-value="5"></i>
                        </div>
                        <div class="price"><sup>₹</sup> 2436.00</div>
                    </div>
                </div>`;
            sliderContainer.innerHTML += slide;
        });
        initializeSlider();
    })
    .catch(error => console.error('Error fetching data: ', error));

// Initialize slider functionality
function initializeSlider() {
    const sliderContainer = document.querySelector('.Recommendation .sliderContainer');
    const leftControl = document.querySelector('.Recommendation .leftSlide');
    const rightControl = document.querySelector('.Recommendation .rightSlide');
    const productWidth = document.querySelector('.Recommendation .product').offsetWidth;
    const productGap = parseInt(getComputedStyle(sliderContainer).gap);
    let products = document.querySelectorAll('.Recommendation .product');
    let productCount = document.querySelector('.Recommendation .productCount');
    let scrollAmount = 0;
    const productsPerScroll = window.innerWidth <= 768 ? 2 : 6; // Number of products to scroll each time
    let currentIndex = 0; // Starting index

    const updateProductCount = () => {
        productCount.textContent = `Showing results ${currentIndex + 1} - ${Math.min(currentIndex + productsPerScroll, products.length)} of ${products.length}`;
    };
    updateProductCount();

    leftControl.addEventListener('click', () => {
        if (scrollAmount > 0) {
            scrollAmount -= (productWidth + productGap) * productsPerScroll;
            sliderContainer.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
            currentIndex = Math.max(currentIndex - productsPerScroll, 0);
            updateProductCount();
        }
    });

    rightControl.addEventListener('click', () => {
        if (scrollAmount < sliderContainer.scrollWidth - sliderContainer.clientWidth) {
            scrollAmount += (productWidth + productGap) * productsPerScroll;
            sliderContainer.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
            currentIndex = Math.min(currentIndex + productsPerScroll, products.length - productsPerScroll);
            updateProductCount();
        }
    });

    updateProductCount();
    window.addEventListener('resize', () => {
        productsPerScroll = window.innerWidth <= 768 ? 2 : 6;
        updateProductCount();
    });
}