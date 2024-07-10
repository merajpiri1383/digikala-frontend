import {lazy} from "react";
const Categories = lazy(() => import("./components/categories"));
const Posters = lazy(() => import("./components/posters"));
const Brands =  lazy(() => import("./components/brands"));
const MostSell = lazy(() => import("./components/mostSell"));

const Page = () => {
    return (
        <>
        <Posters />
        <Categories />
        <Brands />
        <MostSell />
        </>
    )
};export default Page ;