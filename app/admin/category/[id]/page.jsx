import { lazy } from "react";
const Category = lazy(() => import("./components/category"));

const Page = () => {
    return (
        <div>
            <Category />
        </div>
    )
};export default Page ;