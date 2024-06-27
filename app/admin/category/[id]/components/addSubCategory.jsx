"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import API,{handle401Error} from "../../../../../src/api";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { subCategoryToggle } from "../../../../../src/reducers/category";
import { toast } from "react-toastify";

const AddSubCategory = () => {

    const [name, setName] = useState("");
    const [file, setFile] = useState("");
    const [showLoading, setShowLoading] = useState(true);
    const formData = new FormData();
    const params = useParams();
    const router = useRouter();
    const dispatch = useDispatch();

    const submitHandeler = async (e) => {
        setShowLoading(true);
        e.preventDefault();
        formData.append("name",name);
        formData.append("image",file);
        formData.append("category",params.id);

        await API.post("/category/sub-category/",formData).then((response) => {
            toast.success("زیر مجموعه دسته بندی افزوده شد");
            dispatch(subCategoryToggle());
            setTimeout(() => {
                setShowLoading(false);
            },400);
        }).catch((error) =>{
            try{
                error.response.status === 401 && handle401Error(router);
                console.log(error.response.data)
            }catch{}
        })
        dispatch(subCategoryToggle())
    };

    useEffect(() => {

        setTimeout(() => {
            setShowLoading(false);
        }, 400);

    }, []);

    return (
        <>
            {
                !showLoading && <>
                    <form className="border p-6 my-6 rounded-lg" onSubmit={submitHandeler}>
                        <p className="text-right font-semibold text-lg">افزودن زیر مجموعه دسته بندی</p>
                        <div className="my-3 px-4 relative border rounded-lg my-6">
                            <p className="-top-4 text-rose-500 bg-white px-6 text-lg absolute right-6">نام</p>
                            <input
                                type="text" required
                                className="w-full outline-none  p-3 text-lg text-right"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="my-3 px-4 relative border rounded-lg my-6">
                            <p className="-top-4 text-rose-500 bg-white px-6 text-lg absolute right-6">تصویر</p>
                            <input 
                            type="file" required
                            accept="image/jpg,image/png,image/jpeg"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="w-full text-right  outline-none p-3"
                            />
                        </div>
                        <button type="submit" 
                        className="text-white bg-rose-500 p-3 m-3 rounded-lg px-6 hover:bg-rose-600">
                            ذخیره
                        </button>
                    </form>
                </>
            }
        </>
    )
}; export default AddSubCategory;