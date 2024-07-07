"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { IoExitOutline } from "react-icons/io5";
import { FaAngleLeft } from "react-icons/fa";
import Exit from "./exit";
import { useSelector } from "react-redux";
import Modal from "../../src/modal/modal";

const ProfileDropDown = ({ children }) => { 

    const [showDropdown, setShowDropdown] = useState(false);
    const user = useSelector((state) => state.user);
    const [showAdmin, setShowAdmin] = useState(false);


    useEffect(() => {
        setShowAdmin(user.is_staff || user.is_manager)
    }, [user.is_staff, user.is_manager])

    return (
        <div className="relative">
            <div className={`hover:bg-gray-100 rounded-lg transition duration-200 active:bg-gray-400
            ${showDropdown ? "bg-gray-100" : ""}`} onClick={() => setShowDropdown(!showDropdown)}>
                {children}
            </div>
            <div className={`absolute w-72 index-10000 ${showDropdown ? "bg-white" : "opacity-0"} 
            transition duration-200 border rounded-lg shadow-lg top-12 list-none`}>
                <Link className="p-3 m-1 border-b text-center flex justify-between hover:bg-gray-100
                 items-center cursor-pointer active:bg-gray-200" href={"/profile/"}>
                    <FaAngleLeft />
                    <p>{user.email}</p>
                </Link>

                { 
                    showAdmin && <Link
                        className="p-3 m-1 border-b text-center flex justify-between hover:bg-gray-100 
                        items-center cursor-pointer active:bg-gray-200"
                        href={"/admin/"}>
                        <FaAngleLeft />
                        <p>ادمین</p>
                    </Link>
                }

                <Modal trigger={<li className="p-1 m-1 text-center grid grid-cols-5 items-center 
                hover:bg-gray-100 p-3 cursor-pointer active:bg-gray-200">
                    <p className="col-span-4">خروج از حساب کاربری</p>
                    <IoExitOutline className="col-span-1 size-8" />
                </li>} children={<Exit />} />
            </div>
        </div>
    )
}; export default ProfileDropDown;