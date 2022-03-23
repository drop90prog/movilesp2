import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: "",
    profilePicture: "",
}

export const userSlice = createSlice ({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser:(state,action)=>{
            return{
                ...state,
                username: action.payload.username,
                profilePicture: action.payload.profilePicture,
            }
        },
        logout: (state)=>{
            return{
                ...state,
                username: "",
                profilePicture: "",
            }
        }
    }
}); 

export const {setUser, logout} = userSlice.actions;
export default userSlice.reducer; 