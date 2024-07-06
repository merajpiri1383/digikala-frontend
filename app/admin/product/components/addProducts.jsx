"use client"

import { useEffect, useState } from "react";
import API, { handle401Error } from "../../../../src/api";
import { useRouter } from "next/navigation";
import Loading from "../../../components/loading";
import { Zoom } from "react-awesome-reveal";
import { toast } from "react-toastify";

const AddProduct = () => {

    const [showLoading, setShowLoading] = useState(true);
    const [subCategories, setSubcategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const router = useRouter();
    const [data, setData] = useState({});
    const formData = new FormData();

    useEffect(() => {

        (async () => {
            await API.get("/category/sub-category/").then((response) => {
                setSubcategories(response.data)
            }).catch((error) => {
                error.response.status === 401 && handle401Error(router);
            })
        })();

        (async () => {
            await API.get("/category/brand/").then((response) => {
                setBrands(response.data);
                setShowLoading(false);
            }).catch((error) => {
                error.response.status === 401 && handle401Error(router);
            })
        })();
    }, []);

    const submitHander = async (e) => {
        e.preventDefault();
        data.name && formData.append("name", data.name);
        data.picture && formData.append("picture", data.picture);
        data.price && formData.append("price", data.price);
        data.discount && formData.append("discount", data.discount);
        data.sub_category && formData.append("sub_category", data.sub_category);
        data.brand && formData.append("brand", data.brand);
        data.introduction && formData.append("introduction",data.introduction);
        data.sub_category && setShowLoading(true);


        data.sub_category ? await API.post("/product/", formData).then((response) => {
            setTimeout(() => setShowLoading(false),400);
            toast.success("محصول افزوده شد")
        }).catch((error) => {
            error.response.status === 401 && handle401Error(router);
        }) : toast.error("زیر مجوعه را انتخاب نکرده اید")

    };

    useEffect(() => {
        console.log(data)
    } , [data])


    return (
        <>
            {
                showLoading && <Loading />
            }
            {
                !showLoading && <Zoom duration={300}>
                    <form method="post" className="my-6 border rounded-lg p-6" onSubmit={submitHander}>
                        <h3 className="text-right text-lg text-rose-500 font-bold">افزودن محصول</h3>
                        <div className="relative my-6 border rounded-lg">
                            <p className="absolute font-bold text-lg right-6 -top-5 px-6 bg-white text-rose-500">نام</p>
                            <input
                                required
                                type="text"
                                onChange={(e) => setData({...data,name : e.target.value})}
                                className="w-full p-3 outline-none text-right font-bold"
                            />
                        </div>

                        <div className="relative my-6 border rounded-lg">   
                            <p className="absolute font-bold text-lg right-6 -top-5 px-6 bg-white text-rose-500">قیمت</p>
                            <input
                                required
                                onChange={(e) => setData({...data, price : e.target.value})}
                                type="number" min={0}
                                className="w-full p-3 outline-none text-right font-bold"
                            />
                        </div>

                        <div className="relative my-6 border rounded-lg">
                            <p className="absolute font-bold text-lg right-6 -top-5 px-6 bg-white text-rose-500">تخفیف</p>
                            <input
                                onLoad={ () => {console.log("helllo")}}
                                onChange={(e) => setData({...data,discount : e.target.value})}
                                type="number" min={0}
                                className="w-full p-3 outline-none text-right font-bold"
                            />
                        </div>

                        <div className="relative my-6 border rounded-lg">
                            <p className="absolute font-bold text-lg right-6 -top-5 px-6 bg-white text-rose-500">زیر مجموعه</p>
                            <select
                                className="w-full p-3 outline-none text-right font-bold"
                                onChange={(e) => setData({...data,sub_category : e.target.value})}
                                required>
                                <option>زیر مجموعه را انتخاب کنید</option>
                                {
                                    subCategories && subCategories.map((item, index) => {
                                        return (
                                            <option key={index} className="font-bold text-md" value={item.id}>{item.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className="relative my-6 border rounded-lg">
                            <p className="absolute font-bold text-lg right-6 -top-5 px-6 bg-white text-rose-500">برند</p>
                            <select
                                required
                                onChange={(e) => setData({...data, brand : e.target.value})}
                                className="w-full p-3 outline-none text-right font-bold">
                                <option> برند را انتخاب کنید</option>
                                {
                                    brands && brands.map((item, index) => {
                                        return (
                                            <option key={index} value={item.id}>{item.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className="relative my-6 border rounded-lg">
                            <p className="absolute font-bold text-lg right-6 -top-5 px-6 bg-white text-rose-500">تصویر</p>
                            <input
                                required
                                onChange={(e) => setData({...data,picture : e.target.files[0]})}
                                type="file"
                                className="w-full p-3 outline-none text-right font-bold"
                            />
                        </div>

                        <div className="relative my-6 border rounded-lg">
                            <p className="absolute font-bold text-lg right-6 -top-5 px-6 bg-white text-rose-500">توضیحات</p>
                            <textarea
                                required
                                onChange={(e) => setData({...data,introduction : e.target.value})}
                                className="w-full p-3 outline-none text-right font-bold"
                            />
                        </div>

                        <button
                            type="submit"
                            className="text-white bg-rose-500 rounded-lg w-36 p-2 font-bold text-lg
            hover:bg-rose-600">ذخیره</button>
                    </form>
                </Zoom>
            }
        </>
    )
}; export default AddProduct; 