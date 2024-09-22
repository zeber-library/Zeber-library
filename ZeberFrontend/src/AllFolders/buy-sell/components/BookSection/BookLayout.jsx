import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './BookLayout.css';
import axios from 'axios';

function BookLayout() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [type, setType] = useState('buybooks'); 

  useEffect(() => {
    axios.get(`http://localhost:8080/api/books/${id}?type=${type}`)
      .then(response => {
        setBook(response.data);
      })
      .catch(error => {
        console.error('Error fetching book data:', error);
      });
  }, [id, type]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-books">
      <div className="left-section">
        <div className="images">
          {book.coverUrls && book.coverUrls.map((url, index) => (
            <img key={index} src={url} alt={`Book Cover ${index + 1}`} className="book-cover" />
          ))}
        </div>
      </div>

      <div className="right-section">
        <div className="product-header">
          <h1>{type === 'buybooks' ? book.title : book.name}</h1>
          <p>
            {type === 'buybooks' ? 'Paperback – 1 January 2023' : 'Sell Paperback – 1 January 2023'}<br />
            by <span className="author">{book.author}</span> (Author)
          </p>
          <div className="rating">
            <span>{book.rating ? '★★★★☆' : 'No rating'}</span>
            <a href="#">3,243 ratings</a>
            <a href="#">See all formats and editions</a>
          </div>
          {type === 'buybooks' && (
            <p className="emi">
              EMI starts at ₹147 per month. <a href="#">EMI options</a>
            </p>
          )}
        </div>

        <div className="product-details2">
          <h2>Product details</h2>
          <p><span>Title:</span> {type === 'buybooks' ? book.title : book.name}</p>
          <p><span>Author:</span> {book.author}</p>
          <p><span>Rating:</span> {book.rating ? `${book.rating} ★` : 'No rating'}</p>
          <p><span>Price:</span> ₹{type === 'buybooks' ? book.price : book.mrp}</p>
        </div>

        <div className="icons">
          <div className="icon">
            <i className="fa-solid fa-truck"></i>
            <div>{type === 'buybooks' ? 'Free Delivery' : 'Seller Delivery'}</div>
          </div>
          <div className="icon">
            <i className="fa-solid fa-money-check-dollar"></i>
            <div>{type === 'buybooks' ? 'Secure Transaction' : 'Secure Payment'}</div>
          </div>
        </div>
      </div>

      <div className="product-container2">
        <div className="price">₹{type === 'buybooks' ? book.price : book.mrp}<span>.00</span></div>
        <div className="free-delivery">
          {type === 'buybooks' ? 'FREE delivery Tuesday, 3 September' : 'Delivery date to be confirmed'}
        </div>
        <div className="order-time">
          {type === 'buybooks' ? 'Order within <strong>20 hrs 10 mins</strong>.' : 'Contact seller for availability.'}
        </div>
        <div className="delivery-location">
          <span>Deliver to Shruti - Delhi 110043</span>
        </div>
        <div className="stock-warning">
          {type === 'buybooks' ? 'Only 1 left in stock.' : 'Stock available upon request.'}
        </div>
        <div className="buttons">
          {type === 'buybooks' ? (
            <>
              <button className="add-to-cart">Add to Cart</button>
              <button className="buy-now">Buy Now</button>
            </>
          ) : (
            <button className="contact-seller">Contact Seller</button>
          )}
        </div>
        <div className="secure-transaction">{type === 'buybooks' ? 'Secure transaction' : 'Secure payment'}</div>
        <div className="gift-options">
          {type === 'buybooks' && (
            <>
              <input type="checkbox" id="gift" name="gift" />
              <label htmlFor="gift">Add gift options</label>
            </>
          )}
        </div>
        {/* {type === 'buybooks' && (
          <div className="wishlist">Add to Wish List</div>
        )} */}
      </div>
    </div>
  );
}

export default BookLayout;
