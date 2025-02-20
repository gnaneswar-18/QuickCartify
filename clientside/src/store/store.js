import { configureStore } from '@reduxjs/toolkit'
import  userReducer  from './userslice.js'
import  productReducer  from './productslice.js'
import cartReducer from './cartslice.js'
export const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
        cart: cartReducer

    },
})