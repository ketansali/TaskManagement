import {getAllCity,addCity,deleteCity,updateCity} from '../actions/index'
import {createSlice } from "@reduxjs/toolkit";
import Toast from '../components/Toaster';
const initialState = {
    loading: false,
    error: "",
  };
const stateReducer = createSlice({
    name : "City",
    initialState,
    extraReducers : {
        [getAllCity.pending]:(state,action)=>{
            state.loading = true
        },
        [getAllCity.fulfilled]:(state,action)=>{
            const {payload} = action
            state.data = payload
            state.loading = false
        },
        [getAllCity.rejected]:(state,action)=>{
            state.loading = false
        },
        [addCity.pending]:(state,action)=>{
            state.loading = true
        },
        [addCity.fulfilled]:(state,action)=>{
            const {payload} = action
            state.loading = false
            if(payload.isSuccess){
                Toast({msg:payload.message,type:'success'})
            }else{
                Toast({msg:payload.message,type:'error'})
            }
            
        },
        [addCity.rejected]:(state,action)=>{
            const {payload} = action
            Toast({msg:payload.message,type:'error'})
            state.loading = false
        },
        [deleteCity.pending]:(state,action)=>{
            state.loading = true
        },
        [deleteCity.fulfilled]:(state,action)=>{
            const {payload} = action
            state.loading = false
            if(payload.isSuccess){
                Toast({msg:payload.message,type:'success'})
            }else{
                Toast({msg:payload.message,type:'error'})
            }
        },
        [deleteCity.rejected]:(state,action)=>{
            state.loading = false
        },
        [updateCity.pending]:(state,action)=>{
            state.loading = true
        },
        [updateCity.fulfilled]:(state,action)=>{
            const {payload} = action
            state.loading = false
            if(payload.isSuccess){
                Toast({msg:payload.message,type:'success'})
            }else{
                Toast({msg:payload.message,type:'error'})
            }
        },
        [updateCity.rejected]:(state,action)=>{
            state.loading = false
        },
    }
})
export default stateReducer.reducer