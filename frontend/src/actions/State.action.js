import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../helpers/axios'


export const getAllState = createAsyncThunk(
    "getAllState",
    async (body,{rejectWithValue})=>{
        try{
            
            const res = await axios.get(`/state/get?search=${body.search}&page=${body.page}&limit=${body.limit}`)
            return res.data
        }catch(error){
            if(!error.response){
                throw error
            }
            return rejectWithValue(error.response);
        }
    }
)
export const addState = createAsyncThunk(
    "addState",
    async (body,{rejectWithValue})=>{
        
        try{
            const res = await axios.post(`/state/add`,body)
            return res.data
        }catch(error){
            if(!error.response){
                throw error
            }
            return rejectWithValue(error.response);
        }
    }
)
export const deleteState = createAsyncThunk(
    "deleteState",
    async (id,{rejectWithValue})=>{
        try{
            const res = await axios.delete(`/state/delete?id=${id}`)
            return res.data
        }catch(error){
            if(!error.response){
                throw error
            }
            return rejectWithValue(error.response);
        }
    }
)
export const updateState = createAsyncThunk(
    "updateState",
    async (body,{rejectWithValue})=>{
        try{
            const res = await axios.post(`/state/update`,body)
            return res.data
        }catch(error){
            if(!error.response){
                throw error
            }
            return rejectWithValue(error.response);
        }
    }
)





