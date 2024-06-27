import { lazy } from "react";
const Brand = lazy(() => import("./components/brand"));

const Page = () => {
    return (
        <>
        <Brand />
        </>
    )
};export default Page ;