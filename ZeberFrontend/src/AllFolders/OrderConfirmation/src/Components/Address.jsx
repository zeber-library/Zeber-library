import axios from "axios";
import { useState } from "react"

export function Address({ name, addressline, phone, setAddresses, addressID }) {
    const [showEdit, setShowEdit] = useState(false);
    const [showdata, setShowData] = useState(true);
    const [newName, setNewName] = useState(name);
    const [newPhone, setNewPhone] = useState(phone);
    const [newAddress, setNewAddress] = useState(addressline);

    return <div>
        {showdata && <div className="addressElement">
            <div style={{ display: 'flex', marginBottom: '5px' }}>
                <div><b>{name}</b>&nbsp;</div>
                <div style={{ color: 'grey', marginLeft: '10px' }}>{phone}&nbsp;</div>
            </div>
            <div style={{ color: 'grey', marginLeft: '2px' }}>{addressline}</div>
            <div style={{display: 'flex', alignItems: 'flex-end'}}> 
                <button  style={{marginRight: "5px"}} className='addressEditButton' onClick={() => {
                    setShowEdit(true);
                    setShowData(false);
                }}><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="#5074FD"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" /></svg></button>
                <button className="addressDeleteButton" onClick={() => {
                    axios.delete(`http://localhost:3000/api/v1/addresses/delete/${addressID}`, {
                        headers: {
                            'Authorization': `Bearer ${window.localStorage.getItem('token')}`
                        }
                    }).then((res) => {
                        setAddresses(res.data.address);
                        window.alert('Address Deleted');
                    }).catch((err) => {
                        console.log(err);
                    })
                }}><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="25px" fill="#5074FD"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg></button>
            </div>
        </div>}
        {showEdit && <div>
            <input value={newName} onChange={(e) => {
                setNewName(e.target.value);
            }}></input>
            <input value={newPhone} onChange={(e) => {
                setNewPhone(e.target.value);
            }}></input>
            <input value={newAddress} onChange={(e) => {
                setNewAddress(e.target.value);
            }}></input>
            <button onClick={() => {
                axios.put('http://localhost:3000/api/v1/addresses/update', {
                    address: {
                        ID: addressID,
                        AddressLine: newAddress,
                        name: newName,
                        Phone: newPhone
                    }
                }, {
                    headers: {
                        'Authorization': `Bearer ${window.localStorage.getItem('token')}`
                    }
                }).then((res) => {
                    setAddresses(res.data.address);
                    window.alert('Address updated');
                    setShowEdit(false);
                    setShowData(true);
                }).catch((err) => {
                    console.log(err);
                })
            }}>Save</button>
        </div>}
    </div>
} 