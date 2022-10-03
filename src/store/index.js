import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './slice/cart.slice'
import isloadingSlice from './slice/loading.slice'
import menuCartSlice from './slice/menuCart.slice'
import menucategorySlice from './slice/menucategory.slice'
import  menuCategories  from './slice/menucategory.slice'
import   menuPriceslice from './slice/menuprice.slice'
import productsSlice from './slice/products.slice'
import quantifySlice from './slice/quantify.slice'

export default configureStore({
    reducer: {
        loading: isloadingSlice,
        products: productsSlice,
        cart: cartSlice,
        number: quantifySlice,
        menu: menuCartSlice,
        menuprice: menuPriceslice,
        menucategory: menucategorySlice
    }
})
