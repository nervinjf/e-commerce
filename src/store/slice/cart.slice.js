import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { setProducts } from './products.slice';
import axios from 'axios';
import { loading } from './loading.slice';
import getConfig from '../../utils/getConfig';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            const cart = action.payload;
            return cart
        },

        deleteItems: (state, action) => {
            const id = action.payload
            const filterItemsCart = state.filter(productc => productc.id !== Number(id))
            return filterItemsCart
        }

    }
})

export const getCartThunk = () => (dispatch) => {
    dispatch(loading(true));
    axios.get('https://e-commerce-api.academlo.tech/api/v1/cart', getConfig())
        .then(res => dispatch(setCart(res.data.data.cart.products)))
        .finally(() => dispatch(loading(false)));
}

export const addCartThunk = (cart) => (dispatch) => {
    dispatch(loading(true));
    axios.post(`https://e-commerce-api.academlo.tech/api/v1/cart`, cart, getConfig())
        .then(() => dispatch(getCartThunk()))
        .finally(() => dispatch(loading(false)));
}

export const purchasesCartThunk = () => (dispatch) => {
    dispatch(loading(true));
    axios.post(`https://e-commerce-api.academlo.tech/api/v1/purchases`, {}, getConfig())
        .then(() => dispatch(setCart([])))
        .finally(() => dispatch(loading(false)));
}

export const { setCart, deleteItems } = cartSlice.actions;

export default cartSlice.reducer;
