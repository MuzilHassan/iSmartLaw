import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.js";
import image from "../asset/images/logo.jpg";
import LoginPic from "../asset/images/login.jpg";
import "./Login.css";
import "material-symbols";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/judge/login", credentials);
      if (res.data) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        alert("Login Successfully");
        navigate("/");
      } else {
        alert("You are not an Admin");
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch (err) {
      alert("Internal Server Error");
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
  return (
    <>
      <section class="vh-100">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-6 text-black">
              <div
                class="avatar"
                style={{
                  marginTop: "42px",
                  marginLeft: "12rem",
                  marginBottom: "6rem",
                }}
              >
                <img alt="avatar" src={image} />
              </div>

              <div class="d-flex align-items-center px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5 ">
                <form style={{ width: "23rem" }} onSubmit={handleClick}>
                  <h3
                    class="fw-normal mb-3 pb-3"
                    style={{ letterSpacing: "1px" }}
                  >
                    Log in
                  </h3>

                  <div class="form-outline mb-4">
                    <input
                      type="email"
                      id="email"
                      onChange={handleChange}
                      class="form-control form-control-lg"
                    />
                    <label class="form-label" htmlFor="form2Example18">
                      Email address
                    </label>
                  </div>

                  <div class="form-outline mb-4">
                    <input
                      type="password"
                      id="password"
                      onChange={handleChange}
                      class="form-control form-control-lg"
                    />
                    <label class="form-label" htmlFor="form2Example28">
                      Password
                    </label>
                  </div>

                  <div class="pt-1 mb-4">
                    <button class="btn btn-info btn-lg btn-block" type="submit">
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div class="col-sm-6 px-0 d-none d-sm-block">
              <img
                //src="https://images.unsplash.com/photo-1637250037209-70d093732f44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
                src={LoginPic}
                alt=""
                class="w-100 vh-100"
                style={{ objectFit: "cover", objectPosition: "left" }}
              />
            </div>
          </div>
        </div>
      </section>
      {/* <div className="login-body">
    </>
      <div class="login">
        <div class="avatar">
          <img alt="avatar" src={image} />
        </div>
        <h2>Login</h2>
        <h3>Welcome back</h3>

        <form class="login-form">
          <div class="textbox">
            <input
              type="email"
              placeholder="Email"
              id="email"
              onChange={handleChange}
            />
            <span class="material-symbols-outlined"> account_circle </span>
          </div>
          <div class="textbox">
            <input
              type="password"
              placeholder="Password"
              id="password"
              onChange={handleChange}
            />
            <span class="material-symbols-outlined"> lock </span>
          </div>
          <button type="submit" onClick={handleClick}>
            LOGIN
          </button>
        </form>
      </div>
    </div> */}
    </>
  );
}
