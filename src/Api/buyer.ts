import Api from "../Service/axios";
import BuyerEndpoint from "../Service/endpoints/buyerEndpoint";

interface BookingDetails {
    _id: string,
    buyerId: string,
    propertyId: string,
    bookingDate: Date,
    endDate: Date,
    startDate: Date,
    paymentSuccess: false
}

export const signup = async (name: string, email: string, password: string) => {
    try {
        const res = await Api.post(BuyerEndpoint.buyerSignup, { name, email, password })
        const token = res.data.token
        localStorage.setItem('buyerotp', token)
        return res
    } catch (error) {
        console.log(error)
    }
};

export const forgotPassword = async (email: string) => {
    try {
        const res = await Api.post(BuyerEndpoint.buyerForgotPassword, { email });
        const token = res.data.token
        localStorage.setItem('buyerotpforgotpassword', token)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const verifyOtp = async (otp: string) => {
    try {
        const token = localStorage.getItem('buyerotp')
        const res = await Api.post(BuyerEndpoint.buyerVerifyOtp, { otp }, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        });
        if (res.data.success) {
            localStorage.removeItem('buyerotp')
        }
        return res
    } catch (error) {
        console.log(error);
    }
};

export const verifyOtpForgotPassword = async (otp: string) => {
    try {
        const token = localStorage.getItem('buyerotpforgotpassword')
        const res = await Api.post(BuyerEndpoint.buyerVerifyOtpForgotPassword, { otp }, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        });
        return res
    } catch (error) {
        console.log(error)
    }
}

export const otpResend = async () => {
    try {
        const token = localStorage.getItem('buyerotp')
        const res = await Api.post(BuyerEndpoint.buyerResendOtp, '', {
            headers: {
                'authorization': `Bearer ${token}`,
            }
        });
        const tokens = res.data.token
        localStorage.setItem('buyerotp', tokens)
        return res
    } catch (error) {
        console.log(error)
    }
};

export const resetPassword = async (email: string, password: string) => {
    try {
        const token = localStorage.getItem('buyerotpforgotpassword')
        const res = await Api.post(BuyerEndpoint.buyerResetPassword, { email, password }, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        })
        if (res.data.success) {
            localStorage.removeItem('buyerotpforgotpassword')
        }
        return res
    } catch (error) {
        console.log(error)
    }
}

export const login = async (email: string, password: string) => {
    try {
        const res = await Api.post(BuyerEndpoint.buyerLogin, { email, password })
        return res
    } catch (error) {
        console.log(error)
    }
};

export const buyerLogout = async () => {
    try {
        const res = await Api.post(BuyerEndpoint.buyerLogout)
        return res
    } catch (error) {
        console.log(error)
    }
};

export const gsignup = async (name: string, email: string, password: string) => {
    try {
        const res = await Api.post(BuyerEndpoint.buyerGsignup, { name, email, password })
        return res
    } catch (error) {
        console.log(error)
    }
}

export const profile = async () => {
    try {
        const res = await Api.get(BuyerEndpoint.buyerProfile);
        return res
    } catch (error) {
        console.log(error)
    }
}

export const editProfile = async (formData: FormData) => {
    try {
        const res = await Api.put(BuyerEndpoint.buyerEditProfile, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        return res
    } catch (error) {
        console.log(error)
    }
}

export const singlePropertyList = async (id: string) => {
    try {
        const res = await Api.get(`/buyer/singleProperty/${id}`);
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getMessages = async (conversationId: string) => {
    try {
        const res = await Api.get(`${BuyerEndpoint.buyerGetMessages}?conversationId=${conversationId}`)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const newConversation = async (sellerId: string) => {
    try {
        const res = await Api.post(`${BuyerEndpoint.buyerNewConversation}?sellerId=${sellerId}`)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const newMessage = async (message: string, conversationId: string, sellerId: string) => {
    try {
        const res = await Api.post(BuyerEndpoint.buyerNewMessage, { message, conversationId, senderId: sellerId });
        return res
    } catch (error) {
        console.log(error)
    }
}

export const newImageMessage = async (formData: FormData) => {
    try {
        const res = await Api.post(BuyerEndpoint.buyerNewImageMessage, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return res
    } catch (error) {
        console.log(error)
    }
}

export const newVideoMessage = async (formData: FormData) => {
    try {
        const res = await Api.post(BuyerEndpoint.buyerNewVideoMessage, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return res
    } catch (error) {
        console.log(error)
    }
}

export const book = async (id: string, buyerId: string, startDate: string, endDate: string) => {
    try {
        const res = await Api.post(BuyerEndpoint.buyerBook, { propertyId: id, buyerId: buyerId, startDate: startDate, endDate: endDate });
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getCheckout = async (bookingId: string) => {
    try {
        const res = await Api.get(`/book/getCheckout/${bookingId}`)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const proceedForPayment = async (booking: BookingDetails) => {
    try {
        const res = await Api.post(BuyerEndpoint.buyerProceedForPayment, { bookingDetails: booking })
        return res
    } catch (error) {
        console.log(error)
    }
}

export const saveSession = async (sessionId: string, bookingId: string) => {
    try {
        const res = await Api.post(BuyerEndpoint.buyerSaveSession, { sessionId, bookingId })
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getBooking = async (buyerId: string, page: number, limit: number) => {
    try {
        console.log('api', buyerId)
        const res = await Api.get(`${BuyerEndpoint.buyerGetBookings}?buyerId=${buyerId}&page=${page}&limit=${limit}`)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const cancelBooking = async (bookingId: string) => {
    try {
        const res = await Api.post(BuyerEndpoint.buyerCancel, { bookingId })
        return res
    } catch (error) {
        console.log(error)
    }
}

export const slotCheck = async (startDate: Date, endDate: Date, id: string) => {
    try {
        const res = await Api.post(BuyerEndpoint.buyerSlotCheck, { startDate, endDate, propertyId: id });
        return res
    } catch (error) {
        console.log(error)
    }
}

export const fetchProperties = async (searchTerm: string, sortOption: string, selectedCategory: string, page: number, limit: number) => {
    try {
        const res = await Api.get(`${BuyerEndpoint.buyerFetchProperty}?searchTerm=${searchTerm}&sortOption=${sortOption}&selectedCategory=${selectedCategory}&page=${page}&limit=${limit}`)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const rate = async (bookingId: string, rating: number, review: string, buyerId: string) => {
    try {
        const res = await Api.post(BuyerEndpoint.buyerRate, { bookingId, rating, review, buyerId })
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getRatings = async (id: string) => {
    try {
        const res = await Api.get(`${BuyerEndpoint.buyerGetRatings}?id=${id}`)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getSeller = async (sellerId: string) => {
    try {
        const res = await Api.get(`${BuyerEndpoint.getSeller}?sellerId=${sellerId}`);
        return res
    } catch (error) {
        console.log(error)
    }
}

export const findRateById = async (bookingId: string) => {
    try {
        const res = await Api.get(`${BuyerEndpoint.findRateById}?bookingId=${bookingId}`)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const editRate = async (bookingId: string, rating: number, review: string, buyerId: string) => {
    try {
        const res = await Api.post(BuyerEndpoint.editRate, { bookingId, rating, review, buyerId })
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getBookingDetails = async (bookingId: string) => {
    try {
        const res = await Api.get(`${BuyerEndpoint.getBookingDetails}?bookingId=${bookingId}`);
        return res
    } catch (error) {
        console.log(error)
    }
}