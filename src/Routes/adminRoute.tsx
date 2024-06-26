import { Route, Routes } from 'react-router-dom'
import Login from '../Pages/Admin/Login/Login'
import Home from '../Pages/Admin/Home/Home'
import User from '../Pages/Admin/User/User'
import HostPage from '../Pages/Admin/Host/HostPage'
import PropertyPage from '../Pages/Admin/Property/PropertyPage'
import CategoryPage from '../Pages/Admin/Category/CategoryPage'
import AddCategory from '../Pages/Admin/Category/CategoryForm'
import EditCategoryPage from '../Pages/Admin/Category/EditCategoryPage'
import BookingPage from '../Pages/Admin/Booking/BookingPage'
import RequestPage from '../Pages/Admin/Request/RequestPage'
import RequestDetailsPage from '../Pages/Admin/Request/RequestDetailsPage'
import AdminLoggedIn from '../Components/Admin/AdminLoggedIn'
import AdminLoggedOut from '../Components/Admin/AdminLoggedOut'
import Error from '../Pages/Admin/Error/Error'

const adminRoute = () => {
  return (

    <Routes>
      <Route path='' element={<AdminLoggedOut />}>
        <Route path='login' element={<Login />} />
      </Route>
      <Route path='' element={<AdminLoggedIn />}>
        <Route path='dashboard' element={<Home />} />
        <Route path='user' element={<User />} />
        <Route path='host' element={<HostPage />} />
        <Route path='property' element={<PropertyPage />} />
        <Route path='category' element={<CategoryPage />} />
        <Route path='addCategory' element={<AddCategory />} />
        <Route path='editCategory/:id' element={<EditCategoryPage />} />
        <Route path='booking' element={<BookingPage />} />
        <Route path='request' element={<RequestPage />} />
        <Route path='requestDetails/:id' element={<RequestDetailsPage />} />
      </Route>
      <Route path='*' element={<Error />} />
    </Routes>
  )
}

export default adminRoute
