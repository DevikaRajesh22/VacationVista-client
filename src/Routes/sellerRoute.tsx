import { Route, Routes } from "react-router-dom"
import Login from '../Pages/Seller/Login/Login'
import Signup from '../Pages/Seller/Signup/Signup'
import Otp from '../Pages/Seller/Otp/Otp'
import NewList from '../Pages/Seller/NewList/NewList'
import ListingPage from '../Pages/Seller/Listing/ListingPage'
import EditPropertyPage from "../Pages/Seller/EditProperty/EditPropertyPage"
import ProfilePage from "../Pages/Seller/Profile/ProfilePage"
import EditProfilePage from "../Pages/Seller/Profile/EditProfilePage"
import InboxPage from '../Pages/Seller/Inbox/InboxPage'
import ReservationPage from '../Pages/Seller/Reservations/ReservationPage'
import ReviewPage from '../Pages/Seller/Review/ReviewPage'
import TodayPage from '../Pages/Seller/Today/TodayPage'
import ReplyPage from '../Pages/Seller/Reply/ReplyPage'
import SubscriptionPage from '../Pages/Seller/Subscription/SubscriptionPage'
import PaymentSuccess from '../Pages/Seller/Payment/paymentSuccess'
import PaymentFail from '../Pages/Seller/Payment/paymentFail'
import NotificationPage from '../Pages/Seller/Notifications/NotificationPage'
import SellerLoggedIn from "../Components/Seller/sellerLoggedIn"
import SellerLoggedOut from "../Components/Seller/sellerLoggedOut"
import Error from '../Pages/Seller/Error/Error'

const sellerRoute = () => {
  return (
    <Routes>
      <Route path="" element={<SellerLoggedOut />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path='otp' element={<Otp />} />
      </Route>
      <Route path="" element={<SellerLoggedIn />}>
        <Route path="dashboard" element={<TodayPage />} />
        <Route path="newListing" element={<NewList />} />
        <Route path='listing' element={<ListingPage />} />
        <Route path='editProperty/:id' element={<EditPropertyPage />} />
        <Route path='profile' element={<ProfilePage />} />
        <Route path='editProfile' element={<EditProfilePage />} />
        <Route path='inbox' element={<InboxPage />} />
        <Route path='reservations' element={<ReservationPage />} />
        <Route path='review' element={<ReviewPage />} />
        <Route path='reply/:reviewId' element={<ReplyPage />} />
        <Route path='subscription' element={<SubscriptionPage />} />
        <Route path='paymentSuccess' element={<PaymentSuccess />} />
        <Route path='paymentFail' element={<PaymentFail />} />
        <Route path='notification' element={<NotificationPage />} />
      </Route>
      <Route path='*' element={<Error />} />
    </Routes>
  )
}

export default sellerRoute
