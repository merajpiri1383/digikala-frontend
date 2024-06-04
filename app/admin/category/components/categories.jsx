"use client"

import Loading from "../../../components/loading";
import { useState, useEffect } from "react";
import API, { handle401Error } from "../../../../lib/config/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Zoom, Slide } from "react-awesome-reveal";



const Categorys = () => {

    const [showLoading, setShowLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const router = useRouter();
    const categoryToggle = useSelector((state) => state.category);

    useEffect(() => {

        (async () => {

            await API.get("/category/").then((response) => {
                setCategories(response.data);

                setTimeout(() => {
                    setShowLoading(false);
                }, 400)

            }).catch((error) => {
                try {
                    error.response.status === 401 && handle401Error(router);
                } catch { }
            })
        })()

    }, [categoryToggle.toggle]);

    return (
        <>
            {
                showLoading && <Loading />
            }
            {
                !showLoading && <>
                    <Zoom duration={300}>
                        <div className="border my-6 rounded-lg shadow p-6">
                            <p className="font-semibold text-right text-lg">دسته بندی ها</p>
                            <div className="grid grid-cols-12 gap-3 p-3">
                                {
                                    categories.map((category, index) => {
                                        return (
                                            <Link href={"/"} className="col-span-4">
                                                <Slide duration={200}>
                                                    <div className="border rounded-lg my-2 hover:scale-105 
                                                    transition duration-200 hover:shadow-xl">
                                                        <img  
                                                        className="object-cover h-48 rounded-lg"
                                                        src={category.image}
                                                        alt={category.name}
                                                        />
                                                        <p className="my-3 text-lg text-center">{category.name}</p>
                                                    </div>
                                                </Slide>
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </Zoom>
                </>
            }
        </>
    )
}; export default Categorys;