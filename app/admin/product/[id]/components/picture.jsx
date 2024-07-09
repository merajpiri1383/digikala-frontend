"use client"

import Loading from "../../../../components/loading";
import { useState, useEffect } from "react";
import API,{handle401Error} from "../../../../../src/api";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { productToggle } from "../../../../../src/reducers/product";
import { toast } from "react-toastify";


const Picture = ({ product }) => {

    const [showLoading, setShowLoading] = useState(true);
    const router = useRouter();
    const dispatch = useDispatch();
    const [file,setFile] = useState();
    const formData= new FormData();

    useEffect(() => {
        setTimeout(() => setShowLoading(false), 400);
    }, []);
    const deleteImageHandeler = async (id) => {
        setShowLoading(true);
        await API.delete(`/product/${product.id}/image/${id}/`).then((response) => {
            dispatch(productToggle())
            setTimeout(() => setShowLoading(false),400);
        }).catch((error) => {
            console.log(error.response.data);
            error.response.status === 401 && handle401Error(router);
        })
    };

    const submitHander = async (e) => {
        e.preventDefault();
        setShowLoading(true);
        formData.append("picture",file);
        await API.post(`/product/${product.id}/image/`,formData).then((response) => {
            dispatch(productToggle());
            setTimeout(() => setShowLoading(false),400);    
        }).catch((error) => {
            setTimeout(() => setShowLoading(false),400);
            product.images.length && 4 && toast.error("این محصول دارای 4 تصویر می باشد")
            error.response.status === 401 && handle401Error(router);
        })
    };

    return (
        <>
            {
                !showLoading && <div className="grid grid-cols-8">
                    <div className="col-span-4">
                        <img
                            src={product.picture}
                            alt={product.name}
                            className="object-cover rounded-lg h-96"
                        />
                    </div>
                    {
                        product.images[0] ?
                            <div className="grid grid-cols-2 p-3 gap-5 col-span-4">
                                {
                                    product.images.map((image, index) => {
                                        return (
                                            <div key={index} className="col-span-1 rounded-lg relative h-44">
                                                <img
                                                    src={image.picture}
                                                    className="object-cover h-44 rounded-lg"
                                                />
                                                <button
                                                    onClick={() => deleteImageHandeler(image.id)}
                                                    className="bg-rose-500 text-white absolute bottom-0
                                                    rounded-lg p-1 px-3 font-bold">حذف</button>
                                            </div>
                                        )
                                    })
                                }
                            </div> :
                            <p className="font-bold text-lg flex items-center justify-center 
                col-span-4">تصویری موجود نیست</p>
                    }
                    <form className="col-span-12 my-6 grid grid-cols-12 border rounded-lg" onSubmit={submitHander}>
                        <input required
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="col-span-8 p-3 font-bold text-lg outline-none"
                        />
                        <button className="font-bold text-lg text-white bg-rose-500 p-3 rounded-lg 
                                hover:bg-rose-600 col-span-4">افزودن تصویر</button>
                    </form>
                </div>
            }
            {
                showLoading && <Loading />
            }
        </>
    )
}; export default Picture;