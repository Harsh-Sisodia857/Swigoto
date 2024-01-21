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
            state.dishes = action.payload;
            state.status = 'succeeded';
        },
        setError: (state, action) => {
            state.dishes = [];
            state.status = 'failed';
            state.error = action.payload.error;
        },
        updateFoodItem: (state, action) => {
            const updatedItem = action.payload;
            const index = state.dishes.findIndex((item) => item._id === updatedItem._id);

            if (index !== -1) {
                state.dishes[index].rating = updatedItem.rating;
                state.dishes[index].price = updatedItem.price;
            }
        }
    },
});

export const { setFoodItems, setError, updateFoodItem } = foodItemSlice.actions;
export default foodItemSlice.reducer;

export const loadFoodItems = (queryParams) => async (dispatch) => {
    try {
        console.log("Query Param : ", queryParams);
        const queryString = new URLSearchParams(queryParams).toString();
        console.log("Query String : ", queryString);
        const response = await fetch(`http://localhost:4000/api/dishes/?${queryString}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();

        return data;
    } catch (error) {
        // If an error occurs, dispatch the setError action
        dispatch(setError({ error: error.message }));
    }
};


export const setFoodItemAfterDeletion = (id) => async (dispatch, getState) => {
    const { dishes } = getState().foodItem;
    const filteredFoodItem = dishes.filter((item) => item._id !== id);
    dispatch(setFoodItems(filteredFoodItem));
};
