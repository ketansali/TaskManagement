import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../helpers/axios'


export const getAllCity = createAsyncThunk(
    "getAllCity",
    async (body,{rejectWithValue})=>{
        try{
            const res = await axios.get(`/city/get?search=${body.search}&page=${body.page}&limit=${body.limit}`)
            return res.data
        }catch(error){
            if(!error.response){
                throw error
            }
            return rejectWithValue(error.response);
        }
    }
)
export const addCity = createAsyncThunk(
    "addCity",
    async (body,{rejectWithValue})=>{
        
        try{
            const res = await axios.post(`/city/add`,body)
            return res.data
        }catch(error){
            if(!error.response){
                throw error
            }
            return rejectWithValue(error.response);
        }
    }
)
export const deleteCity = createAsyncThunk(
    "deleteCity",
    async (id,{rejectWithValue})=>{
        try{
            const res = await axios.delete(`/city/delete?id=${id}`)
            return res.data
        }catch(error){
            if(!error.response){
                throw error
            }
            return rejectWithValue(error.response);
        }
    }
)
export const updateCity = createAsyncThunk(
    "updateCity",
    async (body,{rejectWithValue})=>{
        try{
            const res = await axios.post(`/city/update`,body)
            return res.data
        }catch(error){
            if(!error.response){
                throw error
            }
            return rejectWithValue(error.response);
        }
    }
)
export const getStateBindCountryId = createAsyncThunk(
    "getStateBindCountryId",
    async(body,{rejectWithValue})=>{
        try {
            const res = await axios.get(`/state/get-state-by-CountryId?id=${body.id}`)
            return res.data 
        } catch (error) {
            if(!error.response){
                throw error
            }
            return rejectWithValue(error.response); 
        }
    }
)




