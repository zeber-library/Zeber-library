import React from 'react';
import './SellBuy.css'; 
import { useNavigate } from 'react-router-dom';


import image3 from '../../../assets/image3.png';
import image2 from '../../../assets/image2.png'

const SellBuy = () => {
        const navigate = useNavigate();
    
        const handleBuyBooksClick = () => {
            navigate('/buy'); 
        };
    
        const handleSellBooksClick = () =>
        {
                 navigate('/sell');
        }
  return (
    <div className="container-sell-buy">
      <div className="card-sell-buy">
        <div className="icon-sell-buy">
          <img src={image3} alt="Buy Used Books" />
        </div>
        <button className="action-btn-sell-buy" id="btn-sell2" onClick={handleBuyBooksClick}>Buy Used Books</button>
      </div>
      <div className="or">
        <p>Or</p>
      </div>
      <div className="card-sell-buy">
        <div className="icon-sell-buy">
          <img src={image2} alt="Sell Old Books" />
        </div>
        <button className="action-btn-sell-buy" onClick={handleSellBooksClick}>Sell Old Books</button>
      </div>
    </div>
  );
}

export default SellBuy;
