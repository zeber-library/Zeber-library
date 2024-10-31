import axios from "axios";
import { useState } from "react";

export function AddMore({ setAddresses }) {
    const [name, setName] = useState('');
    const [Address, setAddress] = useState('');
    const [Phone, setPhone] = useState('');
    const [showAdd, setShowAdd] = useState(false);

    return <div>
        {(!showAdd) && <div><button className="addMoreButton" onClick={() => {
            setShowAdd(true);
        }}>Add New Address</button></div>}
        {showAdd && <div>
            <input placeholder="Name..." onChange={(e) => {
                setName(e.target.value);
            }}></input>
            <input placeholder="Address..." onChange={(e) => {
                setAddress(e.target.value);
            }}></input>
            <input placeholder="Phone..." onChange={(e) => {
                setPhone(e.target.value);
            }}></input>
            <button onClick={() => {
                axios.post('http://localhost:3000/api/v1/addresses/add', {
                    AddressLine: Address,
                    name: name,
                    Phone: Phone
                }, {
                    headers: {
                        'Authorization': `Bearer ${window.localStorage.getItem('token')}`
                    }
                }).then((res) => {
                    setAddresses(res.data.addressArray);
                    window.alert('Address Added');
                    setShowAdd(false);
                }).catch((err) => {
                    console.log(err);
                })
            }}>Add</button>
        </div>}
    </div>
}