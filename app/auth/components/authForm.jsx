"use client"

// react and next tools 
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
// other tools   
import Logo from "../../../static/logo.svg";
import API from "../../../lib/config/api";
// react toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// redux tools 
import { useDispatch } from "react-redux";
import { changeUser } from "../../../lib/reducers/user";
// reveal 
import { Zoom } from "react-awesome-reveal";


// regex for validating email input 
const passwordRegex = /^([a-zA-Z0-9._]{1,}@(g|e)mail.com)$/

const AuthForm = () => {


    const dispath = useDispatch();
    const [emailValid, setEmailValid] = useState(false);
    const [email, setEmail] = useState("");
    const router = useRouter();

    const inputHandeler = (e) => {
        if (passwordRegex.test(e.target.value)) {
            setEmail(e.target.value);
            setEmailValid(true);
            dispath(changeUser({ email: e.target.value }));
        } else {
            setEmailValid(false);
        }
    };

    const sendOTPEmail = async () => {
        await API.post("/account/send-otp/",{email : email}).then().catch();
    };

    const formHandeler = async (e) => {
        e.preventDefault();
        await API.post("account/auth/", { email: email }).then((response) => {
            dispath(changeUser({ created: response.data.created , email : email }));
            if (response.data.created) { 
                sendOTPEmail();
                router.push("/auth/login-with-otp/");
            }else{
                router.push("/auth/login/");
            }
        }).catch((error) => {
            console.log(error)
            try {
                if (error.response.status === 429) {
                    toast.error("شما بیشتر از ۳ بار تلاش ناموفق داشته اید لطفا بعدا امتحان کنید")
                }
            } catch { }
        });
    };

    return (
        <Zoom duration={300}>
            <div className="flex justify-center p-5">
                <form onSubmit={formHandeler} className="outline outline-gray-300 rounded-lg outline-1 p-8 m-4 w-96">
                    <div className="flex justify-center">
                        <Image
                            src={Logo}
                            className="size-36 h-20"
                            alt="logo"
                        />
                    </div>
                    <div className="grid grid-row-2 text-right gap-3 p-3 ">
                        <p className="font-medium text-xl">ورود | ثبت‌نام</p>
                        <p className="font-extralight text-sm
                    text-gray-600">!سلام</p>
                        <p className="font-extralight text-sm 
                    text-gray-600">لطفا ایمیل خود را  کنید</p>
                    </div>
                    <div className="p-3 text-right">
                        <input type="email" className={`text-lg p-3 outline
                    ${emailValid ? `outline-green-500` : `outline-rose-500`} rounded-lg w-full
                    outline-1 text-right ${emailValid ? `text-green-500` : `text-rose-500`}`}
                            onChange={(e) => inputHandeler(e)} />
                        <p className={`font-extralight text-xs text-rose-500 transition duration-300
                    ${emailValid ? `text-green-500` : `text-rose-500`}`}
                        >لطفا این قسمت را خالی نگذارید</p>
                    </div>
                    <div className="p-3 flex justify-center">
                        <button type="submit" disabled={!emailValid} className="bg-rose-500 text-white p-3 w-full rounded-lg 
                        disabled:bg-rose-300 disabled:cursor-not-allowed transition duration-300 active:bg-rose-600 
                        hover:bg-rose-400">ورود</button>
                    </div>
                    <p className="text-xs text-right text-gray-400">
                        ورود شما به معنای پذیرش
                        <span className="text-cyan-600">شرایط دیجی‌کالا</span>
                        و
                        <span className="text-cyan-600"> قوانین حریم‌خصوصی</span>
                        است
                    </p>
                </form>
            </div>
        </Zoom>
    )
}; export default AuthForm;