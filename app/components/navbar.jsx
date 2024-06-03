"use client"
// logo 
import Logo from "../../static/logo.svg";
// icons 
import { FaCartShopping } from "react-icons/fa6";
import { LuLogIn } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
// next tools 
import Link from "next/link";
import Image from "next/image";
// redux 
import { useDispatch, useSelector } from "react-redux";
import { changeUser } from "../../lib/reducers/user";
// components 
import ProfileDropDown from "./profileDropdown";
// API 
import API, { handle401Error } from "../../lib/config/api";
// react tools 
import { useEffect } from "react";



const Navbar = () => {
    const isLogin = useSelector((state) => state.user.is_login);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    useEffect(() => {
        (async () => {
            console.log("get data form api for user");
            await API.get("/user/").then((response) => {
                console.log("API")
                console.log(response.data);
                dispatch(changeUser({
                    email: response.data.email,
                    is_login : true
                }))
            }).catch((error) => {
                console.log(error);
                try {
                    console.log(error.response.data);
                    error.response.status === 401 && handle401Error(router);
                } catch { }
            })
        })();
    }, []);
    console.log(user);
    return (
        <div className="lg:grid-cols-9 lg:grid p-3">
            <div className="hidden lg:grid p-2 gap-2 lg:col-span-4 grid-cols-10 items-center">
                <div className="col-span-2">
                    <Link href={"/cart/"} className="bg-lime-400">
                        <FaCartShopping className="size-8 w-full border-r-2 px-2" />
                    </Link>
                </div>
                <div className={isLogin ? "col-span-2" : "col-span-3"}>
                    {
                        isLogin ?
                            <ProfileDropDown>
                                <li className="grid grid-cols-2 items-center justify-center p-1">
                                    <FaCaretDown className="size-4 col-span-1" />
                                    <FaRegUser className="size-8 col-span-1" />
                                </li>
                            </ProfileDropDown> :
                            <Link href={"/auth"} className=" flex align-items-center w-full items-center 
                        flex-row-reverse self-center justify-center py-2 outline outline-1 outline-gray-300
                        rounded-lg gap-2 hover:bg-gray-50 cursor-pointer">
                                <LuLogIn />
                                ورود | ثبت نام
                            </Link>
                    }
                </div>
            </div>
            <form className="col-span-5 grid lg:grid-cols-5 w-full gap-4 foucs:bg-red-500 items-center">
                <input type="text" placeholder="جستجو" className="bg-stone-200 col-span-4 text-right
                rounded-lg p-2 outline-none focus:bg-white transition border-solid border-2
                focus:shadow-lg duration-300 " />
                <div className="flex justify-center hidden lg:block">
                    <Link href={"/"} className="flex items-center">
                        <Image
                            src={Logo}
                            alt="logo"
                        />
                    </Link>
                </div>
            </form>
        </div>
    )
}; export default Navbar;