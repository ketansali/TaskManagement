import React from "react";
import jwt from "jwt-decode";
import SuperAdmin from "./SuperAdmin";
import Admin from "./Admin";
const MainSidebar = () => {
    //const {token} = useSelector(state=>state.Account)
    let token = localStorage.getItem('token')
    let user
    if(token) user = jwt(token)
 
  return (
    <div>
 
      {user?.userData?.isSuperAdmin ? <SuperAdmin /> : null}
      {user?.userData?.isAdmin ? <Admin /> : null}
    </div>
  );
};

export default MainSidebar;
