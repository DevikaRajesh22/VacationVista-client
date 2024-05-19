import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRoute from './Routes/adminRoute';
import BuyerRoute from './Routes/buyerRoute';
import SellerRoute from './Routes/sellerRoute';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path='/*' element={<BuyerRoute />} />
          <Route path='/seller/*' element={<SellerRoute />} />
          <Route path='/admin/*' element={<AdminRoute />} />
        </Routes>
      </Router>
    </>
  )
}
export default App;