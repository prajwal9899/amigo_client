import "../styles/Login.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    registartionNo: "",
  });

  const { email, password, registartionNo } = user;

  const submitForm = (e) => {
    e.preventDefault();
    const newUserdetails = {
      email: user.email,
      password: user.password,
      registartionNo: user.registartionNo,
    };
    const res = axios
      .post(`${process.env.REACT_APP_URL}/login`, newUserdetails)
      .then((res) => {
        if (res.data.status === "failed") {
          toast.error(`${res.data.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
        if (res.data.status === "Success") {
          setUser({
            email: "",
            password: "",
            registartionNo: "",
          });
          localStorage.setItem("token", res.data.token);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <>
      <div className="login_container">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <div className="form_container">
          <div className="title">
            <h1>Hello again</h1>
            <span>Welcome back you have been missed</span>
          </div>
          <div className="form">
            <form action="" onSubmit={submitForm}>
              <input
                placeholder="Email"
                type="email"
                name="email"
                value={email}
                onChange={(event) => handleInput(event)}
              />
              <input
                placeholder="Password"
                type="password"
                name="password"
                value={password}
                onChange={(event) => handleInput(event)}
              />
              <input
                placeholder="Registration No"
                type="number"
                name="registartionNo"
                value={registartionNo}
                onChange={(event) => handleInput(event)}
              />
              <input type="submit" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
