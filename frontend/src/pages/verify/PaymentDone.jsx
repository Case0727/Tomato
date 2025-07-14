import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentDone() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/myorders");
    }, [navigate]);

    return null;
}
