"use client"

import API, { handle401Error } from "../../src/api";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { HiMiniStar } from "react-icons/hi2";
import { HiOutlineChevronRight } from "react-icons/hi";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { Slide } from "react-awesome-reveal";


const Brands = () => {

    const [brands, setBrands] = useState([]);
    const [slideIndex,setSlideIndex] = useState(1);
    const [slides,setSlides] = useState([]);
    const router = useRouter();
    useEffect(() => {
        (async () => {
            await API.get("/category/brand/").then((response) => {
                setBrands(response.data);
            }).catch((error) => {
                error.response.status === 401 && handle401Error(router);
            })
        })();
    }, []);

    useEffect(() => {

        let slideList = [];
        for(let i = 1 ; i < 9;i ++ ){
            
            if(slideIndex + i > brands.length - 1) {
                slideList.push(brands[slideIndex + i - (brands.length - 1 )])
            }else{
                slideList.push(brands[slideIndex + i])
            }
        }
        setSlides(slideList);
    },[slideIndex,brands]);

    return (
        <div className="m-6 p-6 border rounded-lg">
            <h1 className="text-2xl font-bold flex justify-center items-center my-3">
                <p>محبوب‌ترین برندها</p>
                <HiMiniStar color="orange" />
            </h1>
            <div className="grid grid-cols-8 relative h-36 gap-3 overflow-hidden">
                {
                    slides[0] && slides.map((slide, index) => {
                        return (
                            <img 
                            key={index}
                            src={slide.image}
                            alt={slide.name}
                            className="h-32 object-cover"
                            />
                        )
                    })
                }
                <button 
                onClick={() => brands.length - 1 === slideIndex ? setSlideIndex(0) : setSlideIndex(slideIndex + 1)  }
                className="absolute rounded-full p-2 bg-white border top-12 right-0">
                    <HiOutlineChevronRight className="size-6 text-gray-400 hover:text-gray-600" />
                </button>
                <button 
                onClick={() => 0 === slideIndex ? setSlideIndex(brands.length - 1) : setSlideIndex(slideIndex - 1) }
                className="absolute rounded-full p-2 bg-white border left-0 top-12">
                    <HiOutlineChevronLeft className="size-6 text-gray-400 hover:text-gray-600"  />
                </button>
            </div>
        </div>
    )
}; export default Brands;