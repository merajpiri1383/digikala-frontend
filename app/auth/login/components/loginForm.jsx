"use client"

import { Zoom } from "react-awesome-reveal";
import Logo from "../../../../public/logo.svg";
import Image from "next/image";
import { FaRegEye } from "react-icons/fa";
import { PiEyeClosedBold } from "react-icons/pi";
import { FaAngleLeft } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";
import { useState } from "react";
import Link from "next/link";
import API, { handle401Error, setToken } from "../../../../src/api";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { changeUser } from "../../../../src/reducers/user";


const LoginForm = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState(null);
    const user = useSelector((state) => state.user);
    const router = useRouter();
    const dispatch = useDispatch();

    const formHandeler = async (e) => {
        e.preventDefault();

        await API.post("/account/login/", { email: user.email, password: password }).then((response) => {
            dispatch(changeUser({
                is_login: true,
                is_manager: response.data.user.is_manager,
                is_staff: response.data.user.is_staff
            }));
            setToken(response.data.access_token, response.data.refresh_token);
            toast.success("شما با موفقیت وارد شدید")
            router.push("/")
        }).catch((error) => {
            try {
                error.response.data["detail"] === "invalid-password" && toast.error("رمز عبور اشتباه می باشد")
                error.response.status === 401 && handle401Error(router);
                error.response.status === 429 &&
                    toast.error("رمز عبور بیشتر از ۳ بار اشتباه وارد شد لطفا بعدا امتحان کنید")
            } catch { }
        })
    }

    return (
        <Zoom duration={500}>
            <div className="h-96 p-5 m-8 flex justify-center items-center">
                <form
                    onSubmit={formHandeler}
                    className="w-96 px-8 py-6 grid gird-cols-1 gap-4 border border-stone-200 rounded-lg">
                    <div className="grid items-center grid-cols-7">
                        <Image
                            src={Logo}
                            alt="logo"
                            className="size-36 h-20 col-start-3 col-span-3"
                        />
                        <Link href={"/auth/"} className="col-start-7 justify-self-center">
                            <GoArrowRight className="size-8" />
                        </Link>
                    </div>
                    <h1 className="text-right text-lg ">رمز عبور را وارد کنید</h1>
                    <div className="grid grid-cols-10 gap-4 border border-stone-200 rounded-lg items-center py-1 px-3">
                        {
                            showPassword ?
                                <FaRegEye
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="col-span-1 size-6 cursor-pointer" /> :

                                <PiEyeClosedBold
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="col-span-1 size-6 cursor-pointer" />
                        }
                        <input
                            type={showPassword ? "text" : "password"}
                            className="outline-none text-right col-span-9 p-2 text-lg font-bold"
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-1">
                        <Link href={"/auth/login-with-otp/"} className="flex items-center justify-end">
                            <FaAngleLeft className="text-cyan-500" />
                            <p className="text-cyan-600 text-sm ">ورود با رمز یک‌بار‌مصرف</p>
                        </Link>
                    </div>
                    <button type="submit" disabled={!password && true}
                        className="bg-rose-500 w-full text-white text-md p-3 rounded-lg disabled:bg-rose-300
                    disabled:cursor-not-allowed font-semibold">تایید</button>
                </form>
            </div>
        </Zoom>
    )
}; export default LoginForm;