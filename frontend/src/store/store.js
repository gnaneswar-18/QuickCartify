import { configureStore } from '@reduxjs/toolkit'
import  userReducer  from './userslice.js'
import  productReducer  from './productslice.js'
export const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer
    },
})