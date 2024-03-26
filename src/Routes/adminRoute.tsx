import {Route,Routes} from 'react-router-dom'
import Login from '../Pages/Admin/Login/Login'
import Home from '../Pages/Admin/Home/Home'
import User from '../Pages/Admin/User/User'
import Host from '../Pages/Admin/Host/Host'
import Property from '../Pages/Admin/Property/Property'
import Category from '../Pages/Admin/Category/Category'
import Request from '../Pages/Admin/Request/Request'
import Wallet from '../Pages/Admin/Wallet/Wallet'

const adminRoute = () => {
  return (
    <Routes>
      <Route path='login' element={<Login/>}/>
      <Route path='' element={<Home/>}/>
      <Route path='user' element={<User/>}/>
      <Route path='host' element={<Host/>}/>
      <Route path='property' element={<Property/>}/>
      <Route path='category' element={<Category/>}/>
      <Route path='request' element={<Request/>}/>
      <Route path='wallet' element={<Wallet/>}/>
    </Routes>
  )
}

export default adminRoute
