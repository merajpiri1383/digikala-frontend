'use client'
// redux tools 
import {Provider} from "react-redux";
import Store from "../lib/store";
// react tools 
import { useRef } from "react";

const StoreProvider = ({ children }) => {
    const storeRef = useRef();
    if (! storeRef.current){
        storeRef.current = Store;
    };
    return (
        <Provider store={storeRef.current}>{children}</Provider>
    )
};export default StoreProvider ;