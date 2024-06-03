import {lazy} from "react";
// components 
const GetCart = lazy(() => import("./components/getCart"));
const Page = () => {
    return (
        <div>
            cart
            <GetCart />
        </div>
    )
};export default Page;