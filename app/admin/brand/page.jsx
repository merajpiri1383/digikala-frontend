import { lazy } from "react";
const AddBrand = lazy(() => import("./components/addBrand"));

const Page = () => {
    return (
        <div>
            <AddBrand />
        </div>
    )
};export default Page;