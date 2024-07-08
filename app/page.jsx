import {lazy} from "react";
const Categories = lazy(() => import("./components/categories"));
const Posters = lazy(() => import("./components/posters"));

const Page = () => {
    return (
        <>
        <Posters />
        <Categories />
        </>
    )
};export default Page ;