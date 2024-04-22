const buyerRoutes={
    buyerSignup:'/buyer/verifyMail',
    buyerForgotPassword:'/buyer/forgotPassword',
    buyerVerifyOtp:'/buyer/verifyOtp',
    buyerVerifyOtpForgotPassword:'/buyer/verifyOtpForgotPassword',
    buyerResendOtp:'/buyer/resendOtp',
    buyerResetPassword:'/buyer/resetPassword',
    buyerLogin:'/buyer/login',
    buyerLogout:'/buyer/logout',
    buyerGsignup:'/buyer/gsignup',
    buyerProfile:'/buyer/profile',
    buyerEditProfile:'/buyer/editprofile',
    buyerNewConversation:'/chat/newConversation',
    buyerGetMessages:'/chat/getMessages',
    buyerNewMessage:'/chat/newMessage',
    buyerBook:'/book/newBooking',
    buyerGetCheckout:'/book/getCheckout',
    buyerProceedForPayment:'/book/proceedForPayment',
    buyerSaveSession:'/book/saveSession',
}

export default buyerRoutes;