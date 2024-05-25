// styles 
import "../lib/config/global.css";
// components 
import Navbar from "./components/navbar";
// redux 
import StoreProvider from "./storeProvider";


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
            </body>
        </html>
    )
}; export default RootLayout;