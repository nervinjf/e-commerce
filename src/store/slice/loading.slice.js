import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

export const isloadingSlices = createSlice({
    name: 'loading',
    initialState: false,
    reducers: {
        loading: (state, action) =>{
            const isLoading = action.payload
            return isLoading
        }

    }
})

// const getLoading = () => dispatch => {

// }

export const { loading } = isloadingSlices.actions;

export default isloadingSlices.reducer;
