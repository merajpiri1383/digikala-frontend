"use client"

// icons 
import { FiEdit3 } from "react-icons/fi";
// API 
import API, { handle401Error } from "../../../lib/config/api";
// redux 
import { useDispatch, useSelector } from "react-redux";
import { changeUser } from "../../../lib/reducers/user";
// next js 
import { useRouter } from "next/navigation";
import Link from "next/link";
// react tools 
import { useEffect } from "react";


const RightPannel = () => {
    const user = useSelector((state) => state.user);
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            await API.get("/user/").then((response) => {
                console.log(response.data);
                dispatch(changeUser({
                    email: response.data.email,
                    is_login: true
                }))
            }).catch((error) => {
                console.log(error)
                if (error.response.status === 401) {
                    handle401Error(router);
                }
            })
        })();
    }, []);
    return (
        <div className="p-5">
            <div className="my-2 grid grid-cols-4 items-center">
                <Link href={"/profile/personal/"} className="hover:scale-110 transition duration-200">
                    <FiEdit3 className="col-span-1 text-cyan-500 size-1/3" />
                </Link>
                <p className="col-span-3 font-semibold text-right">{user.email}</p>
            </div>
        </div>
    )
}; export default RightPannel;