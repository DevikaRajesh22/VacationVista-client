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
            console.log('cre')
            state.adminInfo=action.payload
            console.log(state.adminInfo)
            localStorage.setItem('adminInfo',JSON.stringify(action.payload))
        },
        admLogout:(state)=>{
            console.log('log cre')
            state.adminInfo=null
            console.log(state.adminInfo)
            localStorage.removeItem('adminInfo')
        }
    }
})

export const {setCredentials,logout,setAdminCredentials,admLogout}=authSlice.actions;
export default authSlice.reducer