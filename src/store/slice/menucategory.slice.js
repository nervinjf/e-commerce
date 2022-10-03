import { createSlice } from '@reduxjs/toolkit';

export const Menucategoryslice = createSlice({
    name: 'menucategory',
    initialState: false,
    reducers: {
        menuCategories: (state, action) => {
            const menu = action.payload
            return menu
         }
    }
})

export const { menuCategories } = Menucategoryslice.actions;

export default Menucategoryslice.reducer;
