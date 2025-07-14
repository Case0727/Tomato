import React, { useEffect, useState } from "react";
import "./PlaceOrder.css"
import { StoreContext } from "../../context/StoreContext"
import { useContext } from "react";
import axios from "axios";
import { food_list } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

export default function PlaceOrder() {

    const { getTotalCartAmount, token, food_list, cartItems, url, userName } = useContext(StoreContext);

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        phone: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const placeOrder = async (event) => {
        event.preventDefault();
        let orderItems = [];
        food_list.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        })

        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 40,
        }
        let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
        if (response.data.success) {
            const { session_url } = response.data;
            window.location.replace(session_url);
        }
        else {
            alert("Failed to place order");
        }
    }

    const  navigate = useNavigate();
    useEffect(() =>{
        if(!token){
            navigate("/cart")
        }
        else if(getTotalCartAmount() ===0)
        {
            navigate("/cart")
        }
    },[token])

    return (
        <>
            <form onSubmit={placeOrder} className="place-order">
                <div className="place-order-left">
                    <p className="title">Delivery Information</p>
                    <div className="multi-feilds">
                        <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First Name" />
                        <input required name="lastName" onChange={onChangeHandler} value={data.lastName} className="right" type="text" placeholder="Last Name" />
                    </div>

                    <input required name="email" onChange={onChangeHandler} value={data.email} className="email" type="text" placeholder="Email Address" />
                    <input required name="street" onChange={onChangeHandler} value={data.street} className="street" type="text" placeholder="Street" />

                    <div className="multi-feilds">
                        <input required name="city" onChange={onChangeHandler} value={data.city} className="city" type="text" placeholder="City" />
                        <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="State" />
                    </div>

                    <div className="multi-feilds">
                        <input required name="zipCode" onChange={onChangeHandler} value={data.zipCode} type="text" placeholder="Zip Code" />
                        <input required name="country" onChange={onChangeHandler} value={data.country} className="right" type="text" placeholder="Country" />
                    </div>

                    <input required name="phone" onChange={onChangeHandler} value={data.phone} className="phone" type="text" placeholder="Phone Number" />
                </div>
                <div className="place-order-right">
                    <div className="cart-total">
                        <h2>Cart Total</h2>
                        <div>
                            <div className="cart-total-details">
                                <p>Subtotal</p>
                                <p>₹{getTotalCartAmount()}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <p>Delivery Fee</p>
                                <p>₹{getTotalCartAmount() === 0 ? 0 : 40}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <b>Total</b>
                                <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 40}</b>
                            </div>
                        </div>
                        <button type="submit">PROCEED TO PAYMENT</button>
                    </div>
                </div>
            </form>

        </>
    )
}