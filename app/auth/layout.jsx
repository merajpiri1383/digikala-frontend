// loading 
import { Suspense } from "react";
import Loading from "./loading";


const AuthLayout = ( { children } ) => {
    return (
        <div>
            <Suspense fallback={<Loading />}>
                {children}
            </Suspense>
        </div>
    )
};export default AuthLayout ;