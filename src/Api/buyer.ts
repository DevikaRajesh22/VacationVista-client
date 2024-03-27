import Api from "../Service/axios";
import BuyerEndpoint from "../Service/endpoints/buyerEndpoint";

export const signup=async(name:string,email:string,password:string)=>{
    try{
        const res =await Api.post(BuyerEndpoint.buyerSignup,{name,email,password})
        console.log(res)
        return res
    }catch(error){
        console.log(error)
    }
};

export const verifyOtp=async(otp:string)=>{
    try{
        const token=localStorage.getItem('verificationToken')
        const res = await Api.post(BuyerEndpoint.buyerVerifyOtp, { otp }, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        });        
        return res
    }catch(error){
        console.log(error);
    }
};

export const otpResend=async(otp:string)=>{
    try{
        const res=await Api.post(BuyerEndpoint.buyerResendOtp,{otp})
        return res
    }catch(error){
        console.log(error)
    }
};

export const login=async(email:string,password:string)=>{
    try{
        const res=await Api.post(BuyerEndpoint.buyerLogin,{email,password})
        return res
    }catch(error){
        console.log(error)
    }
};

export const buyerLogout=async()=>{
    try{
        const res=await Api.post(BuyerEndpoint.buyerLogout)
        return res
    }catch(error){
        console.log(error)
    }
};

export const gsignup=async(name:string,email:string,password:string)=>{
    try{
        const res=await Api.post(BuyerEndpoint.buyerGsignup,{name,email,password})
        return res
    }catch(error){
        console.log(error)
    }
}

export const profile=async()=>{
    try{
        const res = await Api.get(BuyerEndpoint.buyerProfile);
        console.log('profile api',res)
        return res
    }catch(error){
        console.log(error)
    }
}
