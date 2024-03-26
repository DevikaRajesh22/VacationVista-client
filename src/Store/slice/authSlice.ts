import {createSlice} from '@reduxjs/toolkit'

const initialState={
    buyerInfo: localStorage.getItem('buyerInfo') ? JSON.parse(localStorage.getItem('buyerInfo') as string) : null,
    adminInfo:localStorage.getItem('adminInfo')?JSON.parse(localStorage.getItem('adminInfo') as string):null,
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredentials:(state,action)=>{
            state.buyerInfo=action.payload
            localStorage.setItem('buyerInfo',JSON.stringify(action.payload))
        },
        logout:(state) =>{
            state.buyerInfo=null
            localStorage.removeItem('buyerInfo')
        },
        setAdminCredentials:(state,action)=>{
            state.adminInfo=action.payload
            localStorage.setItem('adminInfo',JSON.stringify(action.payload))
        },
        admLogout:(state)=>{
            state.adminInfo=null
            localStorage.removeItem('adminInfo')
        }
    }
})

export const {setCredentials,logout,setAdminCredentials,admLogout}=authSlice.actions;
export default authSlice.reducer