import axios from "axios"
import { useEffect, useState } from "react"
import { Address } from "./Address";
import { AddMore } from "./AddMore";

export function Addresses() {
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/addresses/getAll', {
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            }
        }).then((res) => {
            setAddresses(res.data.Address);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    return (
        <div className="addressBox card">
            <div className="addressBoxHead cardHead">Delivery Address</div>
            <div className="addressBoxContent">
                {addresses.map((address) => {
                    return <Address key={address._id} name={address.name} addressline={address.AddressLine} phone={address.Phone} setAddresses={setAddresses} addressID={address._id}></Address>
                })}
            </div>
            <div className="addMoreAddress">
                <AddMore setAddresses={setAddresses}></AddMore>
            </div>
        </div>
    )
}