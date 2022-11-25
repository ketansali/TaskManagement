import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../actions";
import Toast from "../../components/Toaster";
const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [erremail, setErrEmail] = useState("");
  const [errpassword, setErrPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "") setErrEmail("is-invalid");
    if (password === "") setErrPassword("is-invalid");

    if (email !== "" && password !== "") {
      dispatch(login({ email, password })).then((result) => {
        if(result.payload.isSuccess){
          navigate("/superadminDashboard");
        }
      });
    } else {
      Toast({ msg: "All field required", type: "error" });
      return false;
    }
  };
  return (
    <div className="main-wrapper">
      <div className="account-content">
        <div className="container">
          {/* Account Logo */}
          <div className="account-logo">
            <a href="index.html">
              <img src="assets/img/logo2.png" alt="Dreamguy's Technologies" />
            </a>
          </div>
          {/* /Account Logo */}
          <div className="account-box">
            <div className="account-wrapper">
              <h3 className="account-title">Login</h3>
              <p className="account-subtitle">Access to our dashboard</p>
              {/* Account Form */}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    className={`form-control ${erremail}`}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyUp={(e) =>
                      setErrEmail(e.target.value != null ? "" : "is-invalid")
                    }
                    autoComplete={true}
                  />
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col">
                      <label>Password</label>
                    </div>
                    <div className="col-auto">
                      <a className="text-muted" href="forgot-password.html">
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <input
                    type="password"
                    className={`form-control ${errpassword}`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyUp={(e) =>
                      setErrPassword(e.target.value != null ? "" : "is-invalid")
                    }
                    autoComplete={true}
                  />
                </div>
                <div className="form-group text-center">
                  <button className="btn btn-primary account-btn" type="submit">
                    Login
                  </button>
                </div>
                <div className="account-footer">
                  <p>
                    Don't have an account yet?{" "}
                    <Link to="/register">Register</Link>
                  </p>
                </div>
              </form>
              {/* /Account Form */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
