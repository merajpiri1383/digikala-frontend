import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
    baseURL : "http://127.0.0.1:8000/",
});export default API;


API.interceptors.request.use((config) => {
    console.log("pre request");
    if(Cookies.get("access_token")){
        config.headers.Authorization = `Bearer ${Cookies.get("access_token")}`
    }
    return config
});

const setToken = (access_token,refresh_token=null) => {
    Cookies.set("access_token",access_token,{expires:7,secure:true,sameSite:true});
    API.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    refresh_token && Cookies.set("refresh_token",refresh_token,{expires:7,secure:true,sameSite:true});
};export {setToken};