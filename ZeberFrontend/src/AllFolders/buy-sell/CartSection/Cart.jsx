import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './cartpage.css';

const Cart = ({ deliveryCharge }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/cartItems');
        console.log('API response:', response.data);

        // Ensure data format is valid and use populated books array
        if (response.data && response.data.length > 0 && Array.isArray(response.data[0].books)) {
          setCartItems(response.data[0].books);
          setSelectedItems(
            response.data[0].books.reduce((acc, item) => {
              if (item && item._id) {
                acc[item._id] = false;
              }
              return acc;
            }, {})
          );
        } else {
          setError('Invalid data format received');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setError('Failed to load cart items');
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleIncrement = (id) => {
    const updatedItems = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: (item.quantity || 0) + 1 } : item
    );
    setCartItems(updatedItems);
  };

  const handleDecrement = (id) => {
    const updatedItems = cartItems.map((item) =>
      item._id === id && (item.quantity || 0) > 1 ? { ...item, quantity: (item.quantity || 0) - 1 } : item
    );
    setCartItems(updatedItems);
  };

  const handleRemove = (id) => {
    const updatedItems = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedItems);
  };

  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isAnyItemSelected = Object.values(selectedItems).some((isSelected) => isSelected);

  const totalBasePrice = cartItems.reduce(
    (acc, item) => acc + (selectedItems[item._id] ? (item.retailPrice || 0) * (item.quantity || 0) : 0),
    0
  );

  const totalDiscount = cartItems.reduce(
    (acc, item) =>
      acc +
      (selectedItems[item._id]
        ? ((item.mrp - (item.discountedPrice || 0)) / item.mrp) *
          (item.retailPrice || 0) *
          (item.quantity || 0)
        : 0),
    0
  );

  const effectiveDeliveryCharge = isAnyItemSelected ? deliveryCharge : 0;
  const finalPrice = totalBasePrice - totalDiscount + effectiveDeliveryCharge;

  const handlePlaceOrder = () => {
    const selectedIds = Object.keys(selectedItems).filter((id) => selectedItems[id]);
    navigate('/order-confirmation', { state: { selectedItems: selectedIds } });
  };

  if (loading) {
    return <p>Loading cart items...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="cart-page">
      {cartItems.length === 0 ? (
        <h2>Your cart is empty!</h2>
      ) : (
        <>
          <div className="CartItemsContainer">
            {cartItems.map((item) => {
              const {
                _id,
                name,
                author,
                mrp,
                coverUrls,
                language,
                publisher,
                publicationDate,
                discountedPrice,
                retailPrice,
              } = item;

              const coverUrl = Array.isArray(coverUrls) && coverUrls.length > 0 ? coverUrls[0] : '';
              const discountPercentage = mrp && discountedPrice
                ? ((mrp - discountedPrice) / mrp) * 100
                : '0';

              return (
                <div className="cart-item" key={_id}>
                  <label htmlFor={`item-${_id}`}>
                    <div className="ItemImage">
                      <img src={coverUrl} alt={name || 'Item Image'} />
                    </div>

                    <div className="item-details">
                      <h3>{name || 'No Title'}</h3>
                      <p>Author: {author || 'Unknown'}</p>
                      <p>Language: {language || 'Not Specified'}</p>
                      <p>Publisher: {publisher || 'Not Specified'}</p>
                      <p>
                        Publication Date:{' '}
                        {publicationDate ? new Date(publicationDate).toDateString() : 'Not Specified'}
                      </p>
                      <p>MRP: ₹{mrp || '0'}</p>
                      <p>Discounted Price: ₹{discountedPrice || '0'}</p>
                      <p>Retail Price: ₹{retailPrice || '0'}</p>
                      <p>Discount: {discountPercentage.toFixed(2)}%</p>
                      <div className="quantity-control">
                        <button onClick={() => handleDecrement(_id)}>-</button>
                        <span>{item.quantity || 0}</span>
                        <button onClick={() => handleIncrement(_id)}>+</button>
                      </div>
                      <button onClick={() => handleRemove(_id)}>Remove</button>
                    </div>
                    <div className="checkbox-section">
                      <input
                        type="checkbox"
                        id={`item-${_id}`}
                        checked={selectedItems[_id] || false}
                        onChange={() => handleCheckboxChange(_id)}
                      />
                    </div>
                  </label>
                </div>
              );
            })}
          </div>
          <div className="total-section">
            <span className="PriceDetails">Price Details</span>
            <div className="priceOfItems">
              <span>Price: </span>
              <span>₹{totalBasePrice.toFixed(2)}</span>
            </div>
            {isAnyItemSelected && (
              <div className="DiscountItems">
                <span>Discount: </span>
                <span>- ₹{totalDiscount.toFixed(2)}</span>
              </div>
            )}
            <div className="DeliveryCharges">
              <span>Delivery Charges: </span>
              <span>+ ₹{effectiveDeliveryCharge.toFixed(2)}</span>
            </div>
            <div className="TotalPrice">
              <span>Total Price: </span>
              <span>₹{finalPrice.toFixed(2)}</span>
            </div>
            <button onClick={handlePlaceOrder} disabled={finalPrice === 0}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
