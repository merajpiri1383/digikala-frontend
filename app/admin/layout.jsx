import { Suspense } from "react";
import Loading from "../components/loading";
import RightPannel from "./components/rightPannel";


const AdminLayout = ({ children }) => {
    return (
        <Suspense fallback={<Loading />}>
            <div className="grid grid-cols-10 p-12 gap-6">
                <div className="col-span-7">
                    {children}
                </div>
                <div className="col-span-3">
                    <RightPannel />
                </div>
            </div>
        </Suspense>
    )
}; export default AdminLayout;