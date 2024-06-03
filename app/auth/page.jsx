import { lazy } from "react";
// components 
const AuthForm = lazy(()=> import("./components/authForm"));

const Page = () => {
    return (
        <div>
            <AuthForm />
        </div>
    )
};export default Page ;