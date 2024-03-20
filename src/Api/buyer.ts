import Api from "../Service/axios";
import BuyerRoutes from "../Service/endpoints/buyerEndpoint";

export const signup=async(name:string,email:string,password:string)=>{
    try{
        const res =await Api.post(BuyerRoutes.buyerSignup,{name,email,password})
        return res
    }catch(error){
        console.log(error)
    }
};

export const verifyOtp=async(otp:string)=>{
    try{
        const res=await Api.post(BuyerRoutes.buyerVerifyOtp,{otp})
        return res
    }catch(error){
        console.log(error);
    }
}