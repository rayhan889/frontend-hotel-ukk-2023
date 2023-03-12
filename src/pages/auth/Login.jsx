import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

import { HiEye, HiEyeOff } from "react-icons/hi";
import LoginImage from "../../assets/img_login.png";
import logo from "../../assets/logo_2.svg";

const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth } = useAuth();

  const emailRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard/home";

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [showPwd, setShowPwd] = useState(false);

  useEffect(() => {
    emailRef?.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setEmail("");
      setPwd("");
      const accessToken = response?.data?.accessToken;
      const role = response?.data?.role;
      setAuth({ email, pwd, accessToken, role });
      navigate(from, { replace: true });
    } catch (error) {
      if (!error.response) {
        setErrMsg("No server response");
      } else if (error?.response?.status === 400) {
        setErrMsg("Missing email or password");
      } else if (error?.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login failed!");
      }
      errRef?.current?.focus();
    }
  };

  return (
    <section className="w-full h-screen bg-white flex">
      <div className="flex-1">
        <img
          src={LoginImage}
          alt="hotel_lobby"
          className="object-cover w-full h-full "
        />
      </div>
      <div className="flex-1">
        <div className="px-28 py-32 w-full h-full flex flex-col">
          {/* logo */}
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-lg bg-white shadow-md flex items-center justify-center mr-3">
              <img src={logo} alt="d'hotel_logo" />
            </div>
            <h4 className="text-primary font-bold text-sm tracking-wide">
              D'Hotel
            </h4>
          </div>

          {/* welcome */}
          <div className="flex flex-col mt-16">
            <h1 className="text-[24px] font-semibold text-primary-dark mb-2">
              Welcome back 👋
            </h1>
            <span className="text-slate-400 text-sm font-medium">
              Log in to go to dashboard admin panel !
            </span>
          </div>

          {/* form */}
          <div className="flex flex-col w-full mt-12">
            {errMsg !== "" && (
              <div
                className="w-full rounded-md px-3 py-2 bg-red-50 mb-4"
                ref={errRef}
              >
                <span className="text-red-600 text-sm">{errMsg}</span>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-7">
                <label
                  htmlFor="email"
                  className="font-medium text-sm text-primary-dark"
                >
                  Email Address
                </label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  ref={emailRef}
                  className="w-full mt-4 border rounded-md p-3 text-slate-400 focus:outline-none focus:border-[#6366F1]"
                  placeholder="Insert email address here"
                  autoComplete="off"
                />
              </div>
              <div className="mb-7">
                <label
                  htmlFor="password"
                  className="font-medium text-sm text-primary-dark"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPwd ? "text" : "password"}
                    id="password"
                    value={pwd}
                    onChange={e => setPwd(e.target.value)}
                    className="w-full mt-4 border rounded-md p-3 text-slate-400 focus:outline-none focus:border-[#6366F1]"
                    placeholder="Insert password here"
                    autoComplete="off"
                  />
                  {showPwd ? (
                    <HiEyeOff
                      className="absolute right-8 top-8 cursor-pointer text-slate-400"
                      onClick={() => setShowPwd(prev => !prev)}
                    />
                  ) : (
                    <HiEye
                      className="absolute right-8 top-8 cursor-pointer text-slate-400"
                      onClick={() => setShowPwd(prev => !prev)}
                    />
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="w-6 h-6 mr-3" />
                <span className="text-slate-400 text-sm tracking-wider">
                  Remember me ?
                </span>
              </div>
              <button className="w-full mt-12 flex rounded-md bg-primary items-center justify-center py-4 text-sm text-white font-bold tracking-wider hover:bg-[#4447EE]">
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
