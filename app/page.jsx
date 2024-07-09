import {lazy} from "react";
const Categories = lazy(() => import("./components/categories"));
const Posters = lazy(() => import("./components/posters"));
const Brands =  lazy(() => import("./components/brands"));

const Page = () => {
    return (
        <>
        <Posters />
        <Categories />
        <Brands />
        </>
    )
};export default Page ;