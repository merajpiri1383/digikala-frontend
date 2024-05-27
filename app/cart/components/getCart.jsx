"use client"
import Cookies from "js-cookie";

// API 
import API,{handle401Error} from "../../../lib/config/api";
// next tools 
import {useRouter} from "next/navigation";
// redux 
import { useDispatch } from "react-redux";


const GetCart = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    console.log(Cookies.get("is_login"));
    ( async ()=>{
        await API.get("/cart/").then((response)=>{
        }).catch((error) => {
           try{
            error.response.status === 401 && handle401Error(router,dispatch);
           }catch{}
        })
    })()

    return (
        <div>
            get cart 
        </div>
    )
};export default GetCart;