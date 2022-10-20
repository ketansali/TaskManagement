import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../helpers/axios'


export const getAllCountry = createAsyncThunk(
    "getAllCountry",
    async (body,{rejectWithValue})=>{
        try{
            const res = await axios.get(`/country/get?search=${body.search}&page=${body.page}&limit=${body.limit}`)
            return res.data
        }catch(error){
            if(!error.response){
                throw error
            }
            return rejectWithValue(error.response);
        }
    }
)
export const addCountry = createAsyncThunk(
    "addCountry",
    async (body,{rejectWithValue})=>{
        try{
            const res = await axios.post(`/country/add`,body)
            return res.data
        }catch(error){
            if(!error.response){
                throw error
            }
            return rejectWithValue(error.response);
        }
    }
)
export const deleteCountry = createAsyncThunk(
    "deleteCountry",
    async (id,{rejectWithValue})=>{
        try{
            const res = await axios.delete(`/country/delete?id=${id}`)
            return res.data
        }catch(error){
            if(!error.response){
                throw error
            }
            return rejectWithValue(error.response);
        }
    }
)
export const updateCountry = createAsyncThunk(
    "updateCountry",
    async (body,{rejectWithValue})=>{
        try{
            const res = await axios.post(`/country/update`,body)
            return res.data
        }catch(error){
            if(!error.response){
                throw error
            }
            return rejectWithValue(error.response);
        }
    }
)





