"use client"
import { useState } from "react";

const Modal = ({trigger,children}) => {

    const [showModal,setShowModal] = useState(false);

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