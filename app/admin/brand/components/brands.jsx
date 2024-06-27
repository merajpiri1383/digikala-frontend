"use client"
import { useState, useEffect } from "react";
import API, { handle401Error } from "../../../../src/api";
import { useRouter } from "next/navigation";
import Loading from "../../../components/loading";
import { Zoom } from "react-awesome-reveal";
import { useSelector } from "react-redux";
import Link from "next/link";

const Brnads = () => {

    const [showLoading, setShowLoading] = useState(true);
    const [brands, setBrands] = useState([]);
    const router = useRouter();
    const brandToggle = useSelector((state) => state.brand.toggle);

    useEffect(() => {
        setShowLoading(true);

        (async () => {
            await API.get("/category/brand/").then((response) => {
                setBrands(response.data);
                setTimeout(() => setShowLoading(false), 400);
            }).catch((error) => {
                error.response.status && handle401Error(router);
            })
        })()
    }, [brandToggle]);

    return (
        <>
            {
                showLoading && <Loading />
            }
            {
                !showLoading && <Zoom duration={200}>
                    <div className="border rounded-lg my-6 p-6 grid grid-cols-4 gap-6">
                        {
                            brands && brands.map((item, index) => {
                                return (
                                    <Link key={index} href={`/admin/brand/${item.id}/`}>
                                        <div className="col-span-1 transition duration-400 hover:scale-110">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="h-48 object-cover rounded-lg"
                                            />
                                            <p className="text-center text-lg font-semibold text-rose-500">{item.name}</p>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </Zoom>
            }
        </>
    )
}; export default Brnads;