"use client"

import API, { handle401Error } from "../../src/api";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import "../../src/slider/slider.css";

const Posters = () => {

    const [posters, setPosters] = useState([]);
    const [slideIndex, setSlideIndex] = useState(0);
    const router = useRouter();
    
    useEffect(() => {
        setInterval(() => {
            slideIndex === posters.length - 1 ? setSlideIndex(0) : setSlideIndex(slideIndex + 1);
        },5000);
    },[]);


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
        <div className="slider">
            {
                posters && posters.map((poster, index) => {
                    if (index === slideIndex) {
                        return (
                            <img
                                src={poster.image}
                                alt={poster.image}
                                className={`${index % 2 === 0 ? "slide-even" : "slide-odd"} h-96 w-full object-cover`}
                            />
                        )
                    }
                })
            }
            <div className="slider-dots">
                {
                    posters.map((poster,index) => {
                        return (
                            <span 
                            onClick={() => setSlideIndex(index)}
                            className={`slider-dot ${index === slideIndex && "slider-dot-active"}`}></span>
                        )
                    })
                }
            </div>
        </div>
    )
}; export default Posters;


