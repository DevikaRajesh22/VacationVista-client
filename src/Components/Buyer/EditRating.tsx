import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { editRate } from '../../Api/buyer'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { findRateById } from '../../Api/buyer';

let buyerId: string | undefined;

const EditRating = () => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const { bookingId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const buyerData = localStorage.getItem('buyerInfo');
        if (buyerData) {
            const tokenPayload = buyerData.split('.')[1];
            const decodedPayload = atob(tokenPayload);
            const payloadObject = JSON.parse(decodedPayload);
            buyerId = payloadObject.id;
        }
    }, [])

    useEffect(() => {
        const fetchRating = async () => {
            try {
                if (bookingId) {
                    const res = await findRateById(bookingId)
                    if (res?.data.success) {
                        setRating(res.data.data.rating)
                        setReview(res.data.data.review)
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchRating()
    }, [])

    const handleStarClick = (starIndex: number) => {
        setRating(starIndex);
    };

    const handleSubmit = async () => {
        try {
            if (bookingId && buyerId) {
                const res = await editRate(bookingId, rating, review, buyerId);
                if (res?.data.success) {
                    toast.success('Review edited')
                    navigate('/trips')
                } else if (!res?.data.success) {
                    toast.error('Something went wrong')
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="min-h-screen bg-gray-300 py-6 flex flex-col justify-center sm:py-12">
                <div className="py-3 sm:max-w-xl sm:mx-auto">
                    <div className="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
                        <div className="px-12 py-5">
                            <h2 className="text-gray-800 text-xl font-semibold">
                                Your opinion matters to us!
                            </h2>
                        </div>
                        <div className="bg-gray-200 w-full flex flex-col items-center">
                            <div className="flex flex-col items-center py-6 space-y-3">
                                <span className="text-lg text-gray-800">
                                    How was quality of the trip?
                                </span>
                                <div className="flex space-x-3">
                                    {[...Array(5)].map((_, index) => (
                                        <svg
                                            key={index}
                                            className={`w-12 h-12 ${index < rating ? 'text-yellow-500' : 'text-gray-500'}`}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            onClick={() => handleStarClick(index)}
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                            <div className="w-3/4 flex flex-col">
                                <textarea
                                    rows={3}
                                    className="p-4 text-gray-500 rounded-xl resize-none"
                                    placeholder='Leave a comment'
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                />
                                <button onClick={handleSubmit} className="py-3 my-8 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white">
                                    Rate now
                                </button>
                            </div>
                        </div>
                        <div className="h-20 flex items-center justify-center">
                            <Link to="/trips" className="text-gray-600">
                                Maybe later
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditRating