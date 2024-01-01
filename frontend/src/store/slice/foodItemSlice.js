import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dishes: [],
    status: 'loading',
    error: null,
};

export const foodItemSlice = createSlice({
    name: 'foodItem',
    initialState,
    reducers: {
        setFoodItems: (state, action) => {
            console.log(action.payload);
            state.dishes = action.payload;
            console.log(state.dishes);
            state.status = 'succeeded';
        },
        setError: (state, action) => {
            state.dishes = [];
            state.status = 'failed';
            state.error = action.payload.error;
        },
    },
});

export const { setFoodItems, setError } = foodItemSlice.actions;
export default foodItemSlice.reducer;

export const loadFoodItems = () => async (queryParams) => {
    try {
        const queryString = new URLSearchParams(queryParams).toString();
        const response = await fetch(`http://localhost:4000/api/dishes/?${queryString}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const setFoodItemAfterDeletion = (id) => async (dispatch, getState) => {
    const { dishes } = getState().foodItem;
    console.log(dishes)
    const filteredFoodItem = dishes.filter((item) => item._id !== id);
    dispatch(setFoodItems(filteredFoodItem));
};
