import { useState, useEffect } from 'react';
import { profile } from '../../Api/buyer'
import { getBooking } from '../../Api/buyer'
// import { cancelBooking } from '../../Api/buyer'
import { toast } from "react-toastify";

interface Property {
  id: string,
  title: string,
  address: string,
  status: string,
  photos: string,
  price: number
}

interface Booking {
  id: string,
  propertyId: Property,
  buyerId: string,
  startDate: Date,
  endDate: Date,
  bookingDate: Date,
  paymentSuccess: boolean,
  isCancelled: boolean
}

const Trip = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
  const [buyerId, setBuyerId] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await profile()
        if (res?.data.success) {
          setBuyerId(res?.data.buyerProfile._id)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchUserData()
  }, [bookings]);

    useEffect(() => {
        const fetchBookingData = async () => {
          try {
            const res = await getBooking(buyerId)
            if (res?.data.success) {
              setBookings(res.data.data)
            }
          } catch (error) {
            console.log(error)
          }
        }
        fetchBookingData()
      })

    const formatDateAndCalculateDays = (startDateString: Date, endDateString: Date) => {
        const startDate = new Date(startDateString);
        const endDate = new Date(endDateString);
        const differenceInMs = endDate.getTime() - startDate.getTime();
        const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);
        const startDay = startDate.getDate();
        const startMonth = startDate.getMonth() + 1;
        const startYear = startDate.getFullYear() % 100;
        const formattedStartDate = `${String(startDay).padStart(2, '0')}/${String(startMonth).padStart(2, '0')}/${startYear}`;
        const endDay = endDate.getDate();
        const endMonth = endDate.getMonth() + 1;
        const endYear = endDate.getFullYear() % 100;
        const formattedEndDate = `${String(endDay).padStart(2, '0')}/${String(endMonth).padStart(2, '0')}/${endYear}`;
        return {
          startDateFormatted: formattedStartDate,
          endDateFormatted: formattedEndDate,
          numberOfDays: differenceInDays
        };
      }

      const handleRating=async(bookingId:string)=>{
        try{
            toast.success(bookingId)
        }catch(error){
            console.log(error)
        }
      }

  return (
    <section className="bg-white py-12 text-gray-700 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
          {bookings.map((val) => {
            const endDate = new Date(val.endDate);
            const today = new Date();
            let trip
            if (
                endDate.getDate() <= today.getDate() &&
                endDate.getMonth() <= today.getMonth() &&
                endDate.getFullYear() <= today.getFullYear()
            ) {
                trip = true
            } else {
                trip = false
            }
            if (val.paymentSuccess && !val.isCancelled && trip) {
              const { startDateFormatted, endDateFormatted, numberOfDays } = formatDateAndCalculateDays(val.startDate, val.endDate);
              const total = (numberOfDays + 1) * val.propertyId.price
              return (
                <article className="relative flex flex-col overflow-hidden rounded-lg border" key={val.propertyId.id}>
                  <div className="aspect-square overflow-hidden">
                    <img
                      className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
                      src={val.propertyId.photos[0]}
                      alt=""
                    />
                  </div>
                  <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
                    <p className="text-lg text-black font-semibold">{val.propertyId.title}</p>
                    <p className="text-sm text-black-500 ">{val.propertyId.address}</p>
                    <h3 className="mb-2 text-sm text-gray-500">{!val.isCancelled ? `Amount paid : ₹${total}` : `Refunded: ₹${total}`}</h3>
                    {(startDateFormatted == endDateFormatted) ? <p>{startDateFormatted}</p> : <p>{startDateFormatted} to {endDateFormatted}</p>}
                  </div>
                  {!val.isCancelled ? <button onClick={(e) => {
                    e.preventDefault()
                    handleRating(val.id)
                  }} className="group mx-auto mb-2 flex h-10 w-10/12 items-stretch overflow-hidden rounded-md text-gray-600">
                    <div className="flex w-full items-center justify-center bg-yellow-500 text-xs uppercase transition group-hover:bg-emerald-600 font-bold text-white">
                      Rate
                    </div>
                  </button>
                    :
                    <p className='text-red-500 m-3'>Cancelled</p>
                  }
                </article>
              )
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </section>
  )
}

export default Trip