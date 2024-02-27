import { apiSlice } from './apiSlice';

const orderApiBaseURL = '/Orders'
export const orderApiSlice =
  apiSlice
    .enhanceEndpoints({addTagTypes: ['Orders']})
    .injectEndpoints({
      endpoints: (builder) => ({
        listOrders: builder.query({
          query: () => ({
            url: `${orderApiBaseURL}/Management`, method: 'get'
          }),
          providesTags: ['Orders']
        }),
        createOrder: builder.mutation({
          query: (payload) => ({
            url: `${orderApiBaseURL}`,
            method: 'post',
            data: payload
          }),
          invalidatesTags: ['Orders']
        }),
        editOrder: builder.mutation({
          query: (payload) => ({
            url: `${orderApiBaseURL}/${payload.id}`,
            method: 'put',
            data: payload
          }),
          invalidatesTags: ['Orders']
        }),
        listOrderDetails: builder.query({
          query: (payload) => ({
            url: `${orderApiBaseURL}/${payload.id}/Details`,
            method: 'get',
            data: payload
          }),
        }),
      })
    })

export const {useListOrdersQuery, useLazyListOrdersQuery, useCreateOrderMutation, useEditOrderMutation, useLazyListOrderDetailsQuery} = orderApiSlice