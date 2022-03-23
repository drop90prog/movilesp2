import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    email: "",
    avatar: "",
}

export const userSlice = createSlice ({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser:(state,action)=>{
            return{
                ...state,
                name: action.payload.name,
                email: action.payload.email,
                avatar: action.payload.avatar,
            }
        },
        logout: (state)=>{
            return{
                ...state,
                name: "",
                email: "",
                avatar: "",
            }
        }
    }
}); 

export const {setUser, logout} = userSlice.actions;
export default userSlice.reducer; 