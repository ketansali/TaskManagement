import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../helpers/axios";



export const login = createAsyncThunk(
    "login",
    async (body,{rejectWithValue})=>{
        
        try{
            const res = await axios.post(`/account/login`,body)
            return res.data
        }catch(error){
            if(!error.response){
                throw error
            }
            return rejectWithValue(error.response);
        }
    }
)
export const register = createAsyncThunk(
    "register",
    async (body,{rejectWithValue})=>{
        console.log({body});
        debugger
        try{
            const res = await axios.post(`/account/register`,body)
            return res.data
        }catch(error){
            if(!error.response){
                throw error
            }
            return rejectWithValue(error.response);
        }
    }
)