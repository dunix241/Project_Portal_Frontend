import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './index';

const initialState = {
  products: [],
}

const slice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, {payload})=>{
      state.products = [...state.products, ...payload.filter(product => !state.products.includes(product))];
}
  }})

export const { addProduct } = slice.actions

export default slice.reducer
