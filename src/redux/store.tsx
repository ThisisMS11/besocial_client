import { configureStore } from "@reduxjs/toolkit";
import { mynameSlice } from "./Slices/Myname";

const store = configureStore({
    reducer: {
        myname: mynameSlice.reducer,
    }
})

export default store;