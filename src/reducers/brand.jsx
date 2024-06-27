import { createSlice } from "@reduxjs/toolkit";

const brandSlice = createSlice({
    name : "brand",
    initialState : {
        toggle : true,
    },
    reducers : {
        toggleBrand  : (state) => {
            state.toggle = !state.toggle
        } 
    }
});export const {toggleBrand} = brandSlice.actions;export default brandSlice.reducer;