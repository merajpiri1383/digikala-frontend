import "./slider.css";
import { HiOutlineChevronRight } from "react-icons/hi";
import { HiOutlineChevronLeft } from "react-icons/hi";
import Link from "next/link";

const SliderMost = ({ data }) => {

    const slidesElement = document.getElementById("scroll-most-slider");
    let x = 0;

    const clickHandeler = () => {
        x = x - 400
        slidesElement.scrollLeft = x;
    };

    const clickRightHander = () => {
        x = x + 400
        slidesElement.scrollLeft = x;
    }

    return (
        <div className="slider-container">
            <div className="slides" id="scroll-most-slider">
                {
                    data.map((product, index) => {
                        return (
                            <Link href={`/product/${product.id}`} key={index}>
                                <div className="slide">
                                    <p className="slide-text">{product.name.substring(0, 50)}</p>
                                    <p className="slide-index">{index + 1}</p>
                                    <img
                                        src={product.picture}
                                        alt={product.name}
                                        className="slide-img"
                                    />
                                </div>
                            </Link>
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