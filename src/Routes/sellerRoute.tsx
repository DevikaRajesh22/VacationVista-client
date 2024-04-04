import { Route, Routes } from "react-router-dom"
import Home from '../Pages/Seller/Home/Home'
import Login from '../Pages/Seller/Login/Login'
import Signup from '../Pages/Seller/Signup/Signup'
import Otp from '../Pages/Seller/Otp/Otp'
import NewList from '../Pages/Seller/NewList/NewList'
import SellerLoggedIn from "../Components/Seller/sellerLoggedIn"
import SellerLoggedOut from "../Components/Seller/sellerLoggedOut"

const sellerRoute = () => {
  return (
    <Routes>
      <Route path="" element={<SellerLoggedOut />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path='otp' element={<Otp />} />
      </Route>
      <Route path="" element={<SellerLoggedIn />}>
        <Route path="dashboard" element={<Home />} />
        <Route path="newListing" element={<NewList />} />
      </Route>
    </Routes>
  )
}

export default sellerRoute
