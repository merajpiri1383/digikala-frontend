"use client"

import { useEffect, useState } from "react";
import Loading from "../../../../components/loading";
import API, { handle401Error } from "../../../../../src/api";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { productToggle } from "../../../../../src/reducers/product";
import { changeToggle } from "../../../../../src/reducers/category";

const SubInfo = ({ sub_info }) => {
    const [name, setName] = useState("");
    const [value, setValue] = useState("");
    const [showLoading, setShowLoading] = useState(true);
    const router = useRouter();
    const dispatch = useDispatch();
    const formData = new FormData();

    useEffect(() => {
        setTimeout(() => setShowLoading(false), 400);
    }, []);

    const submitHandeler = async (e) => {
        setShowLoading(true);
        name && formData.append("name", name);
        value && formData.append("value", value);
        e.preventDefault();
        await API.put(`/feature/sub-info/${sub_info.id}/`, formData).then((response) => {
            dispatch(productToggle());
            setTimeout(() => setShowLoading(false), 400);
        }).catch((error) => {
            error.response.status === 401 && handle401Error(router);
        })

    };

    const deleteHandeler = async (id) => {
        await API.delete(`/feature/sub-info/${sub_info.id}/`, formData).then((response) => {
            dispatch(productToggle());
            setTimeout(() => setShowLoading(false), 400);
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
                        <div className="my-6 p-3 border relative rounded-lg">
                            <p className="absolute bg-white px-6 -top-4 right-6 text-lg font-bold text-rose-500">نام</p>
                            <input
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                placeholder={sub_info.name}
                                className="p-1 w-full outline-none text-right text-lg font-bold"
                            />
                        </div>
                        <div className="my-6 p-3 border relative rounded-lg">
                            <p className="absolute bg-white px-6 -top-4 right-6 text-lg font-bold text-rose-500">مقدار</p>
                            <input
                                type="text"
                                placeholder={sub_info.value}
                                onChange={(e) => setValue(e.target.value)}
                                className="p-1 w-full outline-none text-right text-lg font-bold"
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="bg-rose-500 text-white text-lg font-bold p-2 w-48 rounded-lg mx-3"
                            >ذخیره</button>
                            <button
                                type="button"
                                onClick={() => deleteHandeler(sub_info.id)}
                                className="bg-rose-500 text-white text-lg font-bold p-2 w-48 rounded-lg mx-3"
                            >حذف</button>
                        </div>
                    </form>
                </div>
            }
        </>
    )
}; export default SubInfo;