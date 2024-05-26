import Loading from "../../components/loading";
import {Suspense} from "react";

const LoginWithOtpLayout = ({children}) => {
    return (
        <Suspense fallback={<Loading />}>
            {children}
        </Suspense>
    )
};export default LoginWithOtpLayout;