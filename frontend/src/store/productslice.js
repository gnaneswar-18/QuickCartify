import { createSlice } from "@reduxjs/toolkit";
const initialvalues={
    allcategory:[],
    allproduct:[],
}

const productslice=createSlice({
    name:'product',
    initialState:initialvalues,
    reducers:{
        setAllCategory:(state,action)=>{
            state.allcategory=[...action.payload];
        },
        setAllProduct:(state,action)=>{
            state.allproduct=[...action.payload];
        }
    }
})
export const {setAllCategory,setAllProduct } = productslice.actions
export default productslice.reducer