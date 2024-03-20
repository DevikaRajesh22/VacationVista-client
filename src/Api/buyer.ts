import Api from "../Service/axios";
import BuyerEndpoint from "../Service/endpoints/buyerEndpoint";

export const signup=async(name:string,email:string,password:string)=>{
    try{
        const res =await Api.post(BuyerEndpoint.buyerSignup,{name,email,password})
        return res
    }catch(error){
        console.log(error)
    }
};

export const verifyOtp=async(otp:string)=>{
    try{
        console.log('verify')
        const res=await Api.post(BuyerEndpoint.buyerVerifyOtp,{otp})
        return res
    }catch(error){
        console.log(error);
    }
};

export const otpResend=async(otp:string)=>{
    try{
        console.log('resend')
        const res=await Api.post(BuyerEndpoint.buyerResendOtp,{otp})
        return res
    }catch(error){
        console.log(error)
    }
};
