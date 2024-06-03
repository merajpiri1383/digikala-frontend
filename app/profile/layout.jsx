import { Suspense , lazy} from "react";
import Loading from "../components/loading";
const RightPannel = lazy(() => import("./components/rightPannel"));

const ProfileLayout = ({ children }) => {
    return (
        <>
            <Suspense fallback={<Loading />}>
                <div className="grid grid-cols-10 p-12 gap-6">
                    <div className="col-span-7 border border-stone-200 rounded-lg p-3">
                        {children}
                    </div>
                    <div className="col-span-3 bg-white border border-stone-200 rounded-lg">
                        <RightPannel />
                    </div>
                </div>
            </Suspense>
        </>
    )
}; export default ProfileLayout;