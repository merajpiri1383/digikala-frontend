"use client"
// API 
import API,{handle401Error} from "../../../lib/config/api";
// next tools 
import {useRouter} from "next/navigation";



const GetCart = () => {
    const router = useRouter();
    // ( async ()=>{
    //     await API.get("/cart/").then((response)=>{
    //     }).catch((error) => {
    //        try{
    //         error.response.status === 401 && handle401Error(router);
    //        }catch{
    //         handle401Error(router);
    //        }
    //     })
    // })();
    return (
        <div>
            get cart 
        </div>
    )
};export default GetCart;