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

export const login=async(email:string,password:string)=>{
    try{
        const res=await Api.post(sellerEndpoint.sellerLogin,{email,password})
        return res
    }catch(error){
        console.log(error)
    }
}

export const profile=async()=>{
    try{
        const res=await Api.get(sellerEndpoint.sellerProfile)
        return res
    }catch(error){
        console.log(error)
    }
}

export const sellerLogout=async()=>{
    try{
        const res=await Api.post(sellerEndpoint.sellerLogout)
        return res
    }catch(error){
        console.log(error)
    }
}