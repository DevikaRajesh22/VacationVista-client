import { Route, Routes } from "react-router-dom"
import Home from '../Pages/Seller/Home/Home'
import Login from '../Pages/Seller/Login/Login'
import Signup from '../Pages/Seller/Signup/Signup'
import Otp from '../Pages/Seller/Otp/Otp'
import NewList from '../Pages/Seller/NewList/NewList'
import ListingPage from '../Pages/Seller/Listing/ListingPage'
import EditPropertyPage from "../Pages/Seller/EditProperty/EditPropertyPage"
import ProfilePage from "../Pages/Seller/Profile/ProfilePage"
import EditProfilePage from "../Pages/Seller/Profile/EditProfilePage"
import InboxPage from '../Pages/Seller/Inbox/InboxPage'
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
        <Route path='listing' element={<ListingPage />} />
        <Route path='editProperty/:id' element={<EditPropertyPage />} />
        <Route path='profile' element={<ProfilePage />} />
        <Route path='editProfile' element={<EditProfilePage />} />
        <Route path='inbox' element={<InboxPage />} />
      </Route>
    </Routes>
  )
}

export default sellerRoute
