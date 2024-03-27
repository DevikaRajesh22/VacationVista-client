import {Route,Routes} from "react-router-dom"
import Home from "../Pages/Buyer/Home/Home"
import Login from '../Pages/Buyer/Login/Login'
import Signup from "../Pages/Buyer/Signup/Signup"
import Otp from "../Pages/Buyer/Otp/Otp"
import Profile from '../Pages/Buyer/Profile/Profile'

const buyerRoute = () => {
  return (
    <Routes>
      <Route path='' element={<Home/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="signup" element={<Signup/>}/>
      <Route path="otp" element={<Otp/>}/>
      <Route path='profile' element={<Profile/>}/>
    </Routes>
  )
}

export default buyerRoute
