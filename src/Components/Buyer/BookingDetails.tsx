import { useState, useEffect } from 'react'
import { getBooking } from '../../Api/buyer'
import { profile } from '../../Api/buyer'
import { useParams } from 'react-router-dom'

interface Property {
    id: string,
    title: string,
    address: string,
    status: string,
    photos: string,
    price: number
}

interface Buyer {
    id: string,
    name: string,
    email: string,
    image: string,
    password: string,
    isBlocked: boolean,
    dateOfBirth: Date,
    phone: string,
    govtId: string,
    creationTime: Date,
}

interface Booking {
    id: string,
    propertyId: Property,
    buyerId: string,
    startDate: Date,
    endDate: Date,
    bookingDate: Date,
    paymentSuccess: boolean,
    isCancelled: boolean,
    totalPrice:number
}

const BookingDetails = () => {
    const [bookings, setBookings] = useState<Booking>();
    const [buyerId, setBuyerId] = useState('');
    const [buyer, setBuyer] = useState<Buyer>();
    const { bookingId } = useParams();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await profile()
                if (res?.data.success) {
                    setBuyerId(res?.data.buyerProfile._id)
                    setBuyer(res?.data.buyerProfile)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchUserData()
    }, []);

    useEffect(() => {
        const fetchBookingData = async () => {
            try {
                const res = await getBooking(buyerId)
                if (res?.data.success) {
                    const filteredBookings = res.data.data.filter((booking: Booking) => booking.id === bookingId);
                    setBookings(filteredBookings[0]);
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchBookingData()
    }, [bookingId, buyerId])

    function formatDate(inputDate: Date) {
        const date = new Date(inputDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }


    return (
        <>

            <div className="bg-white border rounded-lg shadow-lg px-6 py-8 max-w-md mx-auto mt-8">
                <h1 className="font-bold text-2xl my-4 text-center text-blue-600">
                    {bookings?.propertyId?.title}
                </h1>
                <hr className="mb-2" />
                <div className="flex justify-between mb-6">
                    <h1 className="text-lg font-bold">Invoice</h1>
                    <div className="text-gray-700">
                        <div>Date: {formatDate(bookings?.bookingDate)}</div>
                    </div>
                </div>
                <div className="mb-8">
                    <h2 className="text-lg font-bold mb-4">Billed To:</h2>
                    <div className="text-gray-700 mb-2">{buyer?.name}</div>
                    <div className="text-gray-700 mb-2">{buyer?.phone}</div>
                    <div className="text-gray-700">{buyer?.email}</div>
                </div>
                <table className="w-full mb-8">
                    <tfoot>
                        <tr>
                            <td className="text-left font-bold text-gray-700">Total</td>
                            <td className="text-right font-bold text-gray-700">₹ {bookings?.totalPrice}</td>
                        </tr>
                    </tfoot>
                </table>
                <div className="text-gray-700 mb-2">Thank you for your business!</div>
            </div>
        </>
    )
}

export default BookingDetails