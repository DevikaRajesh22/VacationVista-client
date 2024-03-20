// import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import { useNavigate, Link } from "react-router-dom";
// import Api from "../../../Service/axios";

const Otp = () => {
  // const [otp, setOtp] = useState(["", "", "", ""]);
  // const [seconds, setSeconds] = useState(59);
  // const [resendOtp, setResendOtp] = useState(false);
  // const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen">
  <div className="w-full md:max-w-lg mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
    <div className="flex flex-col justify-center space-y-5 p-6">
      <div className="flex flex-col space-y-2 text-center">
        <h6 className="md:text-2xl font-bold text-left">Verify OTP</h6>
      </div>
      <div className="flex flex-col space-y-5">
        <input
          type="text"
          placeholder="Enter OTP"
          className="px-3 py-2 md:px-4 md:py-3 border-2 border-black-500 rounded-lg font-medium placeholder:font-normal"
        />
        <div className="flex justify-between items-center">
          <p>Time remaining: 00:23</p>
          <p>Resend code</p>
        </div>
        <button className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-blue-500 bg-blue-500 text-white">
          Confirm
        </button>
      </div>
    </div>
  </div>
</div>

  );
};

export default Otp;
