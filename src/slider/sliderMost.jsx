import { useState, useEffect } from "react";
import "./slider.css";
import { HiOutlineChevronRight } from "react-icons/hi";
import { HiOutlineChevronLeft } from "react-icons/hi";

const SliderMost = ({ data }) => {

    const slidesElement = document.getElementById("scroll-most-slider");
    let x = 0 ;

    const clickHandeler = () => {
        x = x - 200 
        slidesElement.style.transform = `translateX(${x}px)`
    };

    const clickRightHander = () => {
        x = x + 200
        slidesElement.style.transform = `translateX(${x}px)`;
    }

    return (
        <div className="slider-container">
            <div className="slides" id="scroll-most-slider">
                {
                    data.map((product, index) => {
                        return (
                            <div key={index} className="slide">
                                <p className="slide-text">{product.name.substring(0,50)}</p>
                                <p className="slide-index">{index + 1}</p>
                                <img
                                    src={product.picture}
                                    alt={product.name}
                                    className="slide-img"
                                />
                            </div>
                        )
                    })
                }
            </div>
            <button onClick={clickHandeler}
             className="slide-button btn-left"><HiOutlineChevronLeft /></button>
            <button onClick={clickRightHander}
             className="slide-button btn-right"><HiOutlineChevronRight /></button>
        </div>
    )

}; export default SliderMost;