import {lazy} from "react";
// components 
const Info = lazy(() => import("./components/info"));

const Page = () => {
    return (
        <div>
            <Info />
        </div>
    )
};export default Page;