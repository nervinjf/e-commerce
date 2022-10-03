import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { loading } from './loading.slice';

export const productsSlice = createSlice({
    name: "products",
    initialState: [],
    reducers: {
        setProducts: (state, action) => {
            const product = action.payload;
            return product
        }   
    }
})

export const getProductsThunk = () => dispatch =>{
    dispatch(loading(true))
    axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products`)
        .then(res => dispatch(setProducts(res.data.data.products)))
        .finally(() => dispatch(loading(false)))
}   

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
