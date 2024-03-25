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
        const res=await Api.post(BuyerEndpoint.buyerVerifyOtp,{otp})
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
