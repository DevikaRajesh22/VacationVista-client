import google from "../../../assets/google.png";
import { Link } from "react-router-dom";

const Login = () => {
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
            <h1 className="text-xl font-semibold">Welcome back</h1>
            <small className="text-gray-400">
              Welcome back! Please enter your details
            </small>

            {/* <!-- Form --> */}
            <form className="mt-4">
              <div className="mb-3">
                <label className="mb-2 block text-xs font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="block w-full rounded-md border border-gray-300 focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700 py-1 px-1.5 text-gray-500"
                />
              </div>

              <div className="mb-3">
                <label className="mb-2 block text-xs font-semibold">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="*****"
                  className="block w-full rounded-md border border-gray-300 focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700 py-1 px-1.5 text-gray-500"
                />
              </div>

              <div className="mb-3 flex flex-wrap content-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="mr-1 checked:bg-blue-700"
                />{" "}
                <label
                  htmlFor="remember"
                  className="mr-auto text-xs font-semibold"
                >
                  Remember for 30 days
                </label>
                <a href="#" className="text-xs font-semibold text-blue-700">
                  Forgot password?
                </a>
              </div>

              <div className="mb-3">
                <button className="mb-1.5 block w-full text-center text-white bg-blue-700 hover:bg-blue-900 px-2 py-1.5 rounded-md">
                  Log in
                </button>
                <button className="flex flex-wrap justify-center w-full border border-gray-300 hover:border-gray-500 px-2 py-1.5 rounded-md">
                  <img className="w-5 mr-2" src={google} />
                  <Link to="/">Log in with Google</Link>
                </button>
              </div>
            </form>

            {/* <!-- Footer --> */}
            <div className="text-center">
              <span className="text-xs text-gray-400 font-semibold">
                Don't have account?
              </span>
              <Link
                to="/signup"
                className="text-xs font-semibold text-blue-700"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
