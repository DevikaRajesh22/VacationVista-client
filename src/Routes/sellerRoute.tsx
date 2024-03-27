import {Route,Routes} from "react-router-dom"
import Home from '../Pages/Seller/Home/Home'

const sellerRoute = () => {
  return (
    <Routes>
      <Route path="" element={<Home/>}/>
    </Routes>
  )
}

export default sellerRoute
