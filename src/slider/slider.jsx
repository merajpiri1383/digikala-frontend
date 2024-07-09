import { useState , useEffect } from "react";
import "./slider.css";

const Slider = ({data}) => {
    const [slideIndex, setSlideIndex] = useState(0);
    let timeInterval ; 
    useEffect(() => {
        timeInterval =  setTimeout(() => slideIndex === data.length - 1 ?
         setSlideIndex(0) : setSlideIndex(slideIndex + 1),4000);
    },[slideIndex]);
    const sliderDotClick = (index) => {
        clearTimeout(timeInterval);
        setSlideIndex(index);

    }
    return (
        <div className="slider">
            {
                data && data.map((poster, index) => {
                    if (index === slideIndex) {
                        return (
                            <img
                                src={poster.image}
                                alt={poster.image}
                                key={index}
                                className={`${index % 2 === 0 ? "slide-even" : "slide-odd"} h-96 w-full object-cover`}
                            />
                        )
                    }
                })
            }
            <div className="slider-dots">
                {
                    data.map((poster,index) => {
                        return (
                            <span 
                            key={index}
                            onClick={() => sliderDotClick(index)}
                            className={`slider-dot ${index === slideIndex && "slider-dot-active"}`}></span>
                        )
                    })
                }
            </div>
        </div>
    )
};export default Slider;