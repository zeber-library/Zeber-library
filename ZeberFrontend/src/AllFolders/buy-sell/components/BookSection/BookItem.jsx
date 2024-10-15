import React from 'react';
import { FaHeart, FaStar, FaShoppingCart } from 'react-icons/fa';
import './BookItem.css';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import {  AiFillStar, AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai'; 
import image3 from '../../assests/image3.png'

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
    

<div className="card-wrapper" style={{ position: 'relative' }}>
      {/* Heart icon in the top right corner */}
      
      
      <Card style={{ width: '15rem', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' , borderRadius :'20px' }}>
        <Card.Img
          variant="top"
          src={coverUrls && coverUrls[0]}
                 
      // Replace with your image source
          style={{ height: '220px', objectFit: 'cover' ,  borderRadius :'20px' }}
        />
        <AiOutlineHeart className="heart-icon" style={{ position: 'absolute', top: '0px', right: '0px', fontSize: '30px', color: 'white' ,zIndex:'5' , backgroundColor:'transparent'}} />
        <Card.Body>
          <Card.Title style={{ fontSize: '16px', fontWeight: 'bold' }}>{displayTitle}</Card.Title>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '60px' }}>
  <span>{author}</span>
  
  <span style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
    4.5
    <AiFillStar color="#f1c40f" style={{ marginLeft: '5px' }} />
  </span>
</div>

<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '120px' }}>
  <Card.Text style={{ marginTop: '30px', fontSize: '0.8em', fontWeight: 'bold' }}>
    Rs {displayprice}
  </Card.Text>

  <div className="cart-icon-container">
    <AiOutlineShoppingCart className="cart-icon" onClick={() => addToCart(_id)} />
  </div>
</div>

        </Card.Body>
      </Card>
    </div>


  );
};

export default BookItem;

// import React from 'react';
// import { Card, Button } from 'react-bootstrap';
// import { AiFillStar, AiOutlineShoppingCart } from 'react-icons/ai'; // For star and cart icons

// const PercyJacksonCard = () => {
//   return (
    
//   );
// };

// export default PercyJacksonCard;
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
