import { lazy } from "react";
const Product = lazy(() => import("./components/product"));

const Page = () => {
    return (
        <>
        <Product />
        </>
    )
}; export default Page;