import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    manga: "",

}

export const mangaSlice = createSlice ({
    name: 'manga',
    initialState: initialState,
    reducers: {
        setManga:(state,action)=>{
            return{
                ...state,
                name: action.payload.name,
            }
        },
        back: (state)=>{
            return{
                ...state,
                name: "",
            }
        }
    }
    
}); 

export const {setManga, back} = mangaSlice.actions;
export default mangaSlice.reducer; 