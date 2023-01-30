import { createSlice } from '@reduxjs/toolkit';
import getConfig from '../../utils/getConfig';
import { loading } from './loading.slice';
import axios from 'axios';

export const purchasesSlice = createSlice({
    name: 'purchases',
    initialState: [],
    reducers: {
        setpurchases: (state, action) => {
            return action.payload
        }
    }
})


export const getPurchasesThunk = () => dispatch => {
    dispatch(loading(true));
        axios.get('https://e-commerce-api.academlo.tech/api/v1/purchases', getConfig())
        .then(res => dispatch(setpurchases(res.data.data.purchases)))
        .finally(() => dispatch(loading(false)));
}

export const { setpurchases } = purchasesSlice.actions;

export default purchasesSlice.reducer;
