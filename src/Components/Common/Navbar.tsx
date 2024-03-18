import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          {" "}
          {/* Use Link component */}
          <img src={logo} className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-blue-700">
            Vacation Vista
          </span>
        </Link>
        {/* Button to toggle sidebar on small screens */}
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          onClick={toggleSidebar}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        {/* Navbar options */}
        <div className="hidden md:flex md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col md:flex-row md:space-x-8 rtl:space-x-reverse">
            <li>
              <Link
                to="/sell"
                className="py-2 px-3 text-blue-700 hover:text-blue-900 dark:text-blue-300"
              >
                Sell your home
              </Link>
            </li>
            <li>
              <Link
                to="/login" // Set the 'to' prop to the login page path
                className="py-2 px-3 text-gray-700 hover:text-gray-900 dark:text-gray-300"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="py-2 px-3 text-gray-700 hover:text-gray-900 dark:text-gray-300"
              >
                Signup
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* Sidebar for small screens */}
      <div
        className={`md:hidden ${isSidebarOpen ? "block" : "hidden"}`}
        id="navbar-default"
      >
        <ul className="font-medium flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50">
          <li>
            <Link
              to="/sell"
              className="block py-2 px-3 text-blue-700 hover:text-blue-900 dark:text-blue-300"
            >
              Sell your home
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="block py-2 px-3 text-gray-700 hover:text-gray-900 dark:text-gray-300"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="block py-2 px-3 text-gray-700 hover:text-gray-900 dark:text-gray-300"
            >
              Signup
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
