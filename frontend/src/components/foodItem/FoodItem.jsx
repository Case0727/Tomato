import React, { useContext } from 'react';
import "./FoodItem.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';

export default function FoodItem({ id, name, price, description, image }) {

    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

    // Construct full image URL if image is a filename
    const imageUrl = image && !image.startsWith('http') ? `${url}/images/${image}` : image;

    return (
        <>
            <div className='food-item'>
                <div className='food-item-img-container'>
                    <img className="food-item-image" src={imageUrl} alt={name} />
                    {!cartItems[id]
                        ? <img src={assets.add_icon_white} className='add' onClick={() => addToCart(id)} alt='' />
                        : <div className='food-item-counter'>
                            <img src={assets.remove_icon_red} onClick={() => removeFromCart(id)} alt="" />
                            <p>{cartItems[id]}</p>
                            <img src={assets.add_icon_green} onClick={() => addToCart(id)} alt="" />
                        </div>
                    }
                </div>
                <div className="food-item-info">
                    <div className="food-item-name-rating">
                        <p>{name}</p>
                        <img src={assets.rating_starts} alt="" />
                    </div>
                    <p className='food-item-desc'>{description}</p>
                    <p className='food-item-price'>₹{price}</p>
                </div>
            </div>
        </>
    )
}
