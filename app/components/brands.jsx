"use client"

import API, { handle401Error } from "../../src/api";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { HiMiniStar } from "react-icons/hi2";
import { HiOutlineChevronRight } from "react-icons/hi";
import { HiOutlineChevronLeft } from "react-icons/hi";


const SliderProduct = ({ data }) => {
    const [slideIndex, setSlideIndex] = useState(1);
    const [slides, setSlides] = useState([]);

    useEffect(() => {

        let slideList = [];
        for (let i = 1; i < 9; i++) {

            if (slideIndex + i > data.length - 1) {
                slideList.push(data[slideIndex + i - (data.length - 1)])
            } else {
                slideList.push(data[slideIndex + i])
            }
        }
        setSlides(slideList);
    }, [slideIndex, data]);

    return (
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
                onClick={() => data.length - 1 === slideIndex ? setSlideIndex(0) : setSlideIndex(slideIndex + 1)}
                className="absolute rounded-full p-2 bg-white border top-12 right-0">
                <HiOutlineChevronRight className="size-6 text-gray-400 hover:text-gray-600" />
            </button>
            <button
                onClick={() => 0 === slideIndex ? setSlideIndex(data.length - 1) : setSlideIndex(slideIndex - 1)}
                className="absolute rounded-full p-2 bg-white border left-0 top-12">
                <HiOutlineChevronLeft className="size-6 text-gray-400 hover:text-gray-600" />
            </button>
        </div>
    )
}


const Brands = () => {

    const [brands, setBrands] = useState([]);
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


    return (
        <div className="m-6 p-6 border rounded-lg">
            <div className="flex items-center justify-center gap-2">
                <h1 className="font-semibold text-xl">محبوب‌ترین برندها</h1>
                <HiMiniStar color="orange" size={"1.5rem"} />
            </div>
            <SliderProduct data={brands} />
        </div>
    )
}; export default Brands;