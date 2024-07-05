"use client"
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Loading from "../../../../components/loading";
import API, { handle401Error } from "../../../../../src/api";
import { Zoom } from "react-awesome-reveal";
import { useRouter } from "next/navigation";
import Picture from "./picture";
import { useSelector } from "react-redux";

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
                    </div>
                </Zoom>
            }
        </>
    )
}; export default Product;