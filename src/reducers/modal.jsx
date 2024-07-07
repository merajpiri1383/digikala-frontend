import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name : "modal",
    initialState : {
        show : false,
        toggle : false,
    },
    reducers : {
        changeShow : (state,action) => {
            state.show = action.payload
        },
        toggle : (state) => {
            state.toggle = !state.toggle
        }
    }
});export const {changeShow , toggle} = modalSlice.actions;export default modalSlice.reducer;   