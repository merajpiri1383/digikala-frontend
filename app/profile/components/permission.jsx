"use client"

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Permission = ({children}) => {

    const router = useRouter();
    const user = useSelector((state) => state.user) ;

    return (
        <>
        {
            user.is_login && user.email ? {children} : router.push("/auth/")
        }
        </>
    )
};export default Permission;