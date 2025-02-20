import { createSlice } from "@reduxjs/toolkit";
const initialvalues={
    cartitems:[]
}

const cartslice=createSlice({
    name:'cart',
    initialState:initialvalues,
    reducers:{
       setcartitems:(state,action)=>{
        state.cartitems=[...action.payload];
       }
    }
})
export const { setcartitems} = cartslice.actions
export default cartslice.reducer