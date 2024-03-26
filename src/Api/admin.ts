import Api from "../Service/axios";
import AdminEndpoint from '../Service/endpoints/adminEndpoint'

export const login=async(email:string,password:string)=>{
    try{
        const res=await Api.post(AdminEndpoint.adminLogin,{email,password})
        return res
    }catch(error){
        console.log(error)
    }
};

export const adminLogout=async()=>{
    try{
        const res=await Api.post(AdminEndpoint.adminLogout)
        return res
    }catch(error){
        console.log(error)
    }
}