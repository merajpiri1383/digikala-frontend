import { Suspense } from "react";
import Loading from "../components/loading";
import RightPannel from "./components/rightPannel";
import Permission from "./components/permission";


const AdminLayout = ({ children }) => {
    return (
        <Suspense fallback={<Loading />}>
            <Permission>
                <div className="grid grid-cols-10 p-12 gap-6 relative">
                    <div className="col-span-7">
                        {children}
                    </div>
                    <div className="col-span-3">
                        <RightPannel />
                    </div>
                </div>
            </Permission>
        </Suspense>
    )
}; export default AdminLayout;