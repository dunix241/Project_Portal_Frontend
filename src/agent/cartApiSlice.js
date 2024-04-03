import { apiSlice } from './apiSlice';

const cartApiBaseURL = '/Carts'
export const cartApiSlice =
  apiSlice
    .enhanceEndpoints({addTagTypes: ['Cart', 'CartCount', 'CartDetails']})
    .injectEndpoints({
      endpoints: (builder) => ({
        listCartDetails: builder.query({
          query: ({
            page,
            rowsPerPage,
            order,
            orderBy
          }) => ({
            url: `${cartApiBaseURL}/Details?${new URLSearchParams({
              pageNumber: 1,
              pageSize: 100
            }).toString()}`,
            method: 'get'
          }),
          providesTags: ['CartDetails'],
          transformResponse(baseQueryReturnValue, meta, arg) {
            return baseQueryReturnValue.items
          }
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

export const {useLazyListCartDetailsQuery, useListCartDetailsQuery, useCountCartDetailsQuery, useAddToCartMutation, useEditCartDetailsMutation, useDeleteCartDetailsMutation} = cartApiSlice