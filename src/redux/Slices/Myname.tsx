import { createSlice } from "@reduxjs/toolkit";

export const mynameSlice = createSlice({
    name: 'myname',
    initialState: {
        meranaam: 'mohit',
        age: 45,
    },
    reducers: {
        setName: (state, action) => {
            state.meranaam = action.payload;
        },
        setNumber:(state,action)=>{
            state.age=action.payload
        }
    }
});

export const { setName ,setNumber} = mynameSlice.actions;