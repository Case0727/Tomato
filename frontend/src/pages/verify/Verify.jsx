import { useContext, useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

export default function Verify() {

    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    // console.log(orderId,success);
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

const verifyPayment = async () => {
        console.log("Verifying payment with success:", success, "orderId:", orderId);
        const response = await axios.post(url+"/api/order/verify", { success, orderId });
        console.log("Verification response:", response.data);
        if (response.data.success) {
            console.log("Payment successful, navigating to /myorders");
            navigate("/myorders");
        }
            else {
                console.log("Payment failed, navigating to /");
                navigate("/");
            }
    }

    useEffect(()=>{
        verifyPayment();
    },[])

    return (
        <>
            <div className="verify">
                <div className="spinner">
               
                </div>
            </div>

        </>
    )
}