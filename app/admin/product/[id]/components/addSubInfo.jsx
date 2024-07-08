"use client"

import { useEffect, useState } from "react";
import Loading from "../../../../components/loading";
import API,{handle401Error} from "../../../../../src/api";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { productToggle } from "../../../../../src/reducers/product";

const AddSubInfo = ({ info }) => {
    const [name, setName] = useState("");
    const [value, setValue] = useState("");
    const [showLoading, setShowLoading] = useState(true);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => setShowLoading(false), 400);
    }, []);

    const submitHandeler = async (e) => {
        e.preventDefault();
        setShowLoading(true);
        await API.post(`/feature/info/${info.id}/`,{name:name,value : value}).then((response) => {
            dispatch(productToggle());
            setTimeout(() => setShowLoading(false),400);
        }).catch((error) => {
            error.response.status === 401 && handle401Error(router);
        })
    };

    return (
        <>
            {
                showLoading && <Loading />
            }
            {
                !showLoading && <div className="bg-white w-full rounded-lg p-3">
                    <form method="post" onSubmit={submitHandeler}>
                        <h4 className="my-6 p-2 text-rose-500 text-xl font-bold text-right">افزودن ویژگی</h4>
                        <div className="my-6 p-3 border relative rounded-lg">
                            <p className="absolute bg-white px-6 -top-4 right-6 text-lg font-bold text-rose-500">نام</p>
                            <input
                                type="text"
                                required
                                onChange={(e) => setName(e.target.value)}
                                className="p-1 w-full outline-none text-right text-lg font-bold"
                            />
                        </div>
                        <div className="my-6 p-3 border relative rounded-lg">
                            <p className="absolute bg-white px-6 -top-4 right-6 text-lg font-bold text-rose-500">مقدار</p>
                            <input
                                type="text"
                                required
                                onChange={(e) => setValue(e.target.value)}
                                className="p-1 w-full outline-none text-right text-lg font-bold"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-rose-500 text-white text-lg font-bold p-2 w-48 rounded-lg"
                        >ذخیره</button>
                    </form>
                </div>
            }
        </>
    )
}; export default AddSubInfo;