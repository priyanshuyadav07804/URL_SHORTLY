import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    longUrl : "",
    shortUrl : "",
    clickSearch : false
}

const clickSlice = createSlice({

    name:'click',
    initialState,
    reducers:{
        doClickSearch : (state)=>{
            state.clickSearch = true;
        },
        closeClickSearch : (state)=>{
            state.clickSearch = false
        },

        setLongUrl : (state,{payload})=>{
            state.longUrl = payload
        },
        clearLongUrl : (state)=>{
            state.longUrl = ""
        },
        setShortUrl : (state,{payload})=>{
            state.shortUrl = payload
        }
    }
})

export const {doClickSearch,closeClickSearch,setLongUrl,clearLongUrl,setShortUrl} = clickSlice.actions

export default clickSlice.reducer