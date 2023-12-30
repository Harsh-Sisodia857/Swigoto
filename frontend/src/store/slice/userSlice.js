import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || {}

}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const userInfo = action.payload;
            state.user = userInfo;
            localStorage.setItem('user', JSON.stringify(userInfo));
        }
    }
})

export const { setUser } = userSlice.actions;
export default userSlice.reducer;