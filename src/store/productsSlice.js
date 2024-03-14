import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './index';

const initialState = {
  products: [],
}

const slice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, { payload }) => {
      state.products = [...state.products, ...payload.filter(product => !state.products.includes(product))];
    },
    setPagingParams: (state, {payload}) => {
      console.log(payload)
      if (payload.pageSize) state.pagingParams.pageSize = payload.pageSize;
      if (payload.pageNumber) state.pagingParams.pageNumber = payload.pageNumber;
      if (payload.order) state.pagingParams.order = payload.order;
      if (payload.orderBy) state.pagingParams.orderBy = payload.orderBy;
      state.pagingParams.searchString = payload.searchString;
    },
    resetProducts: (state) => {
      state.products = [];
    },
    setSelectedVariations: (state, {payload: {variation, variationOption}}) => {
      // console.log(action.payload)
      // console.log(variation, variationOption)
      let filtered = state.selectedVariations.filter(option => !variation.variationOptions.map(opt => opt.id).includes(option.id));
      if (variationOption) {
        filtered = [...filtered, variationOption];
      }
      state.selectedVariations = [...filtered];
    },
    setQuantity(state, {payload}) {
      const {quantity, product} = state;

      const finalQuantity = quantity + payload;
      if (finalQuantity <= product.quantity && finalQuantity >= 0) {
        state.quantity = finalQuantity;
      }
    },
    setCurrentImage(state, {payload}) {
      state.currentImage = payload;
    },
    slideImageRoll(state, {payload}) {
      const {imageRoll, images} = state.product;
      if (imageRoll[0].id + payload >= 0 && imageRoll[imageRoll.length - 1].id + payload < images.length) {
        state.product.imageRoll = imageRoll.map(img => {
          return {
            id: img.id + payload,
            img: images[img.id + payload],
          }
        });
      }
    }
  }})

export const { addProduct } = slice.actions

export const { setPagingParams } = slice.actions

export default slice.reducer
