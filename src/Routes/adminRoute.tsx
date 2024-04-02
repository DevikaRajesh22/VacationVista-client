import { Route, Routes } from 'react-router-dom'
import Login from '../Pages/Admin/Login/Login'
import Home from '../Pages/Admin/Home/Home'
import User from '../Pages/Admin/User/User'
import Host from '../Pages/Admin/Host/Host'
import Property from '../Pages/Admin/Property/Property'
import CategoryPage from '../Pages/Admin/Category/CategoryPage'
import AddCategory from '../Pages/Admin/Category/CategoryForm'
import Request from '../Pages/Admin/Request/Request'
import Wallet from '../Pages/Admin/Wallet/Wallet'
import AdminLoggedIn from '../Components/Admin/AdminLoggedIn'
import AdminLoggedOut from '../Components/Admin/AdminLoggedOut'

const adminRoute = () => {
  return (

    <Routes>
      <Route path='' element={<AdminLoggedOut />}>
        <Route path='login' element={<Login />} />
      </Route>
      <Route path='' element={<AdminLoggedIn />}>
        <Route path='dashboard' element={<Home />} />
        <Route path='user' element={<User />} />
        <Route path='host' element={<Host />} />
        <Route path='property' element={<Property />} />
        <Route path='category' element={<CategoryPage />} />
        <Route path='addCategory' element={<AddCategory/>}/>
        <Route path='request' element={<Request />} />
        <Route path='wallet' element={<Wallet />} />
      </Route>
    </Routes>
  )
}

export default adminRoute
