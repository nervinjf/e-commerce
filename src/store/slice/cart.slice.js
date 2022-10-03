import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { setProducts } from './products.slice';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        getCart: (state, action) => {
            state.push(action.payload)
        },
        deleteItems: (state, action) => {
            const id = action.payload
            const filterItemsCart = state.filter(productc => productc.id !== Number(id))
            return filterItemsCart
        }

    }
})

export const { getCart, deleteItems } = cartSlice.actions;

export default cartSlice.reducer;
