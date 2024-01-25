"use client";
import React from "react";
import UseOrders from "@/hooks/UseOrders";
import UseAdmins from "@/hooks/UseAdmins";
const Dashboard = () => {
    const { orders } = UseOrders();
    const { admins } = UseAdmins();
    const totalAdmins = admins?.filter((admin) => admin.role == "admin");
    const totalEditor = admins?.filter((admin) => admin.role == "editor");
    return (
        <div>
            <div className="grid grid-cols-6 gap-5">
                <div className="bg-green-600 col-span-3 text-white p-10 rounded-tl-2xl rounded-br-2xl text-center">
                    <p className="text-7xl mb-5 font-bold">
                        {orders ? (
                            orders?.length
                        ) : (
                            <span className="loading loading-infinity loading-lg"></span>
                        )}
                    </p>
                    <h2 className="text-2xl">Total Orders</h2>
                </div>
                <div className="bg-blue-600 col-span-3 text-white p-10 rounded-tl-2xl rounded-br-2xl text-center">
                    <p className="text-7xl mb-5 font-bold">
                        {totalAdmins ? (
                            totalAdmins?.length
                        ) : (
                            <span className="loading loading-infinity loading-lg"></span>
                        )}
                    </p>
                    <h2 className="text-2xl"> Total Admins</h2>
                </div>
                <div className="bg-emerald-600 col-span-2 text-white p-10 rounded-tl-2xl rounded-br-2xl text-center">
                    <p className="text-7xl mb-5 font-bold">
                        {totalEditor ? (
                            totalEditor?.length
                        ) : (
                            <span className="loading loading-infinity loading-lg"></span>
                        )}
                    </p>
                    <h2 className="text-2xl"> Total Editors </h2>
                </div>
                <div className="bg-teal-500 col-span-2 text-white p-10 rounded-tl-2xl rounded-br-2xl text-center">
                    <p className="text-7xl mb-5 font-bold">
                        {/* Todo: make dynamic */}
                        {admins ? (
                            0
                        ) : (
                            <span className="loading loading-infinity loading-lg"></span>
                        )}
                    </p>
                    <h2 className="text-2xl"> Total Blogs </h2>
                </div>
                <div className="bg-purple-700 col-span-2 text-white p-10 rounded-tl-2xl rounded-br-2xl text-center">
                    <p className="text-7xl mb-5 font-bold">
                        {/* Todo: make dynamic */}
                        {admins ? (
                            0
                        ) : (
                            <span className="loading loading-infinity loading-lg"></span>
                        )}
                    </p>
                    <h2 className="text-2xl"> Total Review </h2>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
