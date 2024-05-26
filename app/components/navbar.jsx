// logo 
import Logo from "../../static/logo.svg";
// icons 
import { FaCartShopping } from "react-icons/fa6";
import { LuLogIn } from "react-icons/lu";
// next tools 
import Link from "next/link";
import Image from "next/image";


const Navbar = () => {
    return (
        <div className="grid-cols-9 grid p-3">
            <div className="col-span-4 grid grid-cols-10">
                <div className="flex items-center justify-center">
                    <FaCartShopping className="size-1/2" />
                </div>
                <Link href={"/auth"} className="col-span-3 flex align-items-center items-center 
                flex-row-reverse self-center justify-center py-2 outline outline-1 outline-gray-300
                rounded-lg gap-2 hover:bg-gray-50 cursor-pointer">
                    <LuLogIn />
                    ورود | ثبت نام
                </Link>
            </div>
            <form className="col-span-5 grid grid-cols-5 gap-4 foucs:bg-red-500">
                <input type="text" placeholder="جستجو" className="bg-stone-200 col-span-4 text-right
                rounded-lg p-2 outline-none focus:bg-white transition border-solid border-2
                focus:shadow-lg duration-300 " />
                <div className="flex justify-center">
                    <Image
                    src={Logo}
                    alt="logo"
                    />
                </div>
            </form>
        </div>
    )
}; export default Navbar;