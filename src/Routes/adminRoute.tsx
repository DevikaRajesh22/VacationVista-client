import {Route,Routes} from 'react-router-dom'
import Home from '../Pages/Admin/Home/Home'

const adminRoute = () => {
  return (
    <Routes>
      <Route path='' element={<Home/>}/>
    </Routes>
  )
}

export default adminRoute
