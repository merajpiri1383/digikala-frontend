"use client"

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Permission = ({children}) => {

    const router = useRouter();
    const user = useSelector((state) => state.user) ;
    return (
        <div>
            {
                user.is_login && user.email ? children : router.push("/auth/")
            }
        </div>
    )
};export default Permission;