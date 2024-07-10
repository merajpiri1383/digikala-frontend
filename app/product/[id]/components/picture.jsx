"use client"
import { Zoom } from "react-awesome-reveal";
import { LuHeart } from "react-icons/lu";
import { IoMdShare } from "react-icons/io";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { FaChartLine } from "react-icons/fa6";
import { MdCompare } from "react-icons/md";
import { IoIosList } from "react-icons/io";
import Tooltip from "../../../../src/tooltip/tooltip";


const Bar = () => {
    return (
        <div className="grid grid-cols-1 p-3  h-2/3 mt-6">
            <Tooltip text={"افزودن به علاقه مندی "}>
                <LuHeart className="col-span-1" size={"1.5rem"} color="gray" />
            </Tooltip>

            <Tooltip text={"به اشتراک گذاری کالا"}>
                <IoMdShare className="col-span-1" size={"1.5rem"} color="gray" />
            </Tooltip>

            <Tooltip text={"اطلاع رسانی شگفت انگیز"}>
                <MdOutlineNotificationsActive className="col-span-1" size={"1.5rem"} color="gray" />
            </Tooltip>

            <Tooltip text={"نمودار قیمت"}>
                <FaChartLine className="col-span-1" size={"1.5rem"} color="gray" />
            </Tooltip>

            <Tooltip text={"مقایسه کالا"}>
                <MdCompare className="col-span-1" size={"1.5rem"} color="gray" />
            </Tooltip>

            <Tooltip text={"افزودن به لیست"}>
                <IoIosList className="col-span-1" size={"1.5rem"} color="gray" />
            </Tooltip>
        </div>
    )
};


const Picture = ({ product }) => {
    return (
        <Zoom duration={300}>
            {
                product && <div className="p-3">
                    <div className="grid grid-cols-12 ">
                        <img
                            src={product.picture}
                            alt={product.name}
                            className="h-6/6 rounded-lg col-span-11 object-cover"
                        />
                        <Bar className="col-span-1" />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {
                            product.images[0] && product.images.map((image, index) => {
                                console.log(image);
                                return (
                                    <Zoom duration={400} key={index} className="col-span-1">
                                        <div className="border p-2 rounded-lg">
                                            <img
                                                src={image.picture}
                                                className="h-24 object-cover rounded-lg"
                                            />
                                        </div>
                                    </Zoom>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </Zoom>
    )
}; export default Picture;