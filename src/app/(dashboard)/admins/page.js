"use client";
import Loading from "@/components/Loading";
import TimeZoneConverter from "@/components/TimeZoneConverter";
import UseAdmins from "@/hooks/UseAdmins";
import axios from "axios";
import { useState } from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import { MdAdminPanelSettings, MdEmail } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { FaUserClock } from "react-icons/fa6";
import Swal from "sweetalert2";
import { UserAuth } from "@/Providers/AuthProvider";

const Admins = () => {
    const { user, loading } = UserAuth();
    const { admins, ReFetch, loading: adminLoading } = UseAdmins();
    const isAdmin = admins?.find(
        (admin) => admin.email == user?.email && admin.role == "admin"
    );

    console.log(user);
    // this function will change the user role on the database.
    const changeUserRole = (role, id, email) => {
        if (isAdmin && !loading && !adminLoading) {
            if (user?.email == email) {
                Swal.fire({
                    icon: "warning",
                    title: "You Can't change your role",
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                Swal.fire({
                    title: "Are you sure?",
                    text: "You want to Change the use role!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes",
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        console.log(role, id);
                        const res = await axios?.put("/api/admins", {
                            role,
                            id,
                        });
                        const data = res?.data;
                        if (data?.modifiedCount) {
                            ReFetch();
                            Swal.fire({
                                title: "Changed",
                                text: "Role Change successful",
                                icon: "success",
                            });
                        } else {
                            Swal.fire({
                                title: "Opps!",
                                text: "Something is wrong",
                                icon: "error",
                            });
                        }
                    }
                });
            }
        } else {
            Swal.fire({
                icon: "warning",
                title: "You Can't change the role",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    return admins && Array.isArray(admins) ? (
        <>
            <h1 className="md:text-2xl mb-5 text-xl font-bold">
                All registered users
            </h1>
            <div className="mx-auto overflow-x-auto">
                <table className="table min-w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>#</label>
                            </th>
                            <th>Admin</th>
                            <th>Email</th>
                            <th>Regi. time & Date</th>
                            <th>Role</th>
                            <th>Change the user role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {admins &&
                            admins.map((admin, i) => (
                                <tr key={admin?._id}>
                                    <th>
                                        <label>{i + 1}</label>
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <BiSolidUserCircle size={20} />
                                            <div className="font-bold">
                                                {admin?.name}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="flex items-center gap-2">
                                            <MdEmail size={18} />
                                            {admin.email}
                                        </span>
                                    </td>
                                    <td>
                                        <TimeZoneConverter
                                            inputDate={admin?.timestamp}
                                        />
                                    </td>
                                    <td>
                                        {admin?.role == "admin" ? (
                                            <div className="flex items-center gap-2">
                                                <MdAdminPanelSettings className="text-lg" />{" "}
                                                <span>Admin</span>
                                            </div>
                                        ) : admin?.role == "editor" ? (
                                            <div className="flex items-center gap-2">
                                                <FaUserEdit className="text-lg" />
                                                <span>Editor</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <FaUserClock className="text-lg" />
                                                <span>Waiting</span>
                                            </div>
                                        )}
                                    </td>
                                    <td>
                                        <div className="flex gap-1">
                                            <button
                                                disabled={admin.role == "admin"}
                                                onClick={() =>
                                                    changeUserRole(
                                                        "admin",
                                                        admin?._id,
                                                        admin?.email
                                                    )
                                                }
                                                className="text-sm py-1 px-3 bg-yellow-500 rounded text-white disabled:cursor-not-allowed disabled:opacity-40"
                                            >
                                                Admin
                                            </button>
                                            <button
                                                disabled={
                                                    admin?.role == "editor"
                                                }
                                                onClick={() =>
                                                    changeUserRole(
                                                        "editor",
                                                        admin?._id,
                                                        admin?.email
                                                    )
                                                }
                                                className="text-sm py-1 px-3 bg-green-500 rounded text-white disabled:cursor-not-allowed disabled:opacity-40"
                                            >
                                                Editor
                                            </button>
                                            <button
                                                disabled={admin?.role == "none"}
                                                onClick={() =>
                                                    changeUserRole(
                                                        "none",
                                                        admin?._id,
                                                        admin?.email
                                                    )
                                                }
                                                className="text-sm py-1 px-3 bg-red-500 disabled:cursor-not-allowed disabled:opacity-40 rounded text-white"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                    {/* foot */}
                    <tfoot>
                        <tr>
                            <th>
                                <label>#</label>
                            </th>
                            <th>Admin</th>
                            <th>Email</th>
                            <th>Regi. Time & Date</th>
                            <th>Role</th>
                            <th>Change the user role</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    ) : (
        <Loading />
    );
};

export default Admins;
