"use client"

import { lazy } from "react";
import API,{handle401Error} from "../../../../src/api";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import {useState , useEffect} from "react";
const Picture = lazy(() => import("./picture"));
const Info = lazy(() => import("./info"));
const Specific = lazy(() => import("./specific"));



const Product = () => {

    const [product,setProduct] = useState();
    const params = useParams();
    const router = useRouter();
    
    useEffect(() => {
        (async () => {
            await API.get(`/product/${params.id}/`).then((response) => {
                setProduct(response.data);
            }).catch((error) => {
                error.response.status === 401 && handle401Error(router);
            })
        })();
    },[]);

    return (
        <div>
            <div className="grid grid-cols-12 p-6">
                <div className="col-span-7">
                    <Info product={product} />
                </div>
                <div className="col-span-5">
                    <Picture product={product} />
                </div>
                <div className="col-span-12">
                    <Specific product={product} />
                </div>
            </div>
        </div>
    )
};export default Product;