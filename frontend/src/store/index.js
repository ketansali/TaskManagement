import { configureStore } from "@reduxjs/toolkit";
import countryReducer from '../reducers/Country.reducer'

const store = configureStore({
    reducer:{
    country : countryReducer
    }
   
})
export default store


