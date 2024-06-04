"use client"
import { Zoom } from "react-awesome-reveal";
import { lazy } from "react";
const Categories = lazy(() => import("./components/categories"));
const AddCategory = lazy(() => import("./components/addCategory"));

const Category = () => {
    return (
        <Zoom duration={300}>
            <div className="grid grid-cols-1 gap-4">
                <AddCategory />
                <Categories />
            </div>
        </Zoom>
    )
}; export default Category;