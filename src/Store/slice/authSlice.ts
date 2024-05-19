import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    buyerInfo: localStorage.getItem('buyerInfo') ? JSON.parse(localStorage.getItem('buyerInfo') as string) : null,
    adminInfo: localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo') as string) : null,
    sellerInfo: localStorage.getItem('sellerInfo') ? JSON.parse(localStorage.getItem('buyerInfo') as string) : null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.buyerInfo = action.payload
            localStorage.setItem('buyerInfo', JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.buyerInfo = null
            localStorage.removeItem('buyerInfo')
        },
        setAdminCredentials: (state, action) => {
            state.adminInfo = action.payload
            localStorage.setItem('adminInfo', JSON.stringify(action.payload))
        },
        admLogout: (state) => {
            state.adminInfo = null
            localStorage.removeItem('adminInfo')
        },
        setSellerCredentials: (state, action) => {
            state.sellerInfo = action.payload
            localStorage.setItem('sellerInfo', JSON.stringify(action.payload))
        },
        sellLogout: (state) => {
            state.sellerInfo = null
            localStorage.removeItem('sellerInfo')
        }
    }
})

export const { setCredentials, logout, setAdminCredentials, admLogout, setSellerCredentials, sellLogout } = authSlice.actions;
export default authSlice.reducer