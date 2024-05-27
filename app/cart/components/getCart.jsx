"use client"

// API 
import API from "../../../lib/config/api";

const GetCart = () => {

    ( async ()=>{
        await API.get("/cart/").then((response)=>{
            console.log(response.data)
        }).catch((error) => {
            console.log(error.response.data)
        })
    })()

    return (
        <div>
            get cart 
        </div>
    )
};export default GetCart;