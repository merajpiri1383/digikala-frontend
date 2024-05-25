import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "user",
    initialState : {
        email : null,
        created : null ,
    },
    reducers : {
        changeUser : (state,action) => {
            state.email = action.payload.email
            state.created = action.payload.created
        }
    }
});export const {changeUser} = userSlice.actions;export default userSlice.reducer;