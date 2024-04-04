import Api from "../Service/axios";
import BuyerEndpoint from "../Service/endpoints/buyerEndpoint";

export const signup = async (name: string, email: string, password: string) => {
    try {
        const res = await Api.post(BuyerEndpoint.buyerSignup, { name, email, password })
        const token=res.data.token
        localStorage.setItem('buyerotp', token)
        console.log(res)
        return res
    } catch (error) {
        console.log(error)
    }
};

export const verifyOtp = async (otp: string) => {
    try {
        const token = localStorage.getItem('buyerotp')
        const res = await Api.post(BuyerEndpoint.buyerVerifyOtp, { otp }, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        });
        localStorage.removeItem('buyerotp')
        return res
    } catch (error) {
        console.log(error);
    }
};

export const otpResend = async () => {
    try {
        const token = localStorage.getItem('buyerotp')
        const res = await Api.post(BuyerEndpoint.buyerResendOtp, '',{
            headers: {
                'authorization': `Bearer ${token}`,
            }
        });
        const tokens=res.data.token
        localStorage.setItem('buyerotp', tokens)
        return res
    } catch (error) {
        console.log(error)
    }
};

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
        console.log('profile api', res)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const editProfile = async (formData: FormData) => {
    try {
        const res = await Api.put(BuyerEndpoint.buyerEditProfile,formData,{
            headers:{
                'Content-Type': 'multipart/form-data',
            }
        })
        return res
    } catch (error) {
        console.log(error)
    }
}
