import './Home.css'
import Navbar from '../../../Components/Common/Navbar'
import Carousel from '../../../Components/Buyer/Carousel'
import Destination from '../../../Components/Buyer/Destination'
import Choose from '../../../Components/Buyer/Choose'
import Trend from '../../../Components/Buyer/Trend'
import Footer from '../../../Components/Common/Footer'

const Home = () => {
  return (
    <>
    <Navbar/>
    <Carousel/>
    <Destination/>
    <Choose/>
    <Trend/>
    <Footer/>
    </>
  )
}

export default Home
