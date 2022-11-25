import { configureStore } from "@reduxjs/toolkit";
import countryReducer from '../reducers/Country.reducer'
import stateReducer from '../reducers/State.reducer'
import CityReducer from '../reducers/City.reducer'
import AccountReducer from '../reducers/Account.reducer'


const store = configureStore({
    reducer:{
    Country : countryReducer,
    State : stateReducer,
    City : CityReducer,
    Account : AccountReducer,
    }
   
})
export default store







