"use client"

import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./reducers/user";
import categorySlice from "./reducers/category";
import modalSlice from "./reducers/modal";

const Store = configureStore({
    reducer : {
        user : userSlice , 
        category : categorySlice ,
        modal : modalSlice ,
    }
});export default Store;