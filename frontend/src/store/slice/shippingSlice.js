import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shipping: JSON.parse(localStorage.getItem("shipping")) || [],
};

export const ShippingSlice = createSlice({
    name: "shipping",
    initialState,
    reducers: {
        saveShippingInfo: (state, action) => {
            const shippingInfo = action.payload;
            localStorage.setItem("shipping", JSON.stringify([...state.shipping, shippingInfo]));

            return {
                ...state,
                shipping: [...state.shipping, shippingInfo],
            };
        },
    },
});

export const { saveShippingInfo } = ShippingSlice.actions;
export default ShippingSlice.reducer;
