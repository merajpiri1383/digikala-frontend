import { createSlice } from "@reduxjs/toolkit";;

const settingsSlice = createSlice({
    name : "settings",
    initialState : {
        toggle : false,
    },
    reducers : {
        toggleSettings : (state) => {
            state.toggle = !state.toggle
        }
    }
});export const {toggleSettings} = settingsSlice.actions;export default settingsSlice.reducer;