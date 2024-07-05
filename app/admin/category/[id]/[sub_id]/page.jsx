import { lazy } from "react";
const Subcategory = lazy(() => import("./components/subcategory"));
const Products = lazy(() => import("./components/products"));


const Page = () => {
    return (
        <>
        <Subcategory />
        <Products />
        </>
    )
};export default Page;