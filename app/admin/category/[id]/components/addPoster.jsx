"use client"
import API, { handle401Error } from "../../../../../src/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../../../../components/loading";
import { useDispatch } from "react-redux";
import { changeToggle } from "../../../../../src/reducers/category";

const AddPoster = ({ category }) => {

    const formData = new FormData();
    const [file, setFile] = useState("");
    const router = useRouter();
    const [showLoading, setShowLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        setTimeout(() => setShowLoading(false), 400);
        console.log(category.posters)
    }, [])

    const submitHander = async (e) => {
        file && formData.append("image", file);
        setShowLoading(true);
        e.preventDefault();
        await API.post(`/category/${category.id}/poster/`, formData).then((response) => {
            dispatch(changeToggle());
            setTimeout(() => setShowLoading(false), 400);
        }).catch((error) => {
            error.response.status === 401 && handle401Error(router);
        })
    };
    const deleteHandeler = async (id) => {
        setShowLoading(true);
        await API.delete(`/category/poster/${id}/`).then((response) => {
            dispatch(changeToggle());
            setTimeout(() => setShowLoading(false),400);
        } ).catch((error) => {
            error.response.status === 401 && handle401Error(router)
        })
    };

    return (
        <>
            {
                showLoading && <Loading />
            }
            {
                !showLoading && <div className="bg-white w-11/12 m-auto p-6 rounded-lg">
                    <form onSubmit={submitHander}>
                        <h3 className="text-rose-500 text-right font-bold text-xl">افزودن پوستر</h3>
                        <div className="my-6 p-1 border rounded-lg relative">
                            <p className="absolute -top-4 text-lg px-6 right-6 bg-white text-rose-500 text-semibold">تصویر</p>
                            <input
                                type="file"
                                className="p-1 w-full outline-none"
                                required
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </div>
                        <button type="submit" className="bg-rose-500 text-white text-lg font-bold rounded-lg w-48 p-1
                    hover:bg-rose-600">ذخیره</button>
                    </form>
                    <div className="grid grid-cols-3 gap-6 my-6 p-3">
                        {
                            category.posters.map((poster, index) => {
                                return (
                                    <div className="relative">
                                        <img
                                            src={poster.image}
                                            alt={poster.id}
                                            key={index}
                                            className="h-48 rounded-lg object-cover"
                                        />
                                        <button
                                        onClick={() => deleteHandeler(poster.id)}
                                        className="bg-rose-500 text-white font-bold p-1 rounded-lg absolute left-1
                                        bottom-1 hover:scale-105 transition">حذف</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </>
    )
}; export default AddPoster;