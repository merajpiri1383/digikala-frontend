import { lazy } from "react";
const AddBrand = lazy(() => import("./components/addBrand"));
const Brands = lazy(() => import("./components/brands"));

const Page = () => {
    return (
        <div>
            <AddBrand />
            <Brands />
        </div>
    )
};export default Page;