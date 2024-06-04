import {createSlice} from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name : "category",
    initialState : {
        toggle : true,
    },
    reducers : {
        changeToggle  : (state) => {
            state.toggle = !state.toggle
        }
    }
});export const {changeToggle} = categorySlice.actions ; export default categorySlice.reducer;