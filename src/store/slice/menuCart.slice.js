import { createSlice } from '@reduxjs/toolkit';

export const menuCartSlice = createSlice({
    name: 'menuCart',
    initialState: false,
    reducers: {
        menuCart: (state, action) => {
           const menu = action.payload
           return menu
        }
    }
})

export const { menuCart } = menuCartSlice.actions;

export default menuCartSlice.reducer;
