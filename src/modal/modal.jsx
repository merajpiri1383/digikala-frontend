"use client"
import { useState ,useEffect } from "react";
import { useSelector } from "react-redux";

const Modal = ({trigger,children}) => {
    const [showModal,setShowModal] = useState(false);
    
    const toggle = useSelector((state) => state.modal.exit);

    useEffect(() => {
        setShowModal(false);
    },[toggle])

    return (
        <div>
            <div onClick={() => setShowModal(!showModal)} >{trigger}</div>
            <div className={`modal ${showModal ? "modal-show" : "modal-hide"}`}>
                <div className="modal-content">
                    {children}
                </div>
            </div>
            <div className={ showModal ? "modal-black" : ""} onClick={() => setShowModal(false)}></div>
        </div>
    )
};export default Modal;