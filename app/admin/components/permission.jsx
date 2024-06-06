"use client"
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const Permission = ({children}) => {

    const router = useRouter();
    const user = useSelector((state) => state.user);
    
    return (
        <>
        {
            user.is_manager || user.is_staff ? children : router.push("/auth/")
        }
        </>
    )
};export default Permission;