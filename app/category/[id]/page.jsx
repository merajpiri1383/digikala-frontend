import { lazy } from "react";
 
const Poster = lazy(() => import("./components/poster"));
const MostSell = lazy(() => import("./components/mostSeler"));

const Page = () => {
    return (
        <>
        <Poster />
        <MostSell />
        </>
    )
};export default Page;