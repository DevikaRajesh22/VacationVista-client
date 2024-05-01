import { useState, useEffect } from 'react';
import { sellerList, getBookingbySellerId } from '../../Api/seller';

interface Property {
    _id: string,
    title: string,
    address: string,
    status: string,
    photos: string,
    isBlocked: string,
    price: number,
}

interface Buyer {
    _id: string,
    name: string,
    email: string,
    phone: string
}

interface Booking {
    id: string,
    propertyId: Property,
    buyerId: Buyer,
    startDate: Date,
    endDate: Date,
    bookingDate: Date,
    paymentSuccess: boolean,
    isCancelled: boolean
}

const Today = () => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [sellerId, setSellerId] = useState('')

    useEffect(() => {
        const fetchPropertyData = async () => {
            try {
                const res = await sellerList()
                if (res?.data.success) {
                    setProperties(res.data.getProperty)
                    setSellerId(res.data.getProperty[0].sellerId)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchPropertyData();
    });

    useEffect(() => {
        const fetchBookingData = async () => {
            const res = await getBookingbySellerId(sellerId);
            if (res?.data.success) {
                setBookings(res.data.data)
            }
        }
        fetchBookingData()
    }, [sellerId])

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

    return (
        <>
            <div className="p-6 px-4 mx-10 mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="p-6 relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded">
                        <div className="rounded-t mb-0 px-0 border-0">
                            <div className="flex flex-wrap items-center px-4 py-2">
                                <div className="relative w-full max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-gray-900 dark:text-gray-50">
                                        Users
                                    </h3>
                                </div>
                            </div>
                            <div className="block w-full overflow-x-auto">
                                <table className="items-center w-full bg-transparent border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Role
                                            </th>
                                            <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Amount
                                            </th>
                                            <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px" />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="text-gray-700 dark:text-gray-100">
                                            <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                                Administrator
                                            </th>
                                            <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                1
                                            </td>
                                            <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                <div className="flex items-center">
                                                    <span className="mr-2">70%</span>
                                                    <div className="relative w-full">
                                                        <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                                                            <div
                                                                style={{ width: "70%" }}
                                                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="text-gray-700 dark:text-gray-100">
                                            <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                                User
                                            </th>
                                            <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                6
                                            </td>
                                            <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                <div className="flex items-center">
                                                    <span className="mr-2">40%</span>
                                                    <div className="relative w-full">
                                                        <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                                                            <div
                                                                style={{ width: "40%" }}
                                                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="text-gray-700 dark:text-gray-100">
                                            <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                                User
                                            </th>
                                            <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                5
                                            </td>
                                            <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                <div className="flex items-center">
                                                    <span className="mr-2">45%</span>
                                                    <div className="relative w-full">
                                                        <div className="overflow-hidden h-2 text-xs flex rounded bg-pink-200">
                                                            <div
                                                                style={{ width: "45%" }}
                                                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="text-gray-700 dark:text-gray-100">
                                            <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                                User
                                            </th>
                                            <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                4
                                            </td>
                                            <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                <div className="flex items-center">
                                                    <span className="mr-2">60%</span>
                                                    <div className="relative w-full">
                                                        <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                                                            <div
                                                                style={{ width: "60%" }}
                                                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
                        <div className="flex justify-between mb-4 items-start">
                            <div className="font-medium">Activities</div>
                            <div className="dropdown">
                                <button
                                    type="button"
                                    className="dropdown-toggle text-gray-400 hover:text-gray-600"
                                >
                                    <i className="ri-more-fill" />
                                </button>
                                <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                    <li>
                                        <a
                                            href="#"
                                            className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                        >
                                            Profile
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                        >
                                            Settings
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                        >
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="overflow-hidden">
                            <table className="w-full min-w-[540px]">
                                <tbody>
                                    <tr>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <div className="flex items-center">
                                                <a
                                                    href="#"
                                                    className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                                                >
                                                    Lorem Ipsum
                                                </a>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="text-[13px] font-medium text-gray-400">
                                                02-02-2024
                                            </span>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="text-[13px] font-medium text-gray-400">
                                                17.45
                                            </span>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <div className="dropdown">
                                                <button
                                                    type="button"
                                                    className="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm w-6 h-6 rounded flex items-center justify-center bg-gray-50"
                                                >
                                                    <i className="ri-more-2-fill" />
                                                </button>
                                                <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                                    <li>
                                                        <a
                                                            href="#"
                                                            className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                                        >
                                                            Profile
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="#"
                                                            className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                                        >
                                                            Settings
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="#"
                                                            className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                                        >
                                                            Logout
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <div className="flex items-center">
                                                <a
                                                    href="#"
                                                    className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                                                >
                                                    Lorem Ipsum
                                                </a>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="text-[13px] font-medium text-gray-400">
                                                02-02-2024
                                            </span>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <span className="text-[13px] font-medium text-gray-400">
                                                17.45
                                            </span>
                                        </td>
                                        <td className="py-2 px-4 border-b border-b-gray-50">
                                            <div className="dropdown">
                                                <button
                                                    type="button"
                                                    className="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm w-6 h-6 rounded flex items-center justify-center bg-gray-50"
                                                >
                                                    <i className="ri-more-2-fill" />
                                                </button>
                                                <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                                    <li>
                                                        <a
                                                            href="#"
                                                            className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                                        >
                                                            Profile
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="#"
                                                            className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                                        >
                                                            Settings
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="#"
                                                            className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                                        >
                                                            Logout
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <section className="bg-white py-12 text-gray-700 sm:py-16 lg:py-20">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <h3>Today's Customer</h3>
                    <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
                        {bookings.map((val) => {
                            const startDate = new Date(val.startDate);
                            const today = new Date();
                            let sameDay
                            if (
                                startDate.getDate() === today.getDate() &&
                                startDate.getMonth() === today.getMonth() &&
                                startDate.getFullYear() === today.getFullYear()
                            ) {
                                sameDay = true
                            } else {
                                sameDay = false
                            }
                            if (val.paymentSuccess && !val.isCancelled && sameDay) {
                                const { startDateFormatted, endDateFormatted, numberOfDays } = formatDateAndCalculateDays(val.startDate, val.endDate);
                                const total = (numberOfDays + 1) * val.propertyId.price
                                return (
                                    <article className="relative flex flex-col overflow-hidden rounded-lg border" key={val.id}>
                                        <div className="aspect-square overflow-hidden">
                                            <img
                                                className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
                                                src={val.propertyId.photos[0]}
                                                alt=""
                                            />
                                        </div>
                                        <div className="absolute top-0 m-2 rounded-full bg-white">
                                            <p className="rounded-full bg-emerald-500 p-1 text-[8px] font-bold uppercase tracking-wide text-black sm:py-1 sm:px-3">
                                                {val.isCancelled ? 'Cancelled' : 'Paid'}
                                            </p>
                                        </div>
                                        <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
                                            <p className="text-lg text-black font-semibold">{val.propertyId.title}</p>
                                            <p className="text-sm text-black-500 ">{val.propertyId.address}</p>
                                            <h3 className="mb-2 text-sm text-gray-400">Amount : ₹{total}</h3>
                                            {(startDateFormatted == endDateFormatted) ? <p className='text-sm text-gray-500'>Date: {startDateFormatted}</p> : <p className='text-sm text-gray-500'>{startDateFormatted} to {endDateFormatted}</p>}
                                            <p className="text-sm text-gray-500 ">Customer name : {val.buyerId.name}</p>
                                            <p className="text-sm text-gray-500 ">Contact : {val.buyerId.phone}</p>
                                        </div>
                                    </article>
                                )
                            }
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Today