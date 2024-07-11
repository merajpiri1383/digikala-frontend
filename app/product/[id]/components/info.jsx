"use client"
import { useEffect, useState } from "react";
import Loading from "../../../components/loading";
import API, { handle401Error } from "../../../../src/api";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FaShop } from "react-icons/fa6";

const Info = () => {
    const [currentColor, setCurrentColor] = useState();
    const [showLoading, setShowLoading] = useState(true);
    const [product, setProduct] = useState();
    const router = useRouter();
    const params = useParams();
    useEffect(() => {
        // product && setCurrentColor(product.colors[0])
        (async () => {
            await API.get(`/product/${params.id}/`).then((response) => {
                setProduct(response.data);
                setTimeout(() => setShowLoading(false), 400);
            }).catch((error) => {
                error.response.status === 401 && handle401Error(router);
            })
        })();
    }, []);

    useEffect(() => {
        product && setCurrentColor(product.colors[0])
    }, [product])
    return (
        <>
            {
                showLoading && <Loading />
            }
            {
                !showLoading && <div className="my-6 p-3">
                    <div className="flex justify-end gap-3">
                        <p className="text-right text-sky-400 font-semibold">{product.sub_category.name}</p>
                        <span className="text-gray-400">/</span>
                        <Link href={`/category/${product.sub_category.category.id}/`}>
                            <p className="text-right text-sky-400 font-semibold">{product.sub_category.category.name}</p>
                        </Link>
                    </div>
                    <h1 className="font-semibold text-xl text-right">{product.name}</h1>
                    <div className="grid grid-cols-10">
                        <div className="col-span-4 m-3 border rounded-lg p-4 bg-gray-100">
                            <h4 className="text-right font-md text-lg">فروشنده</h4>
                            <div className="flex justify-end gap-3 items-center">
                                <p className="text-green-700 col-span-1 ">منتخب</p>
                                <p className="col-span-2 text-center">پایاگستر شهر</p>
                                <FaShop color="green" className="col-span-1" size={"1.5rem"} />
                            </div>
                            <div className="flex items-center justify-end gap-2 border-b p-3">
                                <p className="text-green-700">عالی</p>
                                <p>عملکرد</p>
                            </div>
                            <div className="p-3 my-3">
                                <p className="text-lg font-bold">تومان {product.price}</p>
                                <button className="bg-rose-500 p-3 rounded-lg w-full text-white my-3">افزودن به سبد خرید</button>
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="my-3 py-3">
                                <h2 className="text-right text-xl font-medium">رنگ: {currentColor.name}</h2>
                                <div className="flex justify-end my-3 gap-3">
                                    {
                                        product.colors[0] && product.colors.map((color, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    style={{ backgroundColor: `#${color.hex}` }}
                                                    onClick={() => setCurrentColor(color)}
                                                    className={`size-12 rounded-full cursor-pointer border border-4 
                                    ${color.id === currentColor.id && "border-sky-400"}`}></div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="my-3">
                                <h2 className="text-right text-xl font-medium">ویژگی‌ها</h2>
                                <div className="grid grid-cols-3 gap-2 my-3">
                                    {
                                        product.feature[0] && product.feature.map((feature, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="bg-gray-200 p-3 rounded-lg grid grid-cols-1 text-right">
                                                    <p className="text-stone-500 font-semibold col-span-1 text-md">{feature.name}</p>
                                                    <p className="font-semibold text-sm">{feature.value}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}; export default Info;