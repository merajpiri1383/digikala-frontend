"use client"

import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./reducers/user";
import categorySlice from "./reducers/category";
import modalSlice from "./reducers/modal";
import brandSlice from "./reducers/brand";
import productSlice from "./reducers/product";
import settingsSlice from "./reducers/settings";

const Store = configureStore({
    reducer : {
        user : userSlice , 
        category : categorySlice ,
        modal : modalSlice ,
        brand : brandSlice ,
        product : productSlice ,
        settings : settingsSlice,
    }
});export default Store;