import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './slice/cart.slice'
import isloadingSlice from './slice/loading.slice'
import menucategorySlice from './slice/menucategory.slice'
import menuPriceslice from './slice/menuprice.slice'
import productsSlice from './slice/products.slice'
import purchasesSlice from './slice/purchases.slice'
import quantifySlice from './slice/quantify.slice'

export default configureStore({
    reducer: {
        loading: isloadingSlice,
        products: productsSlice,
        cart: cartSlice,
        number: quantifySlice,
        menuprice: menuPriceslice,
        menucategory: menucategorySlice,
        purchases: purchasesSlice
    }
})
