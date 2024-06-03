"use client"
//react reveal awesome 
import { Fade } from "react-awesome-reveal";
// icons 
import { FiPlus } from "react-icons/fi";
import { FiEdit3 } from "react-icons/fi";
// next js 
import Link from "next/link";
// components 
import { lazy } from "react";
const ChangePassword = lazy(() => import("./changePassword"));
// Modal 
import Modal  from "../../../../lib/modal/modal";

const Info = () => {
    return (
        <Fade duration={300}>
            <div className="grid grid-cols-2">
                <div className="col-span-1 grid grid-cols-5 items-center p-3">
                    <Link href={"/"}><FiPlus className="col-span-1 size-1/3" /></Link>
                    <p className="col-span-4 text-right text-stone-400">کد ملی / گذرنامه / گواهی اقامت</p>
                </div>
                <div className="col-span-1 grid grid-cols-5 items-center p-3 border-l">
                    <Link href={"/"}><FiPlus className="col-span-1 size-1/3" /></Link>
                    <p className="col-span-4 text-right text-stone-400">نام و نام خانوادگی</p>
                </div>
            </div>
            <div className="grid grid-cols-2 ">
                <div className="col-span-1 grid grid-cols-5 items-center p-3 border-t">
                    <Link href={"/"}><FiPlus className="col-span-1 size-1/3" /></Link>
                    <p className="col-span-4 text-right text-stone-400">ایمیل</p>
                </div>
                <div className="col-span-1 grid grid-cols-5 items-center p-3 border-t border-l">
                    <Link href={"/"}><FiPlus className="col-span-1 size-1/3" /></Link>
                    <p className="col-span-4 text-right text-stone-400">ایمیل</p>
                </div>
            </div>
            <div className="grid grid-cols-2 ">
                <div className="col-span-1 grid grid-cols-5 items-center p-3 border-t">
                    <Modal trigger={<FiEdit3 className="size-8 cursor-pointer col-span-1" />}>
                        <ChangePassword />
                    </Modal>
                    <p className="col-span-4 text-right text-stone-400"> تغییر رمز عبور </p>
                </div>
                <div className="col-span-1 grid grid-cols-5 items-center p-3 border-t border-l">
                    <Link href={"/"}><FiPlus className="col-span-1 size-1/3" /></Link>
                    <p className="col-span-4 text-right text-stone-400">نام و نام خانوادگی</p>
                </div>
            </div>
        </Fade>
    )
}; export default Info;