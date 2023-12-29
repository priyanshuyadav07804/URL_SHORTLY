import { configureStore } from "@reduxjs/toolkit";
import clickReducer from './features/clicks/clickSlice'

export const store = configureStore({
    reducer:{
        click : clickReducer
    }
})