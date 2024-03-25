import {createSlice} from '@reduxjs/toolkit'

const initialState={
    buyerInfo: localStorage.getItem('buyerInfo') ? JSON.parse(localStorage.getItem('buyerInfo') as string) : null,
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
    }
})

export const {setCredentials,logout}=authSlice.actions;
export default authSlice.reducer