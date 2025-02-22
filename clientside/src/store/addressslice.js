import {createSlice} from '@reduxjs/toolkit'

const intialvalues = {
    addresslist:[]
}
const addressslice = createSlice({
    name: 'address',
    initialState:intialvalues,
    reducers: {
        setAddressList: (state, action) => {
            state.addresslist = [...action.payload];
        }
    }
})

export const { setAddressList } = addressslice.actions;
export default addressslice.reducer;