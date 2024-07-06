"use client"
import { lazy } from "react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import API, { handle401Error } from "../../../../../src/api";
import { Zoom } from "react-awesome-reveal";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
const Feature = lazy(() => import("./feature"));
const Data = lazy(() => import("./data"));
const Picture = lazy(() => import("./picture"));
const Loading = lazy(() => import("../../../../components/loading"));

const Product = () => {

    const params = useParams();
    const [showLoading, setShowLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const router = useRouter();
    const ProductToggle = useSelector((state) => state.product.toggle);

    useEffect(() => {

        (async () => {
            await API.get(`/product/${params.id}/`).then((response) => {
                setProduct(response.data);
                setTimeout(() => setShowLoading(false), 300);
            }).catch((error) => {
                error.response.status === 401 && handle401Error(router); 
            })
        })();
    }, [ProductToggle]);

    return (
        <>
            {
                showLoading && <Loading />
            }
            {
                !showLoading && <Zoom duration={300}>
                    <div className="border rounded-lg p-6 my-6">
                        <Picture product={product} />
                        <Data product={product} />
                        <Feature product={product} />
                    </div>
                </Zoom>
            }
        </>
    )
}; export default Product;