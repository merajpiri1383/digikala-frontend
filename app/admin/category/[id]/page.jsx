import { lazy } from "react";
const Category = lazy(() => import("./components/category"));
const AddSubCategory = lazy(() => import("./components/addSubCategory"));
const Subcategories = lazy(() => import("./components/subCategories"));

const Page = () => {
    return (
        <>
            <Category />
            <AddSubCategory />
            <Subcategories />
        </>
    )
}; export default Page;