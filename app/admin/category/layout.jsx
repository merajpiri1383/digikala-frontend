import Loading from "../../components/loading";
import { Suspense } from "react";

const Layout = ({ children }) => {
    return (
        <Suspense fallback={<Loading />}>
            {children}
        </Suspense>
    )
}; export default Layout;