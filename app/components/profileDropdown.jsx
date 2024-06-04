"use client"
// react tools 
import { useEffect, useState } from "react";
// next tools 
import { useRouter } from "next/navigation";
import Link from "next/link";
// icons 
import { IoExitOutline } from "react-icons/io5";
// sweet alert
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";
import { FaAngleLeft } from "react-icons/fa";
import Exit from "./exit";
// redux 
import { changeUser } from "../../lib/reducers/user";
import { useDispatch, useSelector } from "react-redux";
// cookie 
import Cookies from "js-cookie";
// API
import { clearToken } from "../../lib/config/api";

const ProfileDropDown = ({ children }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const user = useSelector((state) => state.user);
    const [showAdmin,setShowAdmin] = useState(false);
    const SWAL = withReactContent(Swal);
    const router = useRouter();
    const dispatch = useDispatch();
    const showAlert = () => {
        SWAL.fire({
            html: <Exit self={SWAL} />,
            width: "40rem",
            showConfirmButton: false,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(changeUser({ is_login: false }));
                clearToken();
                Cookies.remove("refresh_token");
                router.push("/auth");
            }
        })
    };

    useEffect(() => {
        setShowAdmin(user.is_staff || user.is_manager)
    },[user.is_staff,user.is_manager])

    return (
        <div className="relative">
            <div className={`hover:bg-gray-100 rounded-lg transition duration-200 active:bg-gray-400
            ${showDropdown ? "bg-gray-100" : ""}`} onClick={() => setShowDropdown(!showDropdown)}>
                {children}
            </div>
            <div className={`absolute w-72 index-10000 ${showDropdown ? "bg-white" : "opacity-0"} 
            transition duration-200 border rounded-lg shadow-lg top-12 list-none`}>
                <Link className="p-3 m-1 border-b text-center flex justify-between hover:bg-gray-100 items-center cursor-pointer
                active:bg-gray-200" href={"/profile/"}>
                    <FaAngleLeft />
                    <p>{user.email}</p>
                </Link>

                {
                    showAdmin && <Link
                        className="p-3 m-1 border-b text-center flex justify-between hover:bg-gray-100 items-center cursor-pointer
                    active:bg-gray-200"
                        href={"/admin/"}>
                        <FaAngleLeft />
                        <p>ادمین</p>
                    </Link>
                }

                <li onClick={() => showAlert()} className="p-1 m-1 text-center grid grid-cols-5 items-center 
                hover:bg-gray-100 p-3 cursor-pointer active:bg-gray-200">
                    <p className="col-span-4">خروج از حساب کاربری</p>
                    <IoExitOutline className="col-span-1 size-8" />
                </li>
            </div>
        </div>
    )
}; export default ProfileDropDown;