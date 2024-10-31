import { useRecoilValue } from "recoil"
import { countState } from "../state"

export function Pay({ order }) {
    const count = useRecoilValue(countState);

    return <div>
        <div className="priceDetails">
            <div className="priceDetailsHead">Price Details</div>
            <div className="priceDetailsContent">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <div>Price ({count} item)</div>
                    <div>₹{count * order.price}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '7px' }}>
                    <div>Delivery Charges</div>
                    <div>Free</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <div>Platform Fee</div>
                    <div>₹3</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '25px' }}>
                    <div style={{fontSize: 'large'}}><b>Total Payable</b></div>
                    <div style={{fontSize: 'large', fontWeight: 'bold'}}>₹{(count * order.price) + 3}</div>
                </div>
            </div>
            <button className="placeOrderButton">Place Order</button>
        </div>
    </div>
}