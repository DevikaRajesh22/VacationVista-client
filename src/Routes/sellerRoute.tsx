import {Route,Routes} from "react-router-dom"
import Home from '../Pages/Seller/Home/Home'
import Login from '../Pages/Seller/Login/Login'
import Signup from '../Pages/Seller/Signup/Signup'
import Otp from '../Pages/Seller/Otp/Otp'

const sellerRoute = () => {
  return (
    <Routes>
      <Route path="" element={<Home/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="signup" element={<Signup/>}/>
      <Route path='otp' element={<Otp/>}/>
    </Routes>
  )
}

export default sellerRoute
