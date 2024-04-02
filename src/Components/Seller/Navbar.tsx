import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { profile } from '../../Api/seller'
import { sellerLogout } from "../../Api/seller";
import { toast } from 'react-toastify'
import { sellLogout } from "../../Store/slice/authSlice";

interface RootState {
  auth: {
    sellerInfo: string;
  };
}

const Navbar = () => {
  const { sellerInfo } = useSelector((state: RootState) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [dropdownToggle, setDropdownToogle] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await profile();
        console.log('jooo', res)
        // if (res?.data?.sellerProfile) {
        //   setName(res.data.sellerProfile.name);
        //   setImage(res.data.sellerProfile.image || user);
        // }
      } catch (error) {
        console.log(error)
      }
    }
    fetchUserData()
  }, [])

  const dropDownToggle = () => {
    setDropdownToogle(!dropdownToggle);
  };

  const handleLogout = async () => {
    try {
      console.log('handle logout')
      const res = await sellerLogout()
      console.log('res', res)
      if (res?.data.success) {
        dispatch(sellLogout())
        toast.success('Logged out successfully..')
        navigate('/seller/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  // const sidebarToggle=()=>{
  //   setToggleSidebar(!toggleSidebar)
  // }

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/seller"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Vacation Vista
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {sellerInfo ?
            <button
              onClick={handleLogout}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Logout
            </button>
            :
            <Link to='/seller/signup'>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Get started
              </button>
            </Link>
          }
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            // onClick={sidebarToggle}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
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
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        {sellerInfo && <div
          className="items-center justify-between w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                aria-current="page"
              >
                Today
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Listings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Inbox
              </a>
            </li>
            <li>
              <div className="relative">
                <button
                  id="dropdownNavbarLink"
                  data-dropdown-toggle="dropdownNavbar"
                  onClick={dropDownToggle}
                  className="flex items-center justify-between w-full py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                >
                  Menu{" "}
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                {/* Dropdown menu */}
                {dropdownToggle && (
                  <div
                    className="absolute top-full left-0 mt-1 w-full md:w-auto md:left-auto md:top-auto md:right-0 md:mt-0 md:border md:border-gray-100 rounded-lg bg-gray-50 md:bg-white dark:bg-gray-800 dark:border-gray-700"
                    id="navbar-dropdown"
                  >
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton" style={{ width: '120px' }}>
                      <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reservations</a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Ratings</a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Payments</a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Insights</a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">New listing</a>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sellers</a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </li>
          </ul>
        </div>}
      </div>
    </nav>
  );
};

export default Navbar;
