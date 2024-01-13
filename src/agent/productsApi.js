import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery, baseUrl} from './axios';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: axiosBaseQuery({ baseUrl: `${baseUrl}/Products` }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    listProducts: builder.query({
      query: ({page, rowsPerPage, order, orderBy}) => ({url: `?${new URLSearchParams({pageNumber: page + 1, pageSize: rowsPerPage}).toString()}`, method: 'get'}),
      providesTags: ['Products']
    }),
    createProduct: builder.mutation({
      query: (payload) => ({
        url: '/Management',
        method: 'post',
        data: payload,
      }),
      invalidatesTags: ['Products']
    }),
    editProduct: builder.mutation({
      query: (payload) => ({
        url: `/Management/${payload.id}`,
        method: 'put',
        data: payload,
      }),
      invalidatesTags: ['Products']
    }),
    removeProduct: builder.mutation({
      query: (payload) => ({
        url: `/Management/${payload.id}`,
        method: 'delete',
      }),
      invalidatesTags: ['Products']
    })
  }),
})

export const {useListProductsQuery, useLazyListProductsQuery, useCreateProductMutation, useEditProductMutation, useRemoveProductMutation} = productsApi