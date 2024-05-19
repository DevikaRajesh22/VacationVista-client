import { useState, useEffect } from 'react';
import payment from '../../assets/payment.png';
import { loadStripe } from '@stripe/stripe-js';
import { proceedForSubscription, profile, cancelSubscription } from '../../Api/seller';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Seller {
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
    isVerified: boolean
}

const Subscription = () => {
    const [seller, setSeller] = useState<Seller>();
    const [sellerId, setSellerId] = useState('');
    const [subs, setSubs] = useState(false);

    useEffect(() => {
        const fetchSellerData = async () => {
            try {
                const res = await profile()
                if (res?.data.sellerProfile) {
                    setSeller(res.data.sellerProfile)
                    setSellerId(res.data.sellerProfile._id)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchSellerData()
    }, []);

    const makePayment = async () => {
        const stripe = await loadStripe('pk_test_51P7DM6SHI4Od2OhlymxMh88KtRWgBzBUUfjaagLHkphPgElrC70ssnKEGLIgI5bIL1wSSR1c9OxEAVLUSoJWZiFz00avORCeZL')
        const res = await proceedForSubscription()
        if (res?.data.success) {
            const sessionId = res?.data.data
            const result = await stripe?.redirectToCheckout({
                sessionId: sessionId
            })
            setSubs(!subs)
            console.log(result)
        }
    }

    const handleCancel = async () => {
        const res = await cancelSubscription(sellerId)
        if (res?.data.success) {
            setSubs(!subs)
            toast.success('Subscription cancelled..')
        } else if (!res?.data.success) {
            toast.error('Something went wrong..')
        }
    }

    return (
        <div className='m-20'>
            <div className="bg-white dark:bg-gray-800 overflow-hidden relative m-10">
                <div className="text-start w-1/2 py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
                    <h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
                        <span className="block">Want to be millionaire ?</span>
                        <span className="block text-indigo-500">It's today or never.</span>
                    </h2>
                    <p className="text-xl mt-4 text-gray-400">
                        Ready to take your business to the next level? Subscribe now and start enjoying the benefits instantly! Monthly subscription plans starting at ₹1500/-
                    </p>
                    <div className="lg:mt-0 lg:flex-shrink-0">
                        {
                            seller?.isVerified ?
                                <div className="mt-12 inline-flex rounded-md shadow">
                                    <button
                                        onClick={handleCancel}
                                        type="button"
                                        className="py-4 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                    >
                                        Cancel Subscription
                                    </button>
                                </div>
                                :
                                <div className="mt-12 inline-flex rounded-md shadow">
                                    <button
                                        onClick={makePayment}
                                        type="button"
                                        className="py-4 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                    >
                                        Subscribe
                                    </button>
                                </div>
                        }
                    </div>
                </div>
                <img
                    src={payment}
                    className="absolute top-0 right-0 hidden h-full max-w-1/2 lg:block"
                />
            </div>
        </div>

    )
}

export default Subscription