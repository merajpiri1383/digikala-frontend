"use client"
import { useEffect, useState } from "react";
import { FaFireFlameCurved } from "react-icons/fa6";
import API,{handle401Error} from "../../src/api";
import {useRouter} from "next/navigation";
import SliderMost from "../../src/slider/sliderMost";


const MostSell = () => {

    const [products,setProducts] = useState([]);
    const router = useRouter();
    
    useEffect(() => {
        (async () => {
            await API.get("/product/most-sell/").then((response) =>{
                setProducts(response.data);
            }).catch((error) => {
                error.response.status === 401 && handle401Error(router);
            })
        })();
    },[]);

    
    return (
        <div className="m-6 border rounded-lg p-6">
            <div className="flex items-center justify-center gap-2">
                <h1 className="font-semibold text-xl">پرفروش‌ترین کالاها </h1>
                <FaFireFlameCurved color="orange" size={"1.5rem"} />
            </div>
            <SliderMost data={products} />
        </div>
    )
}; export default MostSell;