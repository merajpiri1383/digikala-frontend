import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "user",
    initialState : {
        email : null,
        created : null ,
        is_login : false,
    },
    reducers : {
        changeUser : (state,action) => {
            console.log("changeuser" + action.payload);
            state.email = action.payload.email
            state.created = action.payload.created
            state.is_login = action.payload.is_login
        }
    }
});export const {changeUser} = userSlice.actions;export default userSlice.reducer;