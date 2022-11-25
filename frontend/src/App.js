import "./App.css";
import { Routes, Route,useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Country from "./pages/Master/Country";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import State from "./pages/Master/State";
import City from "./pages/Master/City";
import Login from "./pages/account/Login";
import Register from "./pages/account/Register";
import SuperAdminDashboard from "./pages/dashboard/SuperAdminDashboard";
import MainSidebar from "./components/sidebar/MainSidebar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToken } from "./reducers/Account.reducer";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import jwt from "jwt-decode";
import loadjs from 'loadjs'
import SuperAdmin from "./components/sidebar/SuperAdmin";
// import '../public/assets/js/app'
function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()
 // const {token} = useSelector(state=>state.Account)
 loadjs('../public/assets/js/app') 
 const token = localStorage.getItem("token")
  let user
    if(token) user = jwt(token)
   
    
  useEffect(()=>{
    dispatch(addToken())
    
    // if(user?.userData?.isSuperAdmin === true && user?.userData?.isSuperAdmin !== undefined){
    //   navigate('/superadminDashboard')
    // }else if(user?.userData.isAdmin === true && user?.userData?.isAdmin !== undefined){
    //  navigate('/adminDashboard')
    // } else{
    //  navigate('/')
    // }
  },[token])
  return (
    <>
      {location.pathname !== "/" && location.pathname !== "/register" ? (
        <div>
          {" "}
          <Header />
          {/* <MainSidebar/> */}
          <SuperAdmin/>
        </div>
      ) : ""}
      <Routes>
        <Route path="/country" element={<Country />} />
        <Route path="/state" element={<State />} />
        <Route path="/city" element={<City />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/superadminDashboard" element={<SuperAdminDashboard />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
