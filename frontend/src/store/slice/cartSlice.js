import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: JSON.parse(localStorage.getItem("cart")) || [],
};

export const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const updatedCart = [...state.cart, action.payload];
            localStorage.setItem("cart", JSON.stringify(updatedCart));

            return {
                ...state,
                cart: updatedCart,
            };
        },
        removeFromCart: (state, action) => {
            const updatedCart = state.cart.filter(
                (item) => item.id !== action.payload.id
            );
            localStorage.setItem("cart", JSON.stringify(updatedCart));

            return {
                ...state,
                cart: updatedCart,
            };
        },
    },
});

export const { addToCart, removeFromCart } = CartSlice.actions;
export default CartSlice.reducer;
