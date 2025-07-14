import React, { useContext, useState } from "react";
import "./Login.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

export default function Login({ setShowLogin }) {

    const { url, setToken, setUserName } = useContext(StoreContext);

    const [currState, setCurrState] = useState("Login");

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }


    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;
        if (currState === "Login") {
            newUrl += "/api/user/login";
        }
        else {
            newUrl += "/api/user/register";
        }

        const response = await axios.post(newUrl, data);

        // const res = await response.json();
        if (response.data.success) {
           setToken(response.data.token);
           setUserName(response.data.name || data.name || "User");
           localStorage.setItem("token", response.data.token);
           localStorage.setItem("userName", response.data.name || data.name || "User");
           setShowLogin(false);
        }
        else{
            alert(response.data.message);
        }
    }

    return (
        <>
            <div className="login">
                <form onSubmit={onLogin} className="login-container">
                    <div className="login-title">
                        <h2>{currState}</h2>
                        <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                    </div>

                    <div className="login-form">
                        {currState === "Login" ? <> </> : <input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder="Your Name" required />}
                        <input type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder="Your Email" required />
                        <input type="password" name="password" onChange={onChangeHandler} value={data.password} id="password" placeholder="Password" required />
                    </div>

                    <button type="submit" >{currState === "Sign Up" ? "Create account" : "Login"}</button>

                    <div className="login-condition">
                        <input type="checkbox" required />
                        <p>By Continuing, I agree to the terms of use & privacy policy</p>
                    </div>

                    {currState === "Login" ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click Here</span></p> : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Click Here</span></p>}

                </form>
            </div>
        </>
    );
}
