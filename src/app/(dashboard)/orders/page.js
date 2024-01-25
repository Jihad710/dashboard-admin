"use client";
import OrdersRow from "@/components/OrdersRow";
import UseOrders from "@/hooks/UseOrders";
import axios from "axios";
import React, { useEffect, useState } from "react";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [sortingText, setSortingText] = useState("Name");
    const [sortingMode, setSortingMode] = useState("Ascending");
    useEffect(() => {
        (async () => {
            try {
                const response = await axios(
                    `/api/orders?sortingMode=${sortingMode}&sort=${sortingText}`
                );
                setOrders(response.data);
                // console.log(response?.data);
            } catch (error) {
                // Handle error
                console.error(error);
            }
        })();
    }, [sortingText, sortingMode]);

    return (
        <div>
            <>
                <h1 className="md:text-2xl mb-5 text-xl font-bold">
                    All General Appointment
                </h1>
                <div className="border-b flex justify-end border-gray-100">
                    <div className="flex items-center ">
                        <select
                            name="sort"
                            id="sort"
                            onChange={(e) => setSortingText(e.target.value)}
                            className="outline-none p-2 rounded-tl-xl w-36 border-r-2 border-gray-100"
                        >
                            <option value="Name">Name</option>
                            <option value="Date">Date</option>
                        </select>
                        <select
                            onClick={(e) => setSortingMode(e.target.value)}
                            name=""
                            id=""
                            className="outline-none rounded-tr-xl p-2 w-36"
                        >
                            <option value="Ascending">Ascending</option>
                            <option value="Descending">Descending</option>
                        </select>
                    </div>
                </div>
                <div className="mx-auto overflow-x-auto">
                    <table className="table min-w-full border">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product Name</th>
                                <th>Customer Name</th>
                                <th>Time</th>
                                <th>Details</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* rows */}
                            {orders?.map((order, idx) => (
                                <OrdersRow
                                    order={order}
                                    key={order?._id}
                                    idx={idx + 1}
                                />
                            ))}
                        </tbody>
                        {/* foot */}
                        <tfoot>
                            <tr>
                                <th>#</th>
                                <th>Product Name</th>
                                <th>Customer Name</th>
                                <th>Time</th>
                                <th>Details</th>
                                <th>Action</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </>
        </div>
    );
};

export default OrdersPage;
