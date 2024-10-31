import { useState } from "react"
import { useRecoilState } from "recoil";
import { countState } from "../state";
import bottomWear from '../assets/bottomwear.jpeg';

export function Order({ order }) {
    const [count, setCount] = useRecoilState(countState);

    return <div className="orderBox card">
        <div className="orderBoxHead cardHead">Order Summary</div>
        <div className="OrderCards">

            <div className="orderBoxContent">
                <div>
                    <img src={bottomWear} style={{ borderRadius: '10px' }}></img>
                </div>
                <div className="orderDetails">
                    <div style={{ fontSize: 'medium', fontWeight: '600' }}>{order.name}</div>
                    <div style={{ color: 'grey' }}>{order.feature}</div>
                    <div style={{ color: 'grey' }}>Seller: {order.seller}</div>
                    <div style={{ fontSize: 'large' }}><b>₹{order.price}</b></div>
                    <div className="counter">
                        <button className="countButton1" onClick={() => {
                            if (count > 1) {
                                setCount(count - 1);
                            }
                        }}>-</button>
                        <span>{count}</span>
                        <button className="countButton2" onClick={() => {
                            setCount(count + 1);
                        }}>+</button>
                    </div>
                </div>
            </div>
        </div>
        <hr></hr>
        <div>Order confirmation will be sent to sanjeevrawal12344@gmail.com .</div>
    </div>
}