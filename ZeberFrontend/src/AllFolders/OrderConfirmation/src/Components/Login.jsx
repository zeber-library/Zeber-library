import { useState } from "react"
import axios from 'axios'

export function Login({ setShowAddresses, setShowLogin, setShowOrder, setShowPayButton }) {
    const [showSendOTPButton, setShowSendOTPButton] = useState(false);
    const [showOTPInput, setShowOTPInput] = useState(false);
    const [email, setEmail] = useState('');
    const [OTP, setOTP] = useState(0);

    return <div className="loginBox card">
        <div className="loginBoxHead cardHead">Log In</div>
        <div className="loginBoxContent">
            <div className="loginAndButton">
                <input className="inputBox" placeholder="Enter your email..." onChange={(e) => {
                    setEmail(e.target.value);
                    if (email.length >= 10) {
                        setShowSendOTPButton(true);
                    }
                    else {
                        setShowSendOTPButton(false);
                        setShowOTPInput(false);
                    }
                }}></input>
                {showSendOTPButton && <button className="sendOTPbutton" onClick={() => {
                    axios.post('http://localhost:3000/api/v1/login/sendOTP', {
                        email: email
                    }).then(() => {
                        window.alert('OTP sent!');
                        setShowOTPInput(true);
                    }).catch((err) => {
                        console.log(err);
                    })
                }}>Send OTP</button>}
            </div>
            {showOTPInput && <div className="verifyOTPInput">
                <input placeholder="OTP..." onChange={(e) => {
                    setOTP(e.target.value);
                }}></input>
            </div>}
        </div>
        {showOTPInput ? <button className="verifyOTPButtonActive" onClick={() => {
            axios.post('http://localhost:3000/api/v1/login/verify-otp', {
                email: email,
                OTP: OTP
            }).then((res) => {
                window.localStorage.setItem('token', res.data.token);
                window.alert("Logged in Successfully!")
                setShowAddresses(true);
                setShowOrder(true);
                setShowPayButton(true);
                setShowLogin(false);
            }).catch((err) => {
                if (err.response.status) {
                    window.alert('User not found!');
                }
            })
        }}>Verify</button> : <button className="verifyOTPButtonInactive">Verify</button>}
    </div>
}