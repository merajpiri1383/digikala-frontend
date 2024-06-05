import axios from "axios";
import Cookies from "js-cookie";
import { changeUser } from "../lib/reducers/user";
import Store from "../lib/store";

const API = axios.create({
    baseURL : "http://127.0.0.1:8000/",
});export default API;


API.interceptors.request.use((config) => {
    if(Cookies.get("access_token")){
        config.headers.Authorization = `Bearer ${Cookies.get("access_token")}`;
        // !Store.getState().user.email && getUser()
    }
    return config;
});

const setToken = (access_token,refresh_token=null) => {
    Cookies.set("access_token",access_token,{expires:7,secure:true,sameSite:true});
    API.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    refresh_token && Cookies.set("refresh_token",refresh_token,{expires:7,secure:true,sameSite:true});
};export {setToken};

const handle401Error = async (router) => {

    if(Cookies.get('refresh_token')){

        await API.post("/account/token/refresh/",{refresh : Cookies.get("refresh_token")}).then((response) =>{
            setToken(response.data.access);
            return router.push("/")
        }).catch((error)=>{
            clearToken();
            Store.dispatch(changeUser({is_login : false}));
            return router.push("/auth/");
        })
    }
};export {handle401Error};

const clearToken = () => {
    Cookies.remove("access_token");
    API.defaults.headers.common.Authorization = null;
};export {clearToken};

const getUser = async (router=null) => {

    await API.get("/user/").then((response) => {
        Store.dispatch(changeUser({
            email : response.data.email,
            is_staff : response.data.is_staff ,
            is_manager : response.data.is_manager , 
            is_login : true 
        }))
    }).catch((error) => {
        try{
            if(error.response.status === 401 ){
                router && handle401Error(router);
            }else{
                router && router.push('/auth/login/');
            }
        }catch{
            router && router.push("/auth/login/");
        }
    })
};export {getUser};