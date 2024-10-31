import { useEffect, useState } from 'react';
import logo from './assets/favicon.png'
import './App.css';
import { Login } from './Components/Login'
import { Addresses } from './Components/Addresses';
import axios from 'axios';
import { Order } from './Components/Order';
import { Pay } from './Components/Pay';


function App() {
  const [showAddresses, setShowAddresses] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showOrder, setShowOrder] = useState(false);
  const [showPayButton, setShowPayButton] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/login/no-otp', {
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`
      }
    }).then((res) => {
      setShowAddresses(true);
      setShowOrder(true);
      setShowPayButton(true);
      setShowLogin(false);
    }).catch((err) => {
      setShowLogin(true);
    })
  }, [])

  const OrderObject = {
    name: 'SKYKNIT Striped Men Black Bermuda Shorts',
    feature: 'Size: M, XL',
    seller: 'SKYKNIT1',
    price: 330,
    count: 1
  }

  return (
    <div className='LibraryDeliveryPage'>
      <div className='header'>
        <img src={logo} className='logo'></img>
        <h1 className='heading'>Confirm Your Order</h1>
      </div>
      <div className='mainBody'>
        <div className="DeliveryRight">
          {showLogin && <Login setShowAddresses={setShowAddresses} setShowLogin={setShowLogin} setShowOrder={setShowOrder} setShowPayButton={setShowPayButton} />}
          {showAddresses && <Addresses />}
          {showOrder && <Order order={OrderObject} />}
        </div>
        <div className='sideBySide'>
          {showPayButton && <Pay order={OrderObject} />}
        </div>
      </div>
    </div>
  )
}

export default App
