import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './slice/cartSlice'
import shippingSlice from './slice/shippingSlice'
import searchQueryReducer from './slice/searchQuerySlice';
import userSlice from './slice/userSlice';


export const store = configureStore({
    reducer: {
        cart: cartSlice,
        searchQuery: searchQueryReducer,
        shipping: shippingSlice,
        user : userSlice
    }
})