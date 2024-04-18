import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../../Api/buyer";
import GoogleAuthSignUp from "../../../Components/Buyer/GoogleAuthSignUp";

const Signup = () => {
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (name.trim().length < 4) {
        toast.error("Name should have more than 3 letters !!!");
        return;
      } else if (!emailRegex.test(email)) {
        toast.error("Please enter valid email!!!");
        return;
      } else if (password.trim().length < 6) {
        toast.error("Please enter valid password !!!");
        return;
      } else if (password !== cpassword) {
        toast.error("Passwords doesnt match !!!");
        return;
      }
      console.log('hi')
      console.log(name,email,password)
      const res = await signup(name, email, password);
      console.log('no',res)
      if (res?.data.success) {
        navigate("/otp");
      }else if(!res?.data.success){
        toast.error(res?.data.message)
        navigate('/login')
      }
    } catch (error) {
     console.log(error);
    } finally {
      setError(null);
    }
  };
  return (
    // <!-- component -->
    // <!-- Container -->
    <div className="flex flex-wrap min-h-screen w-full content-center justify-center bg-gray-200 py-10">
      {/* <!-- Login component --> */}
      <div className="flex shadow-md">
        {/* <!-- Login form --> */}
        <div
          className="flex flex-wrap content-center justify-center rounded-l-md bg-white"
          style={{ width: "24rem", height: "32rem" }}
        >
          <div className="w-72">
            {/* <!-- Heading --> */}
            <h1 className="text-xl font-semibold">Sign up</h1>
            <small className="text-gray-400">Please enter your details</small>

            {/* <!-- Form --> */}
            <form className="mt-4" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="mb-2 block text-xs font-semibold">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="block w-full rounded-md border border-gray-300 focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700 py-1 px-1.5 text-gray-900"
                />
              </div>
              <div className="mb-3">
                <label className="mb-2 block text-xs font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="block w-full rounded-md border border-gray-300 focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700 py-1 px-1.5 text-gray-900"
                />
              </div>
              <div className="mb-3">
                <label className="mb-2 block text-xs font-semibold">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="*****"
                  className="block w-full rounded-md border border-gray-300 focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700 py-1 px-1.5 text-gray-900"
                />
              </div>
              <div className="mb-3">
                <label className="mb-2 block text-xs font-semibold">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={cpassword}
                  onChange={(e) => setCpassword(e.target.value)}
                  placeholder="*****"
                  className="block w-full rounded-md border border-gray-300 focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700 py-1 px-1.5 text-gray-900"
                />
              </div>
              <div>
                <p style={{ color: "red" }}>{error}</p>
              </div>

              <div className="mb-3">
                <button className="mb-1.5 block w-full text-center text-white bg-blue-700 hover:bg-blue-900 px-2 py-1.5 rounded-md">
                  Sign up
                </button>
                <GoogleAuthSignUp buyerLogin={false} buyer={true}/>
              </div>
            </form>

            {/* <!-- Footer --> */}
            <div className="text-center">
              <span className="text-xs text-gray-400 font-semibold">
                Already have account?
              </span>
              <Link to="/login" className="text-xs font-semibold text-blue-700">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
