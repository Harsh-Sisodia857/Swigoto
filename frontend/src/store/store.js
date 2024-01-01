import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './slice/cartSlice'
import shippingSlice from './slice/shippingSlice'
import searchQueryReducer from './slice/searchQuerySlice';
import userSlice from './slice/userSlice';
import orderSlice from './slice/orderSlice';
import {thunk} from 'redux-thunk';
import foodItemSlice from './slice/foodItemSlice';

export const store = configureStore({
    reducer: {
        cart: cartSlice,
        searchQuery: searchQueryReducer,
        shipping: shippingSlice,
        user: userSlice,
        order: orderSlice,
        foodItem : foodItemSlice
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), thunk]
})