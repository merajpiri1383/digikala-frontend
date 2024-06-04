import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "user",
    initialState : {
        email : null,
        created : null ,
        is_login : false,
        is_staff : false,
        is_manager : false ,
    },
    reducers : {
        changeUser : (state,action) => {
            state.email = action.payload.email
            state.created = action.payload.created
            state.is_login = action.payload.is_login
            state.is_staff = action.payload.is_staff 
            state.is_manager = action.payload.is_manager
        }
    }
});export const {changeUser} = userSlice.actions;export default userSlice.reducer;