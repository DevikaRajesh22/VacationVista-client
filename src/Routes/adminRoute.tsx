import {Route,Routes} from 'react-router-dom'
import Home from '../Pages/Admin/Home/Home'
import Login from '../Pages/Admin/Login/Login'

const adminRoute = () => {
  return (
    <Routes>
      <Route path='' element={<Home/>}/>
      <Route path='login' element={<Login/>}/>
    </Routes>
  )
}

export default adminRoute
