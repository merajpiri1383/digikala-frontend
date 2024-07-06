"use client"
import { lazy } from "react";
import { useEffect, useState } from "react";
import API, { handle401Error } from "../../../../../src/api";
import { useRouter } from "next/navigation";
const Loading = lazy(() => import("../../../../components/loading"));
import { useDispatch } from "react-redux";
import { productToggle } from "../../../../../src/reducers/product";

const Info = ({ product }) => {

    const [showLoading, setShowLoading] = useState(true);
    const formData = new FormData();
    const router = useRouter();
    const dispatch = useDispatch();
    const [subCategories, setSubcategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [data,setData] = useState({});

    useEffect(() => {
        setTimeout(() => setShowLoading(false),400);

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
        setShowLoading(true);
        data.sub_category && formData.append("sub_category", data.sub_category);
        data.brand && formData.append("brand", data.brand);
        await API.put(`/product/${product.id}/`, formData).then((response) => {
            dispatch(productToggle())
            setTimeout(() => setShowLoading(false),400);
        }).catch((error) => {
            console.log(error.response.data)
            error.response.status === 401 && handle401Error(router);
        })
    };

    return (
        <>
            {
                showLoading && <Loading />
            }
            {
                !showLoading && <form method="post" onSubmit={submitHander}>
                    <div className="my-6 border relative rounded-lg">
                        <p className="absolute bg-white px-6 font-bold text-lg -top-5 right-6 text-rose-500">نام</p>
                        <input
                            type="text"
                            className="p-3 outline-none w-full text-right text-lg font-semibold"
                            onChange={(e) => formData.append("name", e.target.value)}
                            placeholder={product.name}
                        />
                    </div>

                    <div className="my-6 border relative rounded-lg">
                        <p className="absolute bg-white px-6 font-bold text-lg -top-5 right-6 text-rose-500">تصویر</p>
                        <input
                            type="file"
                            className="p-3 outline-none w-full text-right text-lg font-semibold"
                            onChange={(e) => formData.append("picture", e.target.files[0])}
                        />
                    </div>

                    <div className="my-6 border relative rounded-lg">
                        <p className="absolute bg-white px-6 font-bold text-lg -top-5 right-6 text-rose-500">قیمت</p>
                        <input
                            type="number"
                            className="p-3 outline-none w-full text-right text-lg font-semibold"
                            placeholder={product.price}
                            onChange={(e) => formData.append("price", e.target.value)}
                        />
                    </div>

                    <div className="my-6 border relative rounded-lg">
                        <p className="absolute bg-white px-6 font-bold text-lg -top-5 right-6 text-rose-500">تخفیف</p>
                        <input
                            type="number"
                            className="p-3 outline-none w-full text-right text-lg font-semibold"
                            placeholder={product.discount} min={0} max={100}
                            onChange={(e) => formData.append("discount", e.target.value)}
                        />
                    </div>

                    <div className="relative my-6 border rounded-lg">
                            <p className="absolute font-bold text-lg right-6 -top-5 px-6 bg-white text-rose-500">زیر مجموعه</p>
                            <select
                                className="w-full p-3 outline-none text-right font-bold"
                                onChange={(e) => setData({...data,sub_category : e.target.value})}
                                >
                                {
                                    subCategories && subCategories.map((item, index) => {
                                        return (
                                            <option 
                                            selected={product.sub_category.name === item.name && "selected"}
                                            key={index} 
                                            className="font-bold text-md" 
                                            value={item.id}>{item.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className="relative my-6 border rounded-lg">
                            <p className="absolute font-bold text-lg right-6 -top-5 px-6 bg-white text-rose-500">برند</p>
                            <select
                                onChange={(e) => setData({...data, brand : e.target.value})}
                                className="w-full p-3 outline-none text-right font-bold">
                                {
                                    brands && brands.map((item, index) => {
                                        return (
                                            <option 
                                            selected={product.brand ? product.brand === item.id && "selected" : ""}
                                            key={index} 
                                            value={item.id}>{item.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                    <div className="my-6 border relative rounded-lg">
                        <p className="absolute bg-white px-6 font-bold text-lg -top-5 right-6 text-rose-500">توضیحات</p>
                        <textarea
                            className="p-3 outline-none w-full text-right text-lg font-semibold"
                            placeholder={product.introduction}
                            onChange={(e) => formData.append("introduction", e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-rose-500 p-2 w-48 text-lg font-bold rounded-lg text-white hover:bg-rose-600"
                    >ذخیره</button>
                </form>
            }
        </>
    )
}; export default Info;