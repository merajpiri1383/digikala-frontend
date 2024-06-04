// styles 
import "../styles/global.css";
import 'reactjs-popup/dist/index.css';
import "../lib/modal/modal.css";

import {lazy } from "react";
const Navbar = lazy(() => import("./components/navbar"));
import StoreProvider from "./storeProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



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