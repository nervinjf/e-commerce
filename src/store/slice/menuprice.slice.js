import { createSlice } from '@reduxjs/toolkit';

export const menuPriceslice = createSlice({
    name: 'menuPrice',
    initialState: false,
    reducers: {
        menuPrices: (state, action) => {
            const menu2 = action.payload
            return menu2
         }
    }
})

export const { menuPrices } = menuPriceslice.actions;

export default menuPriceslice.reducer;
