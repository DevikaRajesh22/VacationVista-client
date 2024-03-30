import Api from "../Service/axios";
import AdminEndpoint from '../Service/endpoints/adminEndpoint'
import adminRoute from '../Service/endpoints/adminEndpoint';

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

export const users=async()=>{
    try{
        const res=await Api.get(AdminEndpoint.adminUser)
        return res
    }catch(error){
        console.log(error)
    }
}

export const blockUser=async(id:string)=>{
    try{
        console.log('block user api')
        const res=await Api.post(`${adminRoute.blockUser}/${id}`)
        return res
    }catch(error){
        console.log(error)
    }
}