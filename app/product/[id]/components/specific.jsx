"use client"
import { Zoom } from "react-awesome-reveal";
import { useEffect, useState } from "react";
import Loading from "../../../components/loading";
import API, { handle401Error } from "../../../../src/api";
import { useParams, useRouter } from "next/navigation";

const Specific = () => {

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

    return (
        <>
            {
                showLoading && <Loading />
            }
            {
                !showLoading && <Zoom duration={300}>
                    <div className="m-6 p-6 border-b border-t">
                        <h1 className="flex justify-end font-semibold text-xl ">
                            <p className="border-b border-b-2 border-rose-500 w-16 text-center py-2">معرفی</p>
                        </h1>
                        <p className="text-right py-2 text-justify text-gray-500 text-lg">{product.introduction}</p>
                    </div>
                    <div className="m-6 p-6 border-b">
                        <h1 className="flex justify-end font-semibold text-xl ">
                            <p className="border-b border-b-2 border-rose-500 w-16 text-center py-2">مشخصات</p>
                        </h1>
                        {
                            product.info[0] && product.info.map((info,index) => {
                                return (
                                    <div key={index} className="grid grid-cols-8 my-12 gap-12">
                                        <div className="col-span-6">
                                            {
                                                info.sub_info[0] && info.sub_info.map((sub_info,index) => {
                                                    return (
                                                        <div className="grid-cols-6 grid gap-6 my-6" key={index}>
                                                            <div className="col-span-5 text-right border-b">
                                                                {sub_info.value}
                                                            </div>
                                                            <div className="col-span-1 text-right text-lg text-gray-400">
                                                                {sub_info.name}
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className="col-span-2 text-right text-lg font-md">
                                            {info.name}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Zoom>
            }
        </>
    )
}; export default Specific;