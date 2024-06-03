import {lazy} from "react";
// components 
const LoginForm = lazy(() => import("./components/loginForm"));

const Page = () => {
    return (
        <div>
            <LoginForm />
        </div>
    )
};export default Page ;