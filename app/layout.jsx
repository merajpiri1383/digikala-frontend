// styles 
import "../styles/global.css";
// components 
import Navbar from "./components/navbar";
// redux 
import StoreProvider from "./storeProvider";
import { toast ,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 


// config 
const metadata = {
    title: "Digikala"
}; export { metadata };

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <Navbar />
                <StoreProvider children={children} />
                <ToastContainer draggable={true} />
            </body>
        </html>
    )
}; export default RootLayout;