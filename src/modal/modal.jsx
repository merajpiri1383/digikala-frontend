"use client"
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";


const Modal = ({ trigger, children }) => {

    const [showModal, setShowModal] = useState(false);
    const toggle = useSelector((state) => state.modal.toggle);
    const clickHander = () => {
        setShowModal(!showModal);
    };
    const closeHandeler = () => {
        setShowModal(false);
    }; 

    useEffect(() => { 
        setShowModal(false);
    },[toggle]);

    return ( 
        <>
            <div className="modal-trigger" onClick={() => clickHander()}>{trigger}</div>
            <div className={`modal ${showModal ? "modal-show" : "modal-hide"}`} >
                <div className="modal-content">{children}</div>
            </div>
            <div className={showModal ? "modal-close" : ""} onClick={() => closeHandeler()}></div>
        </>
    )
}; export default Modal;