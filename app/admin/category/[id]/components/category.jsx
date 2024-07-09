"use client"
import Loading from "../../../../components/loading";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import API, { handle401Error, getUser } from "../../../../../src/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Modal from "../../../../../src/modal/modal";
import AddPoster from "../components/addPoster";
import { useSelector } from "react-redux";

const Category = () => {

    const [showLoading, setShowLoading] = useState(true);
    const params = useParams();
    const [category, setCategory] = useState();
    const router = useRouter();
    const [name, setName] = useState();
    const [file, setFile] = useState();
    const formData = new FormData();
    const categoryToggle = useSelector((state) => state.category.toggle )

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {

        (async () => {
            await API.get("/category/" + params.id).then((response) => {
                setCategory(response.data);
                setTimeout(() => {
                    setShowLoading(false);
                }, 300);
            }).catch((error) => {
                try {
                    error.response.status === 401 && handle401Error(router);
                } catch { }
            })
        })()

    }, [showLoading,categoryToggle]);

    const submitHandeler = async (e) => {
        setShowLoading(true);
        e.preventDefault();
        name && formData.append("name", name);
        file && formData.append("image", file);
        await API.put(`/category/${category.id}/`, formData).then((response) => {
            toast.success("تغییرات ذخیره شد")
            setTimeout(() => {
                setShowLoading(false);
            }, 300)
        }).catch((error) => {
            try {
                error.response.status === 401 && handle401Error(router);
            } catch { }
        })
    };

    const deleteHandeler = async () => {
        setShowLoading(true);
        await API.delete(`/category/${params.id}/`).then(() => {
            setTimeout(() => setShowLoading(false), 400);
            router.push("/admin/category/");
        }).catch()
    };


    return (
        <>
            {
                showLoading && <Loading />
            }
            {
                !showLoading && <>
                    <div className="grid grid-cols-4 gap-5 border p-5 rounded-md items-center">
                        <div className="col-span-1">
                            <img
                                src={category.image}
                                alt={category.name}
                                className="rounded-md h-48 object-cover"
                            />
                        </div>
                        <form className="col-span-3 grid grid-cols-1 gap-3" onSubmit={submitHandeler}>
                            <input
                                type="text"
                                placeholder={category.name}
                                onChange={(e) => setName(e.target.value)}
                                className="outline-none border p-3 text-lg rounded-md w-full text-right"
                            />

                            <input
                                type="file"
                                accept="image/jpg,image/png,image/jpeg"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="outline-none border p-3 text-lg rounded-md w-full text-right"
                            />

                            <div className="grid grid-cols-8 gap-2">
                                <button
                                    type="button"
                                    className="text-white bg-rose-500 rounded-md font-semibold hover:bg-rose-700 w-40 p-2 col-span-4"
                                    onClick={deleteHandeler}
                                >حذف</button>

                                <button
                                    type="submit"
                                    className="text-white bg-rose-500 rounded-md font-semibold hover:bg-rose-700 w-40 p-2 
                                col-span-4"
                                >ذخیره</button>
                            </div>
                        </form>
                        <Modal
                            trigger={
                                <button
                                    type="button"
                                    className="text-white bg-rose-500 rounded-md font-semibold 
                                        hover:bg-rose-700 w-40 p-2 col-span-3">پوستر ها
                                </button>}
                            children={<AddPoster category={category} />}
                        />
                    </div>
                </>
            }
        </>
    )
}; export default Category;