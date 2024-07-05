"use client"
import Link from "next/link";
import { Zoom } from "react-awesome-reveal";

const RightPannel = () => {
    return ( 
        <Zoom duration={200} className="sticky top-6">
            <div className="border border-stone-200 p-3 rounded-lg shadow">
                <Link href={"/admin/category/"} className="text-center">
                    <p className="hover:bg-stone-100 p-3 rounded-lg font-semibold my-2 border-b">دسته بندی ها</p>
                </Link>
                <Link href={"/admin/brand/"} className="text-center">
                    <p className="hover:bg-stone-100 p-3 rounded-lg font-semibold my-2 border-b">برند ها</p>
                </Link>
                <Link href={"/admin/product/"} className="text-center">
                    <p className="hover:bg-stone-100 p-3 rounded-lg font-semibold my-2">افزودن محصول</p>
                </Link>
            </div>
        </Zoom>
    )
}; export default RightPannel;