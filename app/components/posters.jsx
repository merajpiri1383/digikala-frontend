"use client"

import API, { handle401Error } from "../../src/api";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Slider from "../../src/slider/slider";




const Posters = () => {

    const [posters, setPosters] = useState([]);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            await API.get("/settings/poster/").then((response) => {
                setPosters(response.data);
            }).catch((error) => {
                error.response.status === 401 && handle401Error(router);
            })
        })()
    }, []);

    return (
        <>
        <Slider data={posters} />
        </>
    )
}; export default Posters;


