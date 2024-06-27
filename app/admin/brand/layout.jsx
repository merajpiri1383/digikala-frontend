import { Suspense } from "react";
import Loading from "../../components/loading";
import Permission from "../components/permission";

const BrandLayout = ({children}) => {
    return (
        <>
        <Suspense fallback={<Loading />}>
        <Permission>
            {children}
        </Permission>
        </Suspense>
        </>
    )
};export default BrandLayout;