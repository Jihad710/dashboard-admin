"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { app } from "@/Firebase/Firebase.config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import UseAdmins from "@/hooks/UseAdmins";
import Swal from "sweetalert2";
import { UserAuth } from "@/Providers/AuthProvider";

const RedirectToHome = () => {
    // const [user, setUser] = useState(null);
    const {user,loading} = UserAuth()
    // const [userLoading, setUserLoading] = useState(true);
    const { admins, ReFetch, loading:adminLoading } = UseAdmins();
    const isAdmin = admins?.find(
        (admin) => admin.email == user?.email && admin.role == "admin"
    );
    const isEditor = admins?.find(
        (admin) => admin.email == user?.email && admin.role == "editor"
    );
    // console.log(userLoading);
    const router = useRouter();
    if (user && !adminLoading) {
        if (isAdmin || isEditor) {
            router.push("/dashboard");
        } else {
            Swal.fire({
                title: "Secure Path",
                text: "You have no permission to enter here!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login with valid account",
            }).then((result) => {
                if (result.isConfirmed) {
                    router.push("/login");
                }
            });
        }
    } else if (!loading && !adminLoading) {
        router.push("/login");
    }

    if (adminLoading && !user) {
        return <p className="text-xl">Loading......</p>;
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-teal-800 text-white">
            <div>Redirecting...</div>
        </div>
    );
};

export default RedirectToHome;
