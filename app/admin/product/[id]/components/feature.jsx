"use client"

import { useEffect, useState } from "react";
import Modal from "../../../../../src/modal/modal";
import API, { handle401Error } from "../../../../../src/api";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { productToggle } from "../../../../../src/reducers/product";
import Loading from "../../../../components/loading";
import { Zoom } from "react-awesome-reveal";

const Feature = ({ product }) => {

    const [showLoading, setShowLoading] = useState(true);
    const [data, setData] = useState({});
    const router = useRouter();
    const dispatch = useDispatch();

    const submitHander = async (e) => {
        setShowLoading(true);
        e.preventDefault();
        await API.post(`/feature/${product.id}/`, data).then((response) => {
            dispatch(productToggle());
            setTimeout(() => setShowLoading(false), 400);
        }).catch((error) => {
            error.response.status === 401 && handle401Error(router);
        })
    };

    useEffect(() => {
        setTimeout(() => setShowLoading(false), 300);
    }, []);

    const deleteHander = async (id) => {
        setShowLoading(true);
        await API.delete(`/feature/${product.id}/${id}/`).then((response) => {
            dispatch(productToggle());
            setTimeout(() => setShowLoading(false),400);
        }).catch((error ) => {
            console.log(error.response.data)
            error.response.status === 401 && handle401Error(router)
        })
    };


    return (
        <>
            {
                showLoading && <Loading />
            }
            {
                !showLoading && <Zoom duration={300}>
                    <div className="my-6 p-3">
                        <h3 className="text-right text-rose-500 font-bold text-2xl">ویژگی ها</h3>
                        <div className="grid grid-cols-8 gap-6 p-3">
                            {
                                product.feature && product.feature.map((feature, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="bg-gray-200 p-3 rounded-lg col-span-2 grid grid-cols-1 text-right relative">
                                            <p className="text-stone-500 font-semibold col-span-1 text-lg">{feature.name}</p>
                                            <p className="font-semibold">{feature.value}</p>
                                            <button className="bg-rose-500 text-white p-1 rounded-lg absolute
                                            bottom-0 font-bold" onClick={() => deleteHander(feature.id)}>حذف</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <form method="post" onSubmit={submitHander}>
                            <div className="my-6 p-3 relative border rounded-lg">
                                <p className="absolute -top-4 text-rose-500 font-bold text-lg right-6 bg-white px-6">نام</p>
                                <input
                                    type="text" required
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                    className="outline-none w-full text-lg font-bold text-lg text-right"
                                />
                            </div>

                            <div className="my-6 p-3 relative border rounded-lg">
                                <p className="absolute -top-4 text-rose-500 font-bold text-lg right-6 bg-white px-6">مقدار</p>
                                <input
                                    type="text" required
                                    onChange={(e) => setData({ ...data, value: e.target.value })}
                                    className="outline-none w-full text-lg font-bold text-lg text-right"
                                />
                            </div>
                            <button
                                className="bg-rose-500 text-white text-lg w-48 font-bold p-2 rounded-lg hover:bg-rose-600"
                                type="submit">
                                ذخیره
                            </button>
                        </form>
                    </div>
                </Zoom>
            }
        </>
    )
}; export default Feature;