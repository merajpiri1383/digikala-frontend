import { lazy } from "react";
const Subcategory = lazy(() => import("./components/subcategory"));
const Products = lazy(() => import("./components/products"));
const AddProducts = lazy(() => import("./components/addProducts"));


const Page = () => {
    return (
        <>
        <Subcategory />
        <AddProducts /> 
        <Products />
        </>
    )
};export default Page;