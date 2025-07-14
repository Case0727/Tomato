import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../foodItem/FoodItem'

export default function FoodDisplay({ category }) {
    const { food_list } = useContext(StoreContext)

    return (
        <>
            <div className='food-display' id='food-display'>
                <h2>Top Dishes Near You</h2>
                <div className="food-display-list">
                    {food_list && food_list.length > 0 ? food_list.map((item, index) => {
                        if(category==="All" || category===item.category){
                            return <FoodItem key={index} id={item._id} name={item.name} price={item.price} description={item.description} image={item.image} />;
                        }
                        return null;
                    }) : <p>No food items available.</p>}
                </div>
            </div>
        </>
    )
}

