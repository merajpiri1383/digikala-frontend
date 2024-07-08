// styles 
import "../public/global.css";
import "../src/modal/modal.css";
import { lazy } from "react";
import StoreProvider from "./storeProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Navbar = lazy(() => import("./components/navbar"));


// config 
const metadata = {
    title: "Digikala"
}; export { metadata }; 

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <StoreProvider>
                    <Navbar />
                    {children}
                </StoreProvider>
                <ToastContainer draggable={true} />
            </body>
        </html>
    )
}; export default RootLayout;