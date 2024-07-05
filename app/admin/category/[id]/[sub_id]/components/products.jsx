"use client"
import API, { handle401Error } from "../../../../../../src/api";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Products = () => {

    const [products, setProducts] = useState([]);
    const params = useParams();
    const router = useRouter();

    useEffect(() => {
        (async () => {
            await API.get(`/category/sub-category/${params.sub_id}/`).then((response) => {
                setProducts(response.data.products);
            }).catch((error) => {
                error.response.status && 401 && handle401Error(router);
            })
        })()
    }, [])

    return (
        <div className="border my-6 p-3 grid grid-cols-12 rounded-lg gap-8">
            {
                products && products.map((product, index) => {
                    return (
                        <Link href={`/admin/product/${product.id}/`} key={index} 
                        className="border rounded-lg col-span-3 
                        hover:scale-105 hover:shadow-lg transition">
                            <img
                                src={product.picture}
                                alt={product.name}
                                className="rounded-lg object-cover h-48"
                            />
                            <p className="text-lg font-bold text-center p-3">{product.name}</p>
                        </Link>
                    )
                })
            }
        </div>
    )
}; export default Products; 