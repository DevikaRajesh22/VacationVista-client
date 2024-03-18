import google from "../../../assets/google.png";
import { Link } from "react-router-dom";

const Signup = () => {
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
            <small className="text-gray-400">
              Please enter your details
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
              <div className="mb-3">
                <label className="mb-2 block text-xs font-semibold">
                 Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="*****"
                  className="block w-full rounded-md border border-gray-300 focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700 py-1 px-1.5 text-gray-500"
                />
              </div>

              <div className="mb-3">
                <button className="mb-1.5 block w-full text-center text-white bg-blue-700 hover:bg-blue-900 px-2 py-1.5 rounded-md">
                  Sign up
                </button>
                <button className="flex flex-wrap justify-center w-full border border-gray-300 hover:border-gray-500 px-2 py-1.5 rounded-md">
                  <img className="w-5 mr-2" src={google} />
                  <Link to="/">Sign up with Google</Link>
                </button>
              </div>
            </form>

            {/* <!-- Footer --> */}
            <div className="text-center">
              <span className="text-xs text-gray-400 font-semibold">
                Already have account?
              </span>
              <Link
                to="/login"
                className="text-xs font-semibold text-blue-700"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
