import Api from "../Service/axios";
import sellerEndpoint from '../Service/endpoints/sellerEndpoint'

export const signup = async (name: string, email: string, password: string) => {
    try {
        console.log('signup api')
        const res = await Api.post(sellerEndpoint.sellerSignup, { name, email, password })
        const token = res.data.token
        localStorage.setItem('sellerotp', token)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const verifyOtp = async (otp: string) => {
    try {
        const token = localStorage.getItem('sellerotp')
        const res = await Api.post(sellerEndpoint.sellerVerifyOtp, { otp }, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        });
        localStorage.removeItem('sellerotp')
        return res
    } catch (error) {
        console.log(error)
    }
}

export const otpResend = async () => {
    try {
        const token = localStorage.getItem('sellerotp');
        const res = await Api.post(sellerEndpoint.sellerResendOtp, '', {
            headers: {
                'authorization': `Bearer ${token}`,
            }
        });
        const tokens = res.data.token
        localStorage.setItem('sellerotp', tokens)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const login = async (email: string, password: string) => {
    try {
        const res = await Api.post(sellerEndpoint.sellerLogin, { email, password })
        return res
    } catch (error) {
        console.log(error)
    }
}

export const profile = async () => {
    try {
        const res = await Api.get(sellerEndpoint.sellerProfile)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const sellerLogout = async () => {
    try {
        const res = await Api.post(sellerEndpoint.sellerLogout)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const createProperty = async (formData: FormData) => {
    try {
        const res = await Api.post(sellerEndpoint.sellerCreateProperty, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res;
    } catch (error) {
        console.log(error)
    }
}

export const editProperty = async (formData: FormData) => {
    try {
        for (const entry of formData.entries()) {
            const [key, value] = entry;
            console.log(key, value);
        }
        const res = await Api.post(sellerEndpoint.sellerEditProperty, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res
    } catch (error) {
        console.log(error)
    }
}

export const sellerList = async () => {
    try {
        const res = await Api.get(sellerEndpoint.sellerList)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const editSellerProfile = async (formData: FormData) => {
    try {
        const res = await Api.put(sellerEndpoint.sellerEditProfile, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getSellerConversations = async (sellerId: string) => {
    try {
        const res = await Api.get(`${sellerEndpoint.sellerGetConversations}?sellerId=${sellerId}`)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const findUserById=async(id:string)=>{
    try{
        const res=await Api.get(`${sellerEndpoint.sellerFindUserById}?buyerId=${id}`)
        return res
    }catch(error){
        console.log(error)
    }
}

export const getUser=async(userId:string)=>{
    try{
        const res=await Api.get(`${sellerEndpoint.sellerGetUser}?userId=${userId}`)
        return res
    }catch(error){
        console.log(error)
    }
}

export const getBookingbySellerId=async(sellerId:string)=>{
    try{
        const res=await Api.get(`/book/getBookingBySellerId/${sellerId}`)
        return res
    }catch(error){
        console.log(error)
    }
}