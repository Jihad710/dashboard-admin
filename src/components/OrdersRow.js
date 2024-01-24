"use client";
import Link from "next/link";
import { FaSquarePen } from "react-icons/fa6";
import { MdDelete, MdPreview } from "react-icons/md";
import axios from "axios";
import { useState, Fragment } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import moment from "moment/moment";
import { Dialog, Transition } from "@headlessui/react";
import UseOrders from "@/hooks/UseOrders";

const OrdersRow = ({ order, idx }) => {
    const { ReFetch } = UseOrders();

    let [isOpen, setIsOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const { country, product, name, mobile, timestamp,_id } = order || {};
    const deleteOrder = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: "#465AF7",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                setIsDeleting(true);
                const res = await axios.delete("/api/orders", {
                    data: { _id },
                });
                const data = res.data;
                console.log(data);
                if (data.deletedCount > 0) {
                    ReFetch();
                    Swal.fire({
                        icon: "success",
                        title: "Deleted!",
                        text: "Your appointment has been deleted!",
                        timer: 2000,
                        showConfirmButton: false,
                    });
                } else {
                    toast.error("Something went wrong! Please try again!");
                }
                setIsDeleting(false);
            }
        });
    };

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }
    return (
        <>
            <tr>
                <th>
                    <label>{idx}</label>
                </th>
                <td className="">{product}</td>
                <td>{name}</td>
                <td>{moment(timestamp).fromNow()}</td>
                <td className="">
                    <button onClick={openModal} className="hover:text-blue-600 text-center mx-2">
                        <MdPreview className="text-3xl" />
                    </button>
                </td>
                <th>
                    <span className="flex mx-2 items-center gap-3">
                        <button
                            disabled={isDeleting}
                            onClick={() => deleteOrder()}
                            title="delete"
                            className="hover:text-red-500 duration-200"
                        >
                            {isDeleting ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                                <MdDelete size={25} />
                            )}
                        </button>
                    </span>
                </th>
            </tr>
            {/* Modal  */}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-3 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-3 text-left align-middle shadow-xl transition-all">
                                    
                                    <div className="mt-2 items-center grid grid-cols-3 gap-2">
                                        <h3 className="text-sm">Product Name:</h3>
                                        <p className="col-span-2 font-bold">{product}</p>
                                    </div>

                                    <div className="mt-2 items-center grid grid-cols-3 gap-2">
                                        <h3 className="text-sm">Customer Name:</h3>
                                        <p className="col-span-2 font-bold">{name}</p>
                                    </div>

                                    <div className="mt-2 items-center grid grid-cols-3 gap-2">
                                        <h3 className="text-sm">Customer Phone:</h3>
                                        <p className="col-span-2 font-bold">{mobile}</p>
                                    </div>
                                    <div className="mt-2 items-center grid grid-cols-3 gap-2">
                                        <h3 className="text-sm">Country:</h3>
                                        <p className="col-span-2 font-bold">{country}</p>
                                    </div>


                                    <div className="mt-4 flex justify-end">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Ok
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default OrdersRow;
