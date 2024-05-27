import axios from "axios";
import Cookies from "js-cookie";
import { changeUser } from "../reducers/user";

const API = axios.create({
    baseURL : "http://127.0.0.1:8000/",
});export default API;


API.interceptors.request.use((config) => {
    if(Cookies.get("access_token")){
        config.headers.Authorization = `Bearer ${Cookies.get("access_token")}`;
    }
    return config;
});

const setToken = (access_token,refresh_token=null) => {
    Cookies.set("access_token",access_token,{expires:7,secure:true,sameSite:true});
    API.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    refresh_token && Cookies.set("refresh_token",refresh_token,{expires:7,secure:true,sameSite:true});
};export {setToken};

const handle401Error = async (router,dispatch) => {
    if(Cookies.get('refresh_token')){
        await API.post("/account/token/refresh/",{refresh : Cookies.get("refresh_token")}).then((response) => {
            setToken(response.data.access);
        }).catch((error)=>{
            clearToken();
            dispatch(changeUser({is_login : false}));
            return router.push("/auth/");
        })
    }return router.push("/auth/");
};export {handle401Error};

const clearToken = () => {
    Cookies.remove("access_token");
};export {clearToken};