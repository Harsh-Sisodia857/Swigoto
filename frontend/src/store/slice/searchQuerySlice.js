import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchQuery: '',
    filterQuery : ''
}

const searchQuerySlice = createSlice({
    name: 'searchQuery',
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setFilterQuery: (state, action) => {
            state.filterQuery = action.payload;
        }
    }
});

export const { setSearchQuery, setFilterQuery } = searchQuerySlice.actions;
export default searchQuerySlice.reducer;
