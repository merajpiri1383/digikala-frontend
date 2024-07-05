import { lazy } from "react";
const AddProduct  = lazy(() => import("./components/addProducts"));

const Page = () => {
    return (
       <>
       <AddProduct />
       </>
    )
};export default Page;