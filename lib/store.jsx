"use client"

import {configureStore} from "@reduxjs/toolkit";
// reducers 
import userSlice from "./reducers/user";

const Store = configureStore({
    reducer : {
        user : userSlice
    }
});export default Store;