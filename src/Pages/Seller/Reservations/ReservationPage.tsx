import Navbar from '../../../Components/Seller/Navbar'
import Reservations from '../../../Components/Seller/Reservations'

const ReservationPage = () => {
  return (
    <div>
      <Navbar />
      <div className='mt-5'>
        <Reservations />
      </div>
    </div>
  )
}

export default ReservationPage
