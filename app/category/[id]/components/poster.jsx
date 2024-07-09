"use client"
import { useEffect, useState } from "react";
import API,{handle401Error} from "../../../../src/api";
import Slider from "../../../../src/slider/slider";
import {useParams, useRouter} from "next/navigation";

const Poster = () => {
    const [posters,setPosters] = useState([]);
    const params = useParams();
    const router = useRouter();

    useEffect(() => {
        ( async () => {
            await API.get(`/category/${params.id}/`).then((response) => {
                setPosters(response.data.posters)
            }).catch((error) => {
                error.response.status === 401 && handle401Error(router)
            })
        })()
    },[]);
    return (
        <div>
            <Slider data={posters} />
        </div>
    )
};export default Poster;