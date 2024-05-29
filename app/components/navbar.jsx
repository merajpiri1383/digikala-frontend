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
import { useSelector } from "react-redux";
// components 
import ProfileDropDown from "./profileDropdown";


const Navbar = () => {
    const isLogin = useSelector((state) => state.user.is_login);

    return (
        <div className="lg:grid-cols-9 lg:grid p-3">
            <div className="hidden lg:grid p-2 gap-2 lg:col-span-4 grid-cols-10 items-center">
                <div className="col-span-2">
                    <Link href={"/cart/"} className="bg-lime-400">
                        <FaCartShopping className="size-8 w-full border-r-2 px-2" />
                    </Link>
                </div>
                <div className="col-span-2">
                    {
                        isLogin ?
                            <ProfileDropDown>
                                <Link href={"/"} className="grid grid-cols-2 items-center justify-center p-1">
                                    <FaCaretDown className="size-4 col-span-1" />
                                    <FaRegUser className="size-8 col-span-1" />
                                </Link>
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