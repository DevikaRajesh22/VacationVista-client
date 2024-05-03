import { useState, useEffect } from 'react'
import { fetchReservation, property } from '../../Api/admin'

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
    buyerId: Buyer,
    startDate: Date,
    endDate: Date,
    bookingDate: Date,
    paymentSuccess: boolean,
    isCancelled: boolean,
}

const Booking = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [properties, setProperties] = useState<Property[]>([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetchReservation(filter);
                if (res?.data.success) {
                    setBookings(res.data.reservation)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [filter])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await property()
                if (res?.data.success) {
                    setProperties(res.data.getProperty)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    return (
        <section className="bg-white py-12 text-gray-700 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-md text-center">
                    <div className="my-2 flex sm:flex-row flex-col">
                        <div className="flex flex-row mb-1 sm:mb-0">
                            <div className="relative w-full">
                                <select onChange={(e) => {
                                    const selectedOption = e.target.value
                                    if (selectedOption == 'Filter') {
                                        setFilter('')
                                    } else {
                                        setFilter(selectedOption)
                                    }
                                }} className="h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                                    <option>Filter</option>
                                    {properties.map((val) => {
                                        return val.status === 'Accepted' ? (
                                            <option key={val?.title}>{val?.title}</option>
                                        ) : (
                                            null
                                        );
                                    })}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg
                                        className="fill-current h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-10 grid grid-cols-2 gap-6 lg:mt-16 lg:grid-cols-4 lg:gap-4">
                    {bookings.map((val) => {
                        return (
                            <div >
                                <article className="relative">
                                    <div className="aspect-square overflow-hidden">
                                        <img
                                            className="group-hover:scale-125 h-full w-full object-cover transition-all duration-300"
                                            src={val?.propertyId?.photos[0]}
                                            alt=""
                                        />
                                    </div>
                                    <div className="mt-4 flex items-start justify-between">
                                        <div className="">
                                            <h3 className="text-xs font-semibold sm:text-sm md:text-base text-black">
                                                <a href="#" title="" className="cursor-pointer">
                                                    {val?.propertyId?.title}
                                                </a>
                                            </h3>
                                            <p className='text-black-400'>
                                                {val?.propertyId?.address}
                                            </p>
                                            <p className='text-black'>
                                                <span className='text-l'>₹{val?.propertyId?.price}</span> night
                                            </p>
                                            <p className='text-gray'>
                                                <span className='text-sm'>Customer: {val?.buyerId?.name}</span>
                                            </p>
                                            <p className='text-gray'>
                                                <span className='text-sm'>Contact: {val?.buyerId?.phone}</span>
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Booking