import { useState } from "react";
import "./tooltip.css";


const Tooltip = ({children,text}) => {

    const [show,setShow] = useState(false);

    return (
        <div className="tooltip" 
        onMouseLeave={() => setShow(false)}
        onMouseEnter={() => setShow(true)}>
            <div className="tooltip-content">{children}</div>
            {
                show && <p className="tooltip-text">{text}</p>
            }
        </div>
    )
};export default Tooltip; 