"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { app } from "@/Firebase/Firebase.config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import UseAdmins from "@/hooks/UseAdmins";

const RedirectToHome = () => {
    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);
    const { admins, ReFetch, loading } = UseAdmins();
    const isAdmin = admins?.find((admin) => admin.email == user?.email);
    // console.log(userLoading);
    const auth = getAuth(app);
    const router = useRouter();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            // if (currentUser) {
                setUser(currentUser);
                setUserLoading(false);
            // }
        });
        return () => {
            return unsubscribe();
        };
    }, [router, auth]);
    if (user) {
        if (isAdmin) {
            router.push("/dashboard");
        }
    }else if(!userLoading){
        router.push("/login");
    }

    if (loading && !user) {
        return <p className="text-xl">Loading......</p>;
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-teal-800 text-white">
            <div>Redirecting...</div>
        </div>
    );
};

export default RedirectToHome;
