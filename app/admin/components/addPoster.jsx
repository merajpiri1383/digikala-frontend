"use client"

import { useEffect, useState } from "react";
import Loading from "../../components/loading";
import API, { handle401Error } from "../../../src/api";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toggleSettings } from "../../../src/reducers/settings";

const AddPoster = () => {

    const [showLoading, setShowLoading] = useState(true);
    const formData = new FormData();
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => setShowLoading(false), 400);
    }, []);

    const submitHandeler = async (e) => {
        setShowLoading(true);
        e.preventDefault();
        await API.post("/settings/poster/", formData).then((response) => {
            setTimeout(() => setShowLoading(false), 400);
            dispatch(toggleSettings());
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
                !showLoading && <form method="post" className="p-3" onSubmit={submitHandeler}>
                    <h3 className="text-right text-lg font-bold text-rose-500">افزودن پوستر</h3>
                    <div className="border rounded-lg my-6">
                        <input
                            type="file"
                            className="outline-none w-full p-2"
                            required
                            onChange={(e) => formData.append("image", e.target.files[0])}
                        />
                    </div>
                    <button type="submit" className="bg-rose-500 hover:bg-rose-600 text-white rounded-lg w-48
                        text-lg font-bold p-2">
                        ذخیره
                    </button>
                </form>
            }
        </>
    )
}; export default AddPoster;