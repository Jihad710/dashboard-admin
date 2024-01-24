"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const UseOrders = () => {
    const [control, setControl] = useState(false);
    const [orders, setOrders] = useState(null);
    const ReFetch = () => {
        setControl(!control);
    };
    useEffect(() => {
        (async () => {
            try {
                const response = await axios(`/api/orders`);
                setOrders(response.data);
            } catch (error) {
                // Handle error
                console.error(error);
            }
        })();
    }, [control]);
    return { orders, ReFetch };
};

export default UseOrders;
