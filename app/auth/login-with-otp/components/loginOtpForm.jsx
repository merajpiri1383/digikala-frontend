"use client"
// react reveal 
import { Zoom } from "react-awesome-reveal";
// logo 
import Logo from "../../../../static/logo.svg";
import Image from 'next/image';
// icon 
import { GoArrowRight } from "react-icons/go";
import { FaAngleLeft } from "react-icons/fa";
// redux 
import { useSelector } from "react-redux";
// react tools 
import { useState } from "react";
// regex 
const inputRegex = /^([0-9]){1,}$/;
// next js tools 
import Link from "next/link";
import { useRouter } from "next/navigation";
// API 
import API,{setToken} from "../../../../lib/config/api";
// react toastify 
import { toast } from "react-toastify";



const LoginOtpForm = () => {
    const user = useSelector((state) => state.user);
    const [otp,setOtp] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();
    const inputHandeler = (e) => {
        if (inputRegex.test(e.target.value)) {
            setError(null);
            setOtp(e.target.value);
        } else {
            setError("مقدار وارد شده باید فقط شامل عدد باشد")
        }
    };
    const formhandeler = async (e) => {
        e.preventDefault();
        console.log("submit");
        user.email && await API.post("/account/activate/",{email : user.email,otp : otp}).then((response) => {
            setToken(response.data.access_token,response.data.refresh_token);
            return router.push("/");
        }).catch((error)=> {
            switch(error.response.data["detail"]){
                case "required-otp" : {
                    console.log("otp is required");
                    toast.error("شما هنوز کد تایید را وارد نکرده")
                }
            }
            console.log(error.response.data["detail"] );
        })
    };
    return (
        <Zoom duration={500}>
            <div className="h-96 m-5 p-5 flex items-center justify-center">
                <form onSubmit={formhandeler} className="border border-stone-200 rounded-lg w-96 p-5">
                    <div className="grid grid-cols-7 items-center">
                        <Image
                            src={Logo}
                            alt="logo"
                            className="size-36 h-20 col-start-3 col-span-3"
                        />
                        <Link href={"/auth/"} className="col-start-7 justify-self-center">
                            <GoArrowRight className="size-8" />
                        </Link>
                    </div>
                    <div className="grid items-center justify-end gap-3">
                        <p className="text-right text-lg">کد تایید را وارد کنید</p>
                        <p className="text-right text-gray-500 text-sm">
                        پیامک شد <span className="font-semibold">{user.email}</span>کد تایید برای ایمیل   
                        </p>
                    </div>
                    <div className="my-2">
                        <input type="text" maxLength={6} className={`border border-stone-200 w-full p-3 text-lg rounded-lg 
                        outline-none focus:border-cyan-400 transition duration-400 text-center tracking-widest text-cyan-400
                        ${error ? "border-red-500 focus:border-red-500 text-red-500 " : ""}`}
                            onChange={inputHandeler} />
                        <p className="text-right text-red-500 text-sm">{error}</p>
                    </div>
                    <Link href={"/auth/login/"} className="flex justify-end items-center">
                        <FaAngleLeft className="text-cyan-500 mt-1" />
                        <p className="text-sm text-right text-cyan-500">ورود با رمز عبور</p>
                    </Link>
                    <button type="submit" className="bg-rose-500 w-full rounded-lg text-white mt-5 p-3">تایید</button>
                </form>
            </div>
        </Zoom>
    )
}; export default LoginOtpForm;