import React from "react";
import "./Order.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import axios from "axios";
import { assets } from "../../../assets/assets";

export default function Order({ url }) {

    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {
        const response = await axios.get(url + "/api/order/list");
        if (response.data.success) {
            // Explicitly sort orders by _id descending to show recent orders first
            const sortedOrders = response.data.data.sort((a, b) => {
                if (a._id > b._id) return -1;
                if (a._id < b._id) return 1;
                return 0;
            });
            setOrders(sortedOrders);
            console.log(sortedOrders);
        }
        else {
            toast.error("Error");
        }
    }

    const statusHandler = async (event, orderId) => {
        const response = await axios.post(url + "/api/order/status", {
            orderId,
            status: event.target.value
        });

        if (response.data.success) {
            await fetchAllOrders();
        }
    }

    useEffect(() => {
        fetchAllOrders();
    }, [])
    return (
        <>
            <div className="order add">
                <h3>Order Page</h3>
                <div className="order-list">
                    {orders.map((order, index) => (
                        <div key={index} className="order-item">
                            <img src={assets.parcel_icon} alt="" />
                            <div>
                                <p className="order-item-food">
                                    {order.items.map((item, index) => {
                                        if (index === order.items.length - 1) {
                                            return item.name + "x" + item.quantity
                                        }
                                        else {
                                            return item.name + "x" + item.quantity + ","
                                        }
                                    })}
                                </p>
                                <p className="order-item-name">{order.address.firstName + " " + order.address.lastName}</p>
                                <div className="order-item-address">
                                    <p>{order.address.street + ", "}</p>
                                    <p>{order.address.city + ",  " + order.address.state + ", " + order.address.country + ", " + order.address.zipCode}</p>
                                </div>
                                <p className="order-item-phone">{order.address.phone}</p>
                            </div>
                            <p>Items: {order.items.length}</p>
                            <p>₹{order.amount}</p>
                            <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                                <option value="Food Processing">Pending</option>
                                <option value="Out for Delivery">Out for Delivery</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                    ))}
                </div>

            </div>
        </>
    );
}
