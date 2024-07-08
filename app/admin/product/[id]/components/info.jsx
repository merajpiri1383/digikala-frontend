"use client"
import Loading from "../../../../components/loading";
import Modal from "../../../../../src/modal/modal";
import API, { handle401Error } from "../../../../../src/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { productToggle } from "../../../../../src/reducers/product";
import AddSubInfo from "./addSubInfo";



const Info = ({ product }) => {

    const [name, setName] = useState("");
    const [showLoading, setShowLoading] = useState(true);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => setShowLoading(false), 400);
    }, []);

    const submitHander = async (e) => {
        e.preventDefault();
        setShowLoading(true);
        await API.post(`/feature/${product.id}/info/`, { "name": name }).then((response) => {
            console.log(response.data);
            dispatch(productToggle())
            setTimeout(() => setShowLoading(false), 400);
        }).catch((error) => {
            console.log(error)
            error.response.status === 401 && handle401Error(router);
        })
    };
    return (
        <>
            {
                showLoading && <Loading />
            }
            {
                !showLoading && <>
                    <form className="my-6 p-3" onSubmit={submitHander}>
                        <h3 className="text-right flex justify-end">
                            <p className="border-b border-rose-500 w-24 border-b-2 p-2 font-bold text-2xl text-rose-500">مشخصات</p>
                        </h3>

                        <div className="my-6 p-3 border relative rounded-lg">
                            <p className="absolute bg-white px-6 -top-4 right-6 text-lg font-bold text-rose-500">نام</p>
                            <input
                                type="text"
                                required
                                onChange={(e) => setName(e.target.value)}
                                className="p-1 w-full outline-none text-right text-lg font-bold"
                            />
                        </div>

                        <button type="submit" className="bg-rose-500 hover:bg-rose-600 text-white 
                        p-2 w-48 rounded-lg font-bold text-lg">افزودن مشخصات</button>
                    </form>
                    {
                        product.info && product.info.map((info, index) => {
                            return (
                                <div className="my-6 p-3 grid grid-cols-10">
                                    <div className="col-span-9">
                                        {
                                            info.sub_info && info.sub_info.map((sub_info,index) => {
                                                return (
                                                    <div>{sub_info.name}</div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="grid-col-1">
                                        <h4 className="text-center text-lg font-semibold my-3">{info.name}</h4>
                                        <Modal trigger={<button className="bg-rose-500 text-white w-full p-2 
                                        text-lg font-bold rounded-lg hover:bg-rose-600">تغییر</button>} 
                                        children={<AddSubInfo info={info} />} />
                                    </div>
                                </div>
                            )
                        })
                    }
                </>
            }
        </>
    )
}; export default Info;