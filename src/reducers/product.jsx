import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name : "product",
    initialState : {
        toggle : true,
    },
    reducers : {
        productToggle : (state) => {
            state.toggle = !state.toggle
        }
    }
});export const {productToggle} = productSlice.actions;export default productSlice.reducer;