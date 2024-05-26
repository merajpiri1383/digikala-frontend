"use client"
import { ThreeDots } from "react-loader-spinner";

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-96">
            <ThreeDots
                color="gray"
                width={"50"}
            />
        </div>
    )
}; export default Loading;