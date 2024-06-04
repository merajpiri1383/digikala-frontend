"use client"
import { Zoom } from "react-awesome-reveal";
import AddCategory from "./components/addCategory";

const Category = () => {
    return (
        <Zoom duration={300}>
            <div className="grid grid-cols-1 gap-4">
                <AddCategory />
            </div>
        </Zoom>
    )
}; export default Category;