import { lazy } from "react";
const Category = lazy(() => import("./components/category"));
const AddSubCategory = lazy(() => import("./components/addSubCategory"));

const Page = () => {
    return (
        <div>
            <Category />
            <AddSubCategory />
        </div>
    )
};export default Page ;