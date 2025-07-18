import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null)


const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const [foodList, setFoodList] = useState([]);

    const url = "https://tomato-backend-a0u9.onrender.com";

    const [token, setToken] = useState("")
    const [userName, setUserName] = useState("")
    const [isAuthLoaded, setIsAuthLoaded] = useState(false);

    // Initialize token and userName from localStorage on app load
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUserName = localStorage.getItem("userName");
        if (storedToken) {
            setToken(storedToken);
        }
        if (storedUserName) {
            setUserName(storedUserName);
        }
        setIsAuthLoaded(true);
    }, []);

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = foodList.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            if (response.data.success) {
                setFoodList(response.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch food list:", error);
        }
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
        setCartItems(response.data.data);
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    }, []);

    const contextValue = {
        food_list: foodList,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        fetchFoodList,
        loadCartData,
        url,
        token,
        setToken,
        userName,
        setUserName,
        isAuthLoaded
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
