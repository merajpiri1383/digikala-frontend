"use client"
import { useEffect, useState } from "react";
import { Zoom } from "react-awesome-reveal";
import API, { handle401Error } from "../../../../lib/config/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Loading from "../../../components/loading";

const AddCategory = () => {

    const formData = new FormData();
    const [name, setName] = useState("");
    const [file, setFile] = useState();
    const router = useRouter();
    const [showLoading, setShowLoading] = useState(true);

    const submitHandeler = async (e) => {
        setShowLoading(true);
        e.preventDefault();
        formData.append("name", name);
        formData.append("image", file);
        await API.post("/category/", formData).then((response) => {
            toast.success("دسته بندی ذخیره شد")
        }).catch((error) => {
            try {
                error.response.status === 401 && handle401Error(router);
            } catch { }
        })
        setTimeout(() => {
            setShowLoading(false);
        },300)
    };
    
    useEffect(() => {
        setShowLoading(false);
    },[])

    return (
        <Zoom duration={300}>
            {
                showLoading && <Loading />
            }
            {
                !showLoading && <form className="w-full border rounded-lg p-6 shadow" onSubmit={submitHandeler}>
                    <p className="text-right font-semibold text-lg my-3">افزودن دسته بندی</p>
                    <div className="my-2 p-2">
                        <p className="text-right text-lg">نام </p>
                        <input
                            type="text" required
                            onChange={(e) => setName(e.target.value)}
                            className="w-full outline-none border my-2 text-lg p-2 rounded-lg text-right" />
                    </div>
                    <div className="my-2 p-2">
                        <p className="text-right text-lg">تصویر </p>
                        <input
                            type="file"
                            className="w-full outline-none border my-2 text-lg p-2 rounded-lg text-right"
                            accept="image/jpg,image/jpeg,image/png" required
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>
                    <button type="submit" className="bg-green-600 text-xl text-white p-2 px-6 rounded-lg hover:bg-green-700">
                        ذخیره
                    </button>
                </form>
            }
        </Zoom>
    )
}; export default AddCategory;