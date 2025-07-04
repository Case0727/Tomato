import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";
import { useLocation } from "react-router-dom";
import "./MyOrder.css"

export default function MyOrders() {

    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const location = useLocation();

    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
        // Explicitly sort orders by _id descending to show recent orders first
        const sortedOrders = response.data.data.sort((a, b) => {
            if (a._id > b._id) return -1;
            if (a._id < b._id) return 1;
            return 0;
        });
        setData(sortedOrders);
        console.log(sortedOrders);
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
                                <button onClick={fetchOrders}>Track Order</button>
                            </div>
                        )
                    })}
                </div>
            </div>

        </>
    )
}
