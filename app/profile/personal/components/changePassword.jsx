"use client"

import {  useState } from "react";
import API,{handle401Error} from "../../../../src/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";



const ChangePassword = () => {

    const [confirmNewPassword,setConfirmNewPassword] = useState(true);
    const [password,setPassword] = useState(null);
    const [passwordOne ,setPasswordOne] = useState(false);
    const [passwordTwo,setPasswordTwo] = useState(false);
    const [passwordThree,setPasswordThree] = useState(false);
    const passwordRegexWord = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{8,}$/;
    const passowrdRegexCount = /^.{8,}$/;
    const router = useRouter();


    const passwordHandeler = (e) => {

        if(passwordRegexWord.test(e.target.value)){
            setPasswordThree(true);
            setPassword(e.target.value);
        }else{
            setPassword(null);
            setPasswordThree(false);
        }

        passowrdRegexCount.test(e.target.value) ? setPasswordTwo(true) : setPasswordTwo(false);
        e.target.value.length > 0 ? setPasswordOne(true) : setPasswordOne(false);
    };

    const confirmNewPasswordHandeler = (e) => {
        e.target.value === password ? setConfirmNewPassword(false) : setConfirmNewPassword(true);
    };

    const formHandeler = async (e) => {
        e.preventDefault();
        console.log("submit")
        await API.put("/account/password/update/",{password : password}).then( ( response ) => {
            console.log(response)
            toast.success("رمز عبور شما تغییر پیدا کرد")
            router.push("/profile/")
        } ).catch( ( error ) => {
            try{
                console.log(error.response.data);
                error.response.status === 401 && handle401Error(router);
            }catch{}
        } )
    };

    return (
        <div className="bg-white p-6 rounded-lg w-8/12">
            <p className="text-right text-lg p-3 border-b font-semibold">تغییر رمز عبور</p>
            <form className="my-3" onSubmit={formHandeler}>
                <p className="text-right my-1">رمز عبور جدید</p>

                <input 
                type="password" 
                className="outline-none border border-stone-200 w-full p-2 rounded-lg"
                onChange={passwordHandeler} />

                <div className="p-1 my-2 grid grid-cols-3 gap-3">
                    <div className={`rounded-lg p-1 ${passwordThree ? "bg-lime-600" : "bg-stone-200"}`}></div>
                    <div className={`rounded-lg p-1 ${passwordTwo ? "bg-orange-600" : "bg-stone-200"}`}></div>
                    <div className={`rounded-lg p-1 ${passwordOne ? "bg-rose-600" : "bg-stone-200"}`}></div>
                </div>
                <div className="my-1">
                    <p className="my-1 text-gray-400 text-right">حداقل ۸ حرف </p>
                    <p className="my-1 text-gray-400 text-right">شامل عدد </p>
                    <p className="my-1 text-gray-400 text-right">شامل یک حرف بزرگ و کوچک </p>
                    <p className="my-1 text-gray-400 text-right">شامل علامت (@#$!^&%) </p>
                </div>

                <input 
                type="passowrd" 
                className="outline-none border border-stone-200 w-full p-2 rounded-lg"
                onChange={confirmNewPasswordHandeler} />

                <button 
                type="submit" 
                className="m-3 bg-rose-500 mt-5 p-3 text-white rounded-lg disabled:bg-rose-300 disabled:cursor-not-allowed"
                disabled={confirmNewPassword}>ذخیره رمز عبور</button>
            </form>
        </div>
    )
}; export default ChangePassword;