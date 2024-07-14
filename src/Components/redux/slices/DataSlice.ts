// counterSlice.js
import {createSlice} from '@reduxjs/toolkit';

export const DataSlice = createSlice({
  name: 'data',
  initialState: {
    user: [],
    Cart: [],
  },
  reducers: {
    updateData: (state, action) => {
      state.user = action.payload;
    },
    updateCart: (state, action) => {
      state.Cart = action.payload;
    },
  },
});

export const {updateData,updateCart} = DataSlice.actions;

export const selectData = state => state.data.user;
export const selectCart = state => state.data.Cart;

export default DataSlice.reducer;
