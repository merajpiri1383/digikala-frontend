"use client"

import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./reducers/user";
import categorySlice from "./reducers/category";

const Store = configureStore({
    reducer : {
        user : userSlice , 
        category : categorySlice ,
    }
});export default Store;