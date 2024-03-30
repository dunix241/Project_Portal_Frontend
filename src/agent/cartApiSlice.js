import { apiSlice } from './apiSlice';

const cartApiBaseURL = '/Carts'
export const orderApiSlice =
  apiSlice
    .enhanceEndpoints({addTagTypes: ['Cart']})
    .injectEndpoints({
      endpoints: (builder) => ({
        listCartDetails: builder.query({
          query: () => ({
            url: `${cartApiBaseURL}/Details`, method: 'get'
          }),
          providesTags: ['CartDetails']
        }),
        countCartDetails: builder.query({
          query: () => ({
            url: `${cartApiBaseURL}/Count`, method: 'get'
          }),
          providesTags: ['CartCount']
        }),
        addToCart: builder.mutation({
          query: (payload) => ({
            url: `${cartApiBaseURL}/Details`,
            method: 'post',
            data: payload
          }),
          invalidatesTags: ['CartDetails', 'CartCount']
        }),
        editCartDetails: builder.mutation({
          query: (payload) => ({
            url: `${cartApiBaseURL}/Details`,
            method: 'put',
            data: payload
          }),
          invalidatesTags: ['CartDetails']
        }),
        deleteCartDetails: builder.mutation({
          query: (payload) => ({
            url: `${cartApiBaseURL}/Details`,
            method: 'get',
            data: payload
          }),
          invalidatesTags: ['CartDetails', 'CartCount']
        }),
      })
    })

export const {useListOrdersQuery, useLazyListOrdersQuery, useCreateOrderMutation, useEditOrderMutation, useLazyListOrderDetailsQuery} = orderApiSlice