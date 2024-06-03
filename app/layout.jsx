// styles 
import "../styles/global.css";
import 'reactjs-popup/dist/index.css';
// components 
import Navbar from "./components/navbar";
// redux 
import StoreProvider from "./storeProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Modal 
import "../lib/modal/modal.css";


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