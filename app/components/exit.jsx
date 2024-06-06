"use client"

import { toggleExit } from "../../src/reducers/modal";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { clearToken } from "../../src/api";

const Exit = () => {
    
    const dispatch = useDispatch();
    const router = useRouter();

    const exit = () => {
        clearToken();
        Cookies.remove("refresh_token");
        dispatch(toggleExit())
        return router.push("/auth/")
    };

    return (
        <div className="mt-12 bg-white p-6 top-48 rounded-md">
            <p className="text-right border-b p-2 text-lg font-semibold">از حساب کاربری خارج می‌شوید؟</p>
            <p className="text-right p-2 text-sm">با خروج از حساب کاربری، به سبد خرید
                فعلی‌تان دسترسی نخواهید داشت.
                هروقت بخواهید می‌توانید مجددا وارد شوید و خریدتان را ادامه دهید.</p>
            <div className="grid grid-cols-10 gap-4">
                <button
                    onClick={() => exit()}
                    className="bg-rose-500 text-white text-sm col-span-2 rounded-lg p-2 ">
                    خروج ازحساب
                </button>
                <button
                    onClick={() => dispatch(toggleExit()) }
                    className="bg-white text-rose-500 border border-rose-500 text-sm col-span-2 rounded-lg p-2">
                    انصراف
                </button>
            </div>
        </div>
    )
}; export default Exit;