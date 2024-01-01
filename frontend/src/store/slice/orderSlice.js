import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    order: [],
    status : "loading",
    error: null,
};


export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setOrder: (state, action) => {
            state.order = action.payload;
            state.status = "succeeded";
            state.error = null;
        },
        setError: (state, action) => {
            state.order = [];
            state.status = "failed";
            state.error = action.payload;
        },
    }
});

export const { setOrder, setError } = orderSlice.actions;

export default orderSlice.reducer;

export const fetchOrder = () => async (dispatch) => {
    try {
        const response = await fetch("http://localhost:4000/api/order/orderData", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const { orderData } = await response.json();
        const orders = {
            orderData,
        };
        console.log(orders);
        dispatch(setOrder(orders));
    } catch (error) {
        console.error("Error fetching orders:", error);
        dispatch(setError(error));
    }
};