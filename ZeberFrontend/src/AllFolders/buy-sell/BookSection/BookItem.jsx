import React from 'react';
import { FaHeart, FaStar, FaShoppingCart } from 'react-icons/fa';
import './BookItem.css';
import axios from 'axios';

const BookItem = ({ book }) => {
  if (!book) {
    return <p>Loading...</p>;
  }

  // Destructure book object fields
  const { _id, title, name, author, price, mrp ,rating, coverUrls } = book;

  // Conditional logic to display either title (for buy API) or name (for sell API)
  const displayTitle = title || name; // Use title if available, otherwise fallback to name

  const displayprice = price || mrp;

  const addToCart = async (bookId) => {
    try {
      const response = await axios.post('http://localhost:8080/addToCart', {
        data: {
          id: bookId,
        },
        quantity: 1,
      });
      console.log('Added to cart:', response.data);
    } catch (error) {
      if (error.response) {
        console.error('Server responded with error:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
      console.error('Error details:', error.config);
    }
  };

  return (
    <div className="book-card">
      <div className="book-image-container">
        <img
          src={coverUrls && coverUrls[0]}
          alt={`${displayTitle} Cover`}
          className="book-image"
        />
        <span className="book-heart">
          <FaHeart />
        </span>
      </div>
      <div className="book-details">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="book-author">{author}</span>
          <div className="book-rating">
            <span className="rating-number">{rating}</span>
            <FaStar className="rating-star" />
          </div>
        </div>
        <h3 className="book-title">{displayTitle}</h3>
        <div className="book-footer">
          <span className="book-price">${displayprice}</span>
          <FaShoppingCart
            className="book-icon"
            onClick={() => addToCart(_id)}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>
    </div>
  );
};

export default BookItem;


// import axios from 'axios';
// import React from 'react';

// const BookItem = ({ book }) => {
//   const addToCart = async () => {
//     try {
//       const response = await axios.post('http://localhost:8080/addToCart', {
//         id: book.id,
//         quantity: 1, // or any other quantity logic you have
//       });
//       console.log('Added to cart:', response.data);
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//     }
//   };

//   return (
//     <div className="book-item">
//       <h3>{book.title}</h3>
//       <button onClick={addToCart}>Add to Cart</button>
//     </div>
//   );
// };

// export default BookItem;
