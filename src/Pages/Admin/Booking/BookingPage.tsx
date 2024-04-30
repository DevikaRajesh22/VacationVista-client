import SidebarWithLogo from "../../../Components/Admin/Sidebar"
import Booking from '../../../Components/Admin/Booking'

const BookingPage = () => {
    return (
        <div className="flex">
            <div className="w-1/4">
                <SidebarWithLogo />
            </div>
            <div className="mt-20">
                <Booking />
            </div>
        </div>
    )
}

export default BookingPage