"use client"
import { useEffect, useState } from "react";
import { Zoom } from "react-awesome-reveal";
import Loading from "../../../../components/loading";
import API, { handle401Error } from "../../../../../src/api";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Link from "next/link";

const Subcategories = () => {

    const [subcategories, setSubcategories] = useState([]);
    const [showLoading, setShowLoading] = useState(true);
    const params = useParams();
    const router = useRouter();
    const subcategoryToggle = useSelector((state) => state.category.sub_category_toggle);


    useEffect(() => {
        setShowLoading(true);
        (async () => {
            await API.get(`/category/${params.id}/`).then((response) => {
                setSubcategories(response.data.sub_categories);
                setTimeout(() => {
                    setShowLoading(false);
                }, 300);
            }).catch((error) => {
                try {
                    error.response.status === 401 && handle401Error(router);
                    console.log(error.response.data);
                } catch { };
            })
        })()
    }, [subcategoryToggle]);

    return (
        <>
            {
                showLoading && <Loading />
            }
            {
                !showLoading && subcategories && <>
                    <div className="border grid grid-cols-4 gap-3 p-3 rounded-lg">
                        {
                            subcategories.map((subcategory, index) => {
                                return (
                                    <Zoom key={index}>
                                        <Link 
                                        href={`/admin/category/${params.id}/${subcategory.id}/`}>
                                            <div className="col-span-1">
                                                <img
                                                    src={subcategory.image}
                                                    alt={subcategory.name}
                                                    className="h-32 object-cover rounded-lg"
                                                />
                                                <p className="text-center">
                                                    {subcategory.name}
                                                </p>
                                            </div>
                                        </Link>
                                    </Zoom>
                                )
                            })
                        }
                    </div>
                </>
            }
        </>
    )
}; export default Subcategories;