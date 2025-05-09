import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";
import { useLocation } from "react-router-dom";

export default function MyOrders() {

    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const location = useLocation();

    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
        console.log(response.data);
        setData(response.data.data);
        console.log(response.data.data);
    }

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token, location])

    return (
        <>
            <div className="my-orders">
                <h2>My Orders</h2>
                <div className="container">
                    {data.map((order, index) => {
                        return (
                            <div key={index} className="my-orders-order">
                                <img src={assets.parcel_icon} alt="" />
<p>{order.items.map(item => item.name + "x" + item.quantity).join(", ")}</p>
                                <p>₹{order.amount}.00</p>
                                <p>Items: {order.items.length}</p>
                                <p> <span>&#x25cf;</span> <b>{order.status}</b></p>
                                <button>Track Order</button>
                            </div>
                        )
                    })}
                </div>
            </div>

        </>
    )
}
