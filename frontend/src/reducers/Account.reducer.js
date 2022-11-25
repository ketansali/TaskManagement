import { login, register } from "../actions/index";
import { createSlice } from "@reduxjs/toolkit";
import Toast from "../components/Toaster";
const initialState = {
  loading: false,
  error: "",
};

const stateReducer = createSlice({
  name: "account",
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.token = localStorage.getItem("token");
    },
    removeToken: (state, action) => {
      state.token = "";
      localStorage.removeItem("token");
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      const { payload } = action;
      if (payload.isSuccess) {
        localStorage.setItem("token", payload.token);
       // state.data = payload;
        Toast({ msg: payload.message, type: "success" });
      } else {
        Toast({ msg: payload.message, type: "error" });
      }
      state.loading = false;
    },
    [login.rejected]: (state, action) => {
      const { payload } = action;
      Toast({ msg: payload.message, type: "error" });
      state.loading = false;
    },
    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      const { payload } = action;
      if (payload.isSuccess) {
        Toast({ msg: payload.message, type: "success" });
      } else {
        Toast({ msg: payload.message, type: "error" });
      }
      state.loading = false;
    },
    [register.rejected]: (state, action) => {
      const { payload } = action;
      Toast({ msg: payload.message, type: "error" });
      state.loading = false;
    },
  },
});
export const {addToken} = stateReducer.actions
export default stateReducer.reducer;
