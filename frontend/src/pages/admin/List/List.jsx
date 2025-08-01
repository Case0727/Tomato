import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

export default function List({ url }) {

    const [list, setList] = useState([]);
    const [loadingId, setLoadingId] = useState(null);

    const fetchList = async () => {
        const response = await axios.get(`${url}/api/food/list`);
        if (response.data.success) {
            setList(response.data.data)
        }
        else {
            toast.error(response.data.message)
        }
    }

    const removeFood = async (foodId) => {
        console.log("Attempting to remove item with id:", foodId);
        const confirmDelete = window.confirm("Are you sure you want to remove this item?");
        if (!confirmDelete) {
            console.log("User cancelled removal");
            return;
        }

        setLoadingId(foodId);
        try {
            const response = await axios.post(`${url}/api/food/remove/${foodId}`);
            console.log("Remove response:", response.data);
            setLoadingId(null);

            if (response.data.success) {
                toast.success(response.data.message);
                // Optimistically update the list state to remove the item immediately
                setList(prevList => prevList.filter(item => item._id !== foodId));
            }
            else {
                toast.error(response.data.message);
            }
        } catch (error) {
            setLoadingId(null);
            console.error("Error removing item:", error);
            toast.error("Failed to remove item. Please try again.");
        }
    }

    useEffect(() => {
        fetchList()
    }, [])


    return (
        <>
            <div className="list add flex-col">
                <p className="list-title">All Food List</p>
                <div className="list-table">
                    <div className="list-table-format title">
                        <b>Image</b>
                        <b>Name</b>
                        <b>Category</b>
                        <b>Price</b>
                        <b>Action</b>
                    </div>
                    {list.map((item, index) => {
                        return (
                            <div className="list-table-format" key={index}>
                                <img src={`${url}/images/` + item.image} alt="" />
                                <p>{item.name}</p>
                                <p>{item.category}</p>
                                <p> ₹ {item.price}</p>

                                {/* Action Button Enable */}
                                {/* <p onClick={() => removeFood(item._id)}
                                    className={`cursor ${loadingId === item._id ? "disabled" : ""}`}
                                    style={{ pointerEvents: loadingId === item._id ? "none" : "auto", opacity: loadingId === item._id ? 0.5 : 1 }}>
                                    X
                                </p> */}

                                {/* Action Button Disable  */}
                                <p
                                    onClick={() => {
                                        if (item.isNew) {
                                            removeFood(item._id);
                                        }
                                    }}
                                    className={`cursor ${loadingId === item._id || !item.isNew ? "disabled" : ""}`}
                                    style={{ pointerEvents: loadingId === item._id || !item.isNew ? "none" : "auto", opacity: loadingId === item._id || !item.isNew ? 0.5 : 1 }}
                                >
                                    X
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    );
}
