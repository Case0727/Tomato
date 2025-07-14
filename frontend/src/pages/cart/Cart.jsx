import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './Cart.css'
import { useNavigate } from 'react-router-dom';

export default function Cart() {

    const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
    

    const navigate = useNavigate();
    
    return (
        <>
            <div className='cart'>
                <h1>Your Cart</h1>
                <div className="cart-items">
                    <div className="cart-items-title">
                        <p>Items</p>
                        <p>Title</p>
                        <p>Price</p>
                        <p>Quantity</p>
                        <p>Total</p>
                        <p>Remove</p>
                    </div>
                    <br />
                    <hr />
                    {food_list.map((item, index) => {
                        if (cartItems[item._id] > 0) {
                            const imageUrl = item.image && !item.image.startsWith('http') ? `${url}/images/${item.image}` : item.image;
                            return (
                                <div>
                                    <div className="cart-items-title cart-items-item" key={index}>
                                        <img src={imageUrl} alt={item.name} />
                                        <p>{item.name}</p>
                                        <p>₹{item.price}</p>
                                        <p>{cartItems[item._id]}</p>
                                        <p>₹{item.price * cartItems[item._id]}</p>
                                        <button className='btn' onClick={() => removeFromCart(item._id)}>Remove</button>
                                    </div>
                                    <hr />
                                </div>
                            )
                        }
                    })
                    }
                </div>
                <div className="cart-bottom">
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
                                <p>₹{getTotalCartAmount()===0?0:40}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <b>Total</b>
                                <b>₹{getTotalCartAmount()===0?0:getTotalCartAmount()+40}</b>
                            </div>
                        </div>
                        <button onClick={() => navigate('/order')}>PROCEED TO CHEKCOUT</button>
                    </div>
                    <div className="cart-promocode">
                        <div>
                            <p>If you have a Promo Code, Enter it here</p>
                            <div className="cart-promocode-input">
                                <input type="text" placeholder="Enter Promo Code" />
                                <button>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
