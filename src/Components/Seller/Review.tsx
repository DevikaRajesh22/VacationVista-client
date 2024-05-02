import { useState, useEffect } from 'react';
import { sellerList } from '../../Api/seller';
import { getRatings } from '../../Api/buyer'
import { useNavigate } from 'react-router-dom'

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
    propertyId: string,
    buyerId: string,
    startDate: Date,
    endDate: Date,
    bookingDate: Date,
    paymentSuccess: boolean,
    sessionId: string,
    isCancelled: boolean,
    payment_intent: string,
}

interface Review {
    id: string,
    bookingId: Booking,
    buyerId: Buyer,
    rating: number,
    review: string,
    reply: string
}

const Review = () => {
    const [propertyId, setPropertyId] = useState('')
    const [review, setReview] = useState<Review[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPropertyData = async () => {
            try {
                const res = await sellerList()
                if (res?.data.success) {
                    setPropertyId(res.data.getProperty[0]._id)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchPropertyData();
    });

    useEffect(() => {
        const fetchRatings = async () => {
            if (propertyId) {
                const res = await getRatings(propertyId)
                if (res?.data.success) {
                    setReview(res.data.data)
                }
            }
        }
        fetchRatings()
    }, [propertyId])

    const handleReply = async (reviewId: string) => {
        try {
            navigate(`/seller/reply/${reviewId}`)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="flex justify-center">
            <section className="py-24 relative">
                <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto"> {/* Added mx-auto class */}
                    {
                        review.map((val, index) => (
                            <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
                                <div className="p-6">
                                    <div className="flex gap-6 items-center">
                                        <img
                                            src={val.buyerId.image}
                                            alt="Reviewer's Image"
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div className="text">
                                            <p className="font-medium leading-8 text-gray-900 mb-0">{val.buyerId.name}</p>
                                            <div className="flex justify-start mb-2">
                                                {
                                                    Array.from({ length: val.rating }).map((_, index) => (
                                                        <svg
                                                            key={index}
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width={15}
                                                            height={15}
                                                            viewBox="0 0 30 30"
                                                            fill="none"
                                                        >
                                                            <g clipPath="url(#clip0_13624_2090)">
                                                                <path
                                                                    d="M14.1033 2.56698C14.4701 1.82374 15.5299 1.82374 15.8967 2.56699L19.1757 9.21093C19.3214 9.50607 19.6029 9.71064 19.9287 9.75797L27.2607 10.8234C28.0809 10.9426 28.4084 11.9505 27.8149 12.5291L22.5094 17.7007C22.2737 17.9304 22.1662 18.2614 22.2218 18.5858L23.4743 25.8882C23.6144 26.7051 22.7569 27.3281 22.0233 26.9424L15.4653 23.4946C15.174 23.3415 14.826 23.3415 14.5347 23.4946L7.9767 26.9424C7.24307 27.3281 6.38563 26.7051 6.52574 25.8882L7.7782 18.5858C7.83384 18.2614 7.72629 17.9304 7.49061 17.7007L2.1851 12.5291C1.59159 11.9505 1.91909 10.9426 2.73931 10.8234L10.0713 9.75797C10.3971 9.71064 10.6786 9.50607 10.8243 9.21093L14.1033 2.56698Z"
                                                                    fill="#FBBF24"
                                                                />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_13624_2090">
                                                                    <rect width={30} height={30} fill="white" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    ))
                                                }
                                            </div>
                                            <p className="font-normal text-base leading-7 text-gray-700 mb-2 lg:pr-8">{val.review}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="cursor-pointer flex items-center gap-2">
                                                    <a
                                                        href="#"
                                                        onClick={() => handleReply(val.id)}
                                                        className="font-semibold cursor-pointer leading-8 text-indigo-600 whitespace-nowrap"
                                                    >
                                                        {val.reply?'':'Reply'}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </section>
        </div>
    )
}

export default Review