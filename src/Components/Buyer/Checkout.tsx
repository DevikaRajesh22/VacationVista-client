import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { singlePropertyList } from '../../Api/buyer'
import { getCheckout } from '../../Api/buyer'
import { loadStripe } from '@stripe/stripe-js'
import { proceedForPayment, saveSession } from '../../Api/buyer'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Property {
    id: string;
    sellerId: string;
    category: string,
    type: string,
    address: string,
    price: number,
    bathroom: number,
    bedroom: number,
    bed: number,
    guest: number
    photos: string,
    title: string,
    description: string,
    isBlocked: boolean,
    amenities: string,
    safeties: string,
}

interface Book {
    _id: string,
    buyerId: string,
    propertyId: string,
    bookingDate: Date,
    endDate: Date,
    startDate: Date,
    paymentSuccess: false
}

const Checkout = () => {
    const [singleProperty, setSingleProperty] = useState<Property>();
    const [booking, setBooking] = useState<Book>();
    const { id } = useParams()

    useEffect(() => {
        const fetchBookingData = async () => {
            if (id) {
                const res = await getCheckout(id)
                if (res?.data.success) {
                    setBooking(res.data.data)
                }
            }
        }
        fetchBookingData()
    }, [id])

    const endDateString: Date | undefined = booking?.endDate;
    const startDateString: Date | undefined = booking?.startDate;
    let roundedDifference
    let totalPrice
    if (endDateString && startDateString) {
        const endDate: Date = new Date(endDateString);
        const startDate: Date = new Date(startDateString);
        const differenceInMs: number = endDate.getTime() - startDate.getTime();
        const differenceInDays: number = differenceInMs / (1000 * 60 * 60 * 24);
        roundedDifference = Math.round(differenceInDays) + 1;
        if (singleProperty) {
            totalPrice = roundedDifference * singleProperty?.price
        }
    } else {
        console.log("Either endDate or startDate is undefined.");
    }

    useEffect(() => {
        const fetchPropertyData = async () => {
            try {
                if (booking) {
                    const res = await singlePropertyList(booking?.propertyId)
                    if (res?.data.success) {
                        setSingleProperty(res.data.getProperty)
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchPropertyData()
    }, [booking]);

    const makePayment = async () => {
        const stripe = await loadStripe('pk_test_51P7DM6SHI4Od2OhlymxMh88KtRWgBzBUUfjaagLHkphPgElrC70ssnKEGLIgI5bIL1wSSR1c9OxEAVLUSoJWZiFz00avORCeZL')
        if (booking) {
            const res = await proceedForPayment(booking)
            if (res?.data.success) {
                const sessionId = res?.data.data
                const save = await saveSession(sessionId, booking._id);
                if (save?.data?.success) {
                    const result = await stripe?.redirectToCheckout({
                        sessionId: sessionId
                    })
                    console.log(result)
                } else if (!save?.data?.success) {
                    toast.error('Something went wrong..')
                }
            } else if (!res?.data.success) {
                toast.error(res?.data.message)
            }
        }
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-xl"> {/* Increased max-w-lg to max-w-xl */}
                <h1 className="text-xl text-gray-800 mb-6">Booking Summary</h1>
                <ul className="space-y-6">
                    <li className="flex items-center border-b pb-4">
                        <div className="flex-shrink-0 mr-4">
                            <img
                                src={singleProperty?.photos[0]}
                                alt="Product"
                                className="rounded w-16"
                            />
                        </div>
                        <div className="flex-grow m-10">
                            <span className="text-gray-800 text-md font-semibold block">{singleProperty?.title}</span>
                            <span className="text-gray-700 text-sm">{roundedDifference} night</span>
                        </div>
                        <div className="flex-shrink-0">
                            <span className="text-gray-800 font-semibold block">₹{singleProperty?.price}</span>
                        </div>
                    </li>
                </ul>
                <div className="flex justify-between mt-6">
                    <span className="text-xl text-gray-700">Total</span>
                    <span className="text-xl text-gray-800 font-semibold">₹{totalPrice}</span>
                </div>
                <button onClick={makePayment} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10 w-full">
                    Pay now
                </button>
            </div>
        </div>
    );
}

export default Checkout;
