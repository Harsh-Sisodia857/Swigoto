import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
}

export const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            return {
                ...state,
                cart: [...state.cart, action.payload],
            };
        },
        removeFromCart: (state, action) => {
            return {
                ...state,
                cart: state.cart.filter(item => item.foodName !== action.payload.foodName),
            };
        },
     
    }
})

export const { addToCart, removeFromCart } = CartSlice.actions;
export default CartSlice.reducer;