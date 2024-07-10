"use client"

import { useEffect, useState } from "react";
import SliderMost from "../../../../src/slider/sliderMost";
import API,{handle401Error} from '../../../../src/api';
import {useRouter , useParams} from "next/navigation";

const MostSell = () => {

    const [porducts,setProducts] = useState([]);
    const router = useRouter();
    const params = useParams();
    

    useEffect(() => {
        (async () => {
            await API.get(`/product/most-sell/${params.id}/`).then((response) => {
                setProducts(response.data);
            }).catch((error) => {
                error.response.status === 401 && handle401Error(router);
            })
        })()
    },[]);

    return (
        <div className="m-6 p-6 border rounded-lg">
            <h1 className="text-center font-semibold text-xl">پرفروش‌ترین‌ها</h1>
            <div className="p-6">
                <SliderMost data={porducts} />
            </div>
        </div>
    )
};export default MostSell;