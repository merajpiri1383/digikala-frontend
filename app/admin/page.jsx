import { lazy } from "react";
const Posters = lazy(() => import("./components/posters"));
const AddPoster = lazy(() => import("./components/addPoster"));

const Page = () => {
    return (
        <div className="border rounded-lg p-3">
            <AddPoster />
            <Posters />
        </div>
    )
};export default Page ;