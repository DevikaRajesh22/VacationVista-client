import logo from '../../assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faMoneyBillAlt, faInbox, faSignOut, faUsers, faUserGroup, faChartPie, faTags  } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { adminLogout } from '../../Api/admin';
import { admLogout } from '../../Store/slice/authSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const SidebarWithLogo = () => {

  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleLogout=async()=>{
    try{
      const res=await adminLogout()
      if(res?.data.success){
        dispatch(admLogout())
        toast.success('Logged out successfully..')
        navigate('/admin/login')
      }
    }catch(error){
      console.log(error)
    }
  }
  return (
    <>
    <button
      data-drawer-target="logo-sidebar"
      data-drawer-toggle="logo-sidebar"
      aria-controls="logo-sidebar"
      type="button"
      className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    >
      <span className="sr-only">Open sidebar</span>
      <svg
        className="w-6 h-6"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clipRule="evenodd"
          fillRule="evenodd"
          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
        />
      </svg>
    </button>
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <a href="https://flowbite.com/" className="flex items-center ps-2.5 mb-5">
          <img
            src={logo}
            className="h-6 me-3 sm:h-7"
            alt="Flowbite Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Vacation Vista
          </span>
        </a>
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              to="/admin/"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FontAwesomeIcon icon={faChartPie} className="h-5 w-5" />
              <span className="ms-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <a
              href="/admin/user"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FontAwesomeIcon icon={faUsers} className="h-5 w-5" />
              <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
            </a>
          </li>
          <li>
            <a
              href="/admin/host"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
             <FontAwesomeIcon icon={faUserGroup} className="h-5 w-5" /> 
              <span className="flex-1 ms-3 whitespace-nowrap">Hosts</span>
            </a>
          </li>
          <li>
            <a
              href="/admin/property"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
            <FontAwesomeIcon icon={faBuilding} className="h-5 w-5" />
              <span className="flex-1 ms-3 whitespace-nowrap">Property</span>
            </a>
          </li>
          <li>
            <a
              href="/admin/category"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FontAwesomeIcon icon={faTags} className="h-5 w-5" />
              <span className="flex-1 ms-3 whitespace-nowrap">Category</span>
            </a>
          </li>
          <li>
            <a
              href="/admin/request"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
             <FontAwesomeIcon icon={faInbox} className="h-5 w-5" />
              <span className="flex-1 ms-3 whitespace-nowrap">Requests</span>
              <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                3
              </span>
            </a>
          </li>
          <li>
            <a
              href="/admin/wallet"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FontAwesomeIcon icon={faMoneyBillAlt} className="h-5 w-5" />
              <span className="flex-1 ms-3 whitespace-nowrap">Wallet</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              onClick={handleLogout}
            >
             <FontAwesomeIcon icon={faSignOut} className="h-5 w-5" />
              <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  </>
  );
};

export default SidebarWithLogo;
