import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './slice/cartSlice'
import shippingSlice from './slice/shippingSlice'


export const store = configureStore({
    reducer: {
        cart : cartSlice,
        shipping : shippingSlice
    }
})