import Loading from "../../components/loading";
import { Suspense } from "react";

const LoginLayout = ({children}) => {
    return (
        <Suspense fallback={<Loading />}>
            {children}
        </Suspense>
    )
};export default LoginLayout;