"use client"
// react reveal 
import { Zoom } from "react-awesome-reveal";
// logo 
import Logo from "../../../../static/logo.svg";
import Image from "next/image";
// icons 
import { FaRegEye } from "react-icons/fa";
import { PiEyeClosedBold } from "react-icons/pi";
import { FaAngleLeft } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";
// react tools 
import { useState } from "react";
// next tools 
import Link from "next/link";

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <Zoom duration={500}>
            <div className="h-96 p-5 m-8 flex justify-center items-center">
                <form className="w-96 px-8 py-6 grid gird-cols-1 gap-4 border border-stone-200 rounded-lg">
                    <div className="grid items-center grid-cols-7">
                        <Image
                            src={Logo}
                            alt="logo"
                            className="size-36 h-20 col-start-3 col-span-3"
                        />
                        <GoArrowRight className="col-start-7 justify-self-center size-8" />
                    </div>
                    <h1 className="text-right text-lg font-semibold">رمز عبور را وارد کنید</h1>
                    <div className="grid grid-cols-10 gap-4 border border-stone-200 rounded-lg items-center py-1 px-3">
                        {
                            showPassword ?
                                <FaRegEye onClick={() => setShowPassword(!showPassword)}
                                    className="col-span-1 size-6 cursor-pointer" /> :
                                <PiEyeClosedBold onClick={() => setShowPassword(!showPassword)}
                                    className="col-span-1 size-6 cursor-pointer" />
                        }
                        <input type={showPassword ? "text" : "password"} className="outline-none text-right col-span-9 p-2
                        text-lg" />
                    </div>
                    <div className="grid grid-cols-1">
                        <Link href={"/"} className="flex items-center justify-end">
                            <FaAngleLeft className="text-cyan-500" />
                            <p className="text-cyan-500 text-sm font-semibold">ورود با رمز یک‌بار‌مصرف</p>
                        </Link>
                        <Link href={"/"} className="flex items-center justify-end">
                            <FaAngleLeft className="text-cyan-500" />
                            <p className="text-cyan-500 text-sm font-semibold">فراموشی رمز عبور</p>
                        </Link>
                    </div>
                    <button className="bg-red-500 w-full text-white font-bold p-3 rounded-lg">تایید</button>
                </form>
            </div>
        </Zoom>
    )
}; export default LoginForm;