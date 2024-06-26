const buyerRoutes = {
    buyerSignup: '/buyer/verifyMail',
    buyerForgotPassword: '/buyer/forgotPassword',
    buyerVerifyOtp: '/buyer/verifyOtp',
    buyerVerifyOtpForgotPassword: '/buyer/verifyOtpForgotPassword',
    buyerResendOtp: '/buyer/resendOtp',
    buyerResetPassword: '/buyer/resetPassword',
    buyerLogin: '/buyer/login',
    buyerLogout: '/buyer/logout',
    buyerGsignup: '/buyer/gsignup',
    buyerProfile: '/buyer/profile',
    buyerEditProfile: '/buyer/editprofile',
    buyerNewConversation: '/chat/newConversation',
    buyerGetMessages: '/chat/getMessages',
    buyerNewMessage: '/chat/newMessage',
    buyerNewImageMessage: '/chat/newImageMessage',
    buyerNewVideoMessage: '/chat/newVideoMessage',
    buyerBook: '/book/newBooking',
    buyerGetCheckout: '/book/getCheckout',
    buyerProceedForPayment: '/book/proceedForPayment',
    buyerSaveSession: '/book/saveSession',
    buyerGetBookings: '/book/getBookings',
    buyerCancel: '/book/cancelBooking',
    buyerSlotCheck: '/book/slotCheck',
    buyerFetchProperty: '/buyer/fetchProperty',
    buyerRate: '/buyer/rate',
    buyerRateExist: '/buyer/rateExist',
    buyerGetRatings: '/buyer/getRatings',
    getSeller: '/buyer/getSeller',
    findRateById: '/buyer/findRateById',
    editRate: '/buyer/editRate',
    getBookingDetails: '/buyer/getBookingDetails',
    findBuyer: '/buyer/findBuyer',
}

export default buyerRoutes;