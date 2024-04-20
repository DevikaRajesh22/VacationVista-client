import { Route, Routes } from "react-router-dom"
import Home from "../Pages/Buyer/Home/Home"
import Login from '../Pages/Buyer/Login/Login'
import Signup from "../Pages/Buyer/Signup/Signup"
import Otp from "../Pages/Buyer/Otp/Otp"
import Profile from '../Pages/Buyer/Profile/Profile'
import EditProfile from '../Pages/Buyer/Profile/EditProfile'
import ForgotPassword from "../Pages/Buyer/ForgotPassword/ForgotPassword"
import SinglePropertyPage from "../Pages/Buyer/SingleProperty/SinglePropertyPage"
import ResetPassword from '../Pages/Buyer/ForgotPassword/ResetPassword'
import CheckoutPage from '../Pages/Buyer/Checkout/CheckoutPage'
import PropertyPage from '../Pages/Buyer/Property/PropertyPage'
import PaymentSuccess from '../Pages/Buyer/Payment/PaymentSuccess'
import PaymentFail from '../Pages/Buyer/Payment/PaymentFail'
import BuyerLoggedIn from "../Components/Buyer/buyerLoggedIn"
import BuyerLoggedOut from "../Components/Buyer/buyerLoggedOut"

const buyerRoute = () => {
  return (
    <Routes>
      <Route path='' element={<Home />} />
      <Route path="" element={<BuyerLoggedOut />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="otp" element={<Otp buyer={false} />} />
        <Route path='forgotPassword' element={<ForgotPassword />} />
        <Route path='forgotPasswordOtp/:email' element={<Otp buyer={true} />} />
        <Route path='resetPassword/:email' element={<ResetPassword />} />
      </Route>
      <Route path="" element={<BuyerLoggedIn />}>
        <Route path='profile' element={<Profile />} />
        <Route path="editProfile" element={<EditProfile />} />
        <Route path='property' element={<PropertyPage />} />
        <Route path='singleProperty/:id' element={<SinglePropertyPage />} />
        <Route path='checkout/:id' element={<CheckoutPage />} />
        <Route path='paymentSuccess' element={<PaymentSuccess />} />
        <Route path='paymentFail' element={<PaymentFail />} />
      </Route>
    </Routes>
  )
}

export default buyerRoute
