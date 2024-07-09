import { lazy } from "react";
 
const Poster = lazy(() => import("./components/poster"));

const Page = () => {
    return (
        <div>
            <Poster />
        </div>
    )
};export default Page;