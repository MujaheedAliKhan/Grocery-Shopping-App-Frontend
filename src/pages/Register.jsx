import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../api/authApi";
import {getUserRole} from "../utils/getUserRole"
const API_URL = import.meta.env.VITE_API_URL;

const Register = ({ Loading }) => {
  const role = getUserRole();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      localStorage.clear();
      const data = await registerApi(name, email, password, role);
      console.log(data);
     
      toast.success("Register Successfull");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("User Already Exists");
    }
  };
  return (
    <>
      {Loading ? (
        <div className="min-h-screen flex justify-center items-center h-60">
          <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="flex flex-col border border-gray-300 shadow-lg px-12 py-10 rounded-lg justify-center items-center bg-white">
            <h2 className=" mb-8 text-black tracking-wider text-3xl font-bold">
              Register 🥕
            </h2>
            <input
              className="py-3 px-18 mb-2 border bg-white rounded-lg outline-none text-sm md:text-md w-full border-none shadow-md"
              type="name"
              name="name"
              value={name}
              placeholder="Enter name here"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className="py-3 px-18 w-full mb-2 border bg-white rounded-lg outline-none text-sm md:text-md border-none shadow-md"
              type="email"
              name="email"
              value={email}
              placeholder="Enter email here"
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              required
            />

            <input
              className="py-3 px-18 border mb-2  bg-white rounded-lg outline-none text-sm md:text-md w-full border-none shadow-md"
              type="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />

            <button
              onClick={handleRegister}
              className="px-4 py-3 w-full mt-6 border-none outline-none font-bold bg-amber-600 text-white rounded-full shadow-lg hover:bg-amber-400 hover:text-white transition duration-200"
            >
              Submit
            </button>

            <p className="mt-4 text-center text-gray-400 text-sm md:text-md">
              Already have an Account?
              <a
                className="text-amber-600 hover:underline ml-1 text-sm md:text-md"
                href="/login"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
