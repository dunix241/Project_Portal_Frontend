import { apiSlice } from './apiSlice';

const productApiBaseURL = '/Products'
export const productApiSlice =
  apiSlice
    .enhanceEndpoints({addTagTypes: ['Products']})
    .injectEndpoints({
      endpoints: (builder) => ({
        listProducts: builder.query({
          query: ({
            page,
            rowsPerPage,
            order,
            orderBy
          }) => ({
            url: `${productApiBaseURL}?${new URLSearchParams({
              pageNumber: page + 1,
              pageSize: rowsPerPage
            }).toString()}`, method: 'get'
          }),
          providesTags: ['Products']
        }),
        createProduct: builder.mutation({
          query: (payload) => ({
            url: `${productApiBaseURL}/Management`,
            method: 'post',
            data: payload
          }),
          invalidatesTags: ['Products']
        }),
        editProduct: builder.mutation({
          query: (payload) => ({
            url: `${productApiBaseURL}/Management/${payload.id}`,
            method: 'put',
            data: payload
          }),
          invalidatesTags: ['Products']
        }),
        removeProduct: builder.mutation({
          query: (payload) => ({
            url: `${productApiBaseURL}/Management/${payload.id}`,
            method: 'delete'
          }),
          invalidatesTags: ['Products']
        })
      })
    })

export const {useListProductsQuery, useLazyListProductsQuery, useCreateProductMutation, useEditProductMutation, useRemoveProductMutation} = productApiSlice