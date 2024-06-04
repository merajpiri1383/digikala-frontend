"use client"
import { FiEdit3 } from "react-icons/fi";
import API, { handle401Error } from "../../../lib/config/api";
import { useDispatch, useSelector } from "react-redux";
import { changeUser } from "../../../lib/reducers/user";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import { Zoom } from "react-awesome-reveal";


const RightPannel = () => {


    const user = useSelector((state) => state.user);
    const router = useRouter();
    const dispatch = useDispatch();

    return (
        <Zoom duration={300}>
            <div className="p-5">
                <div className="my-2 grid grid-cols-4 items-center">
                    <Link href={"/profile/personal/"} className="hover:scale-110 transition duration-200">
                        <FiEdit3 className="col-span-1 text-cyan-500 size-1/3" />
                    </Link>
                    <p className="col-span-3 font-semibold text-right">{user.email}</p>
                </div>
            </div>
        </Zoom>
    )
}; export default RightPannel;