import {createSlice} from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name : "category",
    initialState : {
        toggle : true,
        sub_category_toggle : true,
    },
    reducers : {
        changeToggle  : (state) => {
            state.toggle = !state.toggle
        },
        subCategoryToggle : (state) => {
            state.sub_category_toggle = !state.sub_category_toggle
        }
    }
});export const {changeToggle,subCategoryToggle} = categorySlice.actions ;
 export default categorySlice.reducer;