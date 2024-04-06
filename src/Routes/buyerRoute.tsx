import { Route, Routes } from "react-router-dom"
import Home from "../Pages/Buyer/Home/Home"
import Login from '../Pages/Buyer/Login/Login'
import Signup from "../Pages/Buyer/Signup/Signup"
import Otp from "../Pages/Buyer/Otp/Otp"
import Profile from '../Pages/Buyer/Profile/Profile'
import EditProfile from '../Pages/Buyer/Profile/EditProfile'
import ForgotPassword from "../Pages/Buyer/ForgotPassword/ForgotPassword"
import PropertyPage from '../Pages/Buyer/Property/PropertyPage'
import BuyerLoggedIn from "../Components/Buyer/buyerLoggedIn"
import BuyerLoggedOut from "../Components/Buyer/buyerLoggedOut"

const buyerRoute = () => {
  return (
    <Routes>
      <Route path='' element={<Home />} />
      <Route path="" element={<BuyerLoggedOut />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="otp" element={<Otp />} />
        <Route path='forgotPassword' element={<ForgotPassword />} />
      </Route>
      <Route path="" element={<BuyerLoggedIn />}>
        <Route path='profile' element={<Profile />} />
        <Route path="editProfile" element={<EditProfile />} />
        <Route path='property' element={<PropertyPage/>}/> 
      </Route>
    </Routes>
  )
}

export default buyerRoute
