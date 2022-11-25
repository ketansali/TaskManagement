import {getAllState,addState,deleteState,updateState} from '../actions/index'
import {createSlice } from "@reduxjs/toolkit";
import Toast from '../components/Toaster';
const initialState = {
    loading: false,
    error: "",
  };
const stateReducer = createSlice({
    name : "State",
    initialState,
    extraReducers : {
        [getAllState.pending]:(state,action)=>{
            state.loading = true
        },
        [getAllState.fulfilled]:(state,action)=>{
            const {payload} = action
            state.data = payload
            state.loading = false
        },
        [getAllState.rejected]:(state,action)=>{
            state.loading = false
        },
        [addState.pending]:(state,action)=>{
            state.loading = true
        },
        [addState.fulfilled]:(state,action)=>{
            const {payload} = action
            state.loading = false
            if(payload.isSuccess){
                Toast({msg:payload.message,type:'success'})
            }else{
                Toast({msg:payload.message,type:'error'})
            }
            
        },
        [addState.rejected]:(state,action)=>{
            const {payload} = action
            Toast({msg:payload.message,type:'error'})
            state.loading = false
        },
        [deleteState.pending]:(state,action)=>{
            state.loading = true
        },
        [deleteState.fulfilled]:(state,action)=>{
            const {payload} = action
            state.loading = false
            if(payload.isSuccess){
                Toast({msg:payload.message,type:'success'})
            }else{
                Toast({msg:payload.message,type:'error'})
            }
        },
        [deleteState.rejected]:(state,action)=>{
            state.loading = false
        },
        [updateState.pending]:(state,action)=>{
            state.loading = true
        },
        [updateState.fulfilled]:(state,action)=>{
            const {payload} = action
            state.loading = false
            if(payload.isSuccess){
                Toast({msg:payload.message,type:'success'})
            }else{
                Toast({msg:payload.message,type:'error'})
            }
        },
        [updateState.rejected]:(state,action)=>{
            state.loading = false
        },
    }
})
export default stateReducer.reducer