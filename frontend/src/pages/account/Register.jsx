import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../actions";
import Toast from "../../components/Toaster";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [rPassword, setRPassword] = useState("");

  const [errlastName, setErrLastName] = useState("");
  const [erremail, setErrEmail] = useState("");
  const [errfirstName, setErrFirstName] = useState("");
  const [errimage, setErrImage] = useState("");
  const [errpassword, setErrPassword] = useState("");
  const [errrPassword, setErrRPassword] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName === "") setErrFirstName("is-invalid");
    if (lastName === "") setErrLastName("is-invalid");
    if (email === "") setErrEmail("is-invalid");
    if (password === "") setErrPassword("is-invalid");
    if (rPassword === "") setErrRPassword("is-invalid");
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      password !== "" &&
      rPassword !== ""
    ) {
      debugger
      dispatch(register({ firstName, lastName, email, password,image })).then(() => {
        navigate("/login");
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
          <div className="account-boxRegister">
            <div className="account-wrapper">
              <h3 className="account-title">Signup</h3>
              <p className="account-subtitle"></p>
              {/* Account Form */}
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>First Name</label>
                        <input
                          type="text"
                          className={`form-control ${errfirstName}`}
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          onKeyUp={(e) =>
                            setErrFirstName(
                              e.target.value != null ? "" : "is-invalid"
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Last Name</label>
                        <input
                          type="text"
                          className={`form-control ${errlastName}`}
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          onKeyUp={(e) =>
                            setErrLastName(
                              e.target.value != null ? "" : "is-invalid"
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          className={`form-control ${erremail}`}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onKeyUp={(e) =>
                            setErrEmail(
                              e.target.value != null ? "" : "is-invalid"
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Image</label>
                        <input
                          type="file"
                          className={`form-control ${errimage}`}
                         //value={image}
                          accept="image/*"
                          onChange={(e)=>setImage(e.target.files[0])}
                          onClick={(e) =>
                            setErrImage(
                              e.target.value != null ? "" : "is-invalid"
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Password</label>
                        <input
                          type="password"
                          className={`form-control ${errpassword}`}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onKeyUp={(e) =>
                            setErrPassword(
                              e.target.value != null ? "" : "is-invalid"
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Repeat Password</label>
                        <input
                          type="password"
                          className={`form-control ${errrPassword}`}
                          value={rPassword}
                          onChange={(e) => setRPassword(e.target.value)}
                          onKeyUp={(e) =>
                            setErrRPassword(
                              e.target.value != null ? "" : "is-invalid"
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group text-center">
                        <button
                          className="btn btn-primary account-btn"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="account-footer">
                        <p>
                          Already have an account?{" "}
                          <Link to="/login">Login</Link>
                        </p>
                      </div>
                    </div>
                  </div>
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

export default Register;
