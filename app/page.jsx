import {lazy} from "react";
const Categories = lazy(() => import("./components/categories"));

const Page = () => {
    return (
        <div>
            <Categories />
        </div>
    )
};export default Page ;