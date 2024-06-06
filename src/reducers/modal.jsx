import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name : "modal",
    initialState : {
        exit : false,
    },
    reducers : {
        toggleExit : (state) => {
            state.exit = !state.exit
        } 
    }
});export const {toggleExit} = modalSlice.actions;export default modalSlice.reducer;