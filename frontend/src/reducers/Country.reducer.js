import {getAllCountry,addCountry,deleteCountry,updateCountry} from '../actions/index'
import {createSlice } from "@reduxjs/toolkit";
import Toast from '../components/Toaster';
const initialState = {
    loading: false,
    error: "",
  };
const countryReducer = createSlice({
    name : "Country",
    initialState,
    extraReducers : {
        [getAllCountry.pending]:(state,action)=>{
            state.loading = true
        },
        [getAllCountry.fulfilled]:(state,action)=>{
            const {payload} = action
            state.data = payload
            state.loading = false
        },
        [getAllCountry.rejected]:(state,action)=>{
            state.loading = false
        },
        [addCountry.pending]:(state,action)=>{
            state.loading = true
        },
        [addCountry.fulfilled]:(state,action)=>{
            const {payload} = action
            state.loading = false
            if(payload.isSuccess){
                Toast({msg:payload.message,type:'success'})
            }else{
                Toast({msg:payload.message,type:'error'})
            }
            
        },
        [addCountry.rejected]:(state,action)=>{
            const {payload} = action
            Toast({msg:payload.message,type:'error'})
            state.loading = false
        },
        [deleteCountry.pending]:(state,action)=>{
            state.loading = true
        },
        [deleteCountry.fulfilled]:(state,action)=>{
            const {payload} = action
            state.loading = false
            if(payload.isSuccess){
                Toast({msg:payload.message,type:'success'})
            }else{
                Toast({msg:payload.message,type:'error'})
            }
        },
        [deleteCountry.rejected]:(state,action)=>{
            state.loading = false
        },
        [updateCountry.pending]:(state,action)=>{
            state.loading = true
        },
        [updateCountry.fulfilled]:(state,action)=>{
            const {payload} = action
            state.loading = false
            if(payload.isSuccess){
                Toast({msg:payload.message,type:'success'})
            }else{
                Toast({msg:payload.message,type:'error'})
            }
        },
        [updateCountry.rejected]:(state,action)=>{
            state.loading = false
        },
    }
})
export default countryReducer.reducer