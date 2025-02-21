import { apiSlice } from './apiSlice';

const productApiBaseURL = '/Products'
export const productApiSlice =
  apiSlice
    .enhanceEndpoints({addTagTypes: ['Product']})
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
          providesTags: (result = [], error, arg) => ['Product', ...((result?.items || []).map(({id}) => ({type: 'Product', id})))]
        }),
        getProduct: builder.query({
          query: ({id}) => ({
            url: `${productApiBaseURL}/${id}`,
            method: 'get'
          }),
          providesTags: (result, error, arg) => [{ type: 'Product', id: arg }],
          transformResponse(baseQueryReturnValue, meta, arg) {
            console.log(baseQueryReturnValue);
            return baseQueryReturnValue.product
          }
        }),
        createProduct: builder.mutation({
          query: (payload) => ({
            url: `${productApiBaseURL}/Management`,
            method: 'post',
            data: payload
          }),
          invalidatesTags: ['Product']
        }),
        editProduct: builder.mutation({
          query: (payload) => ({
            url: `${productApiBaseURL}/Management/${payload.id}`,
            method: 'put',
            data: payload
          }),
          invalidatesTags: (result, error, arg) => [{ type: 'Product', id: arg.id }]
        }),
        removeProduct: builder.mutation({
          query: (payload) => ({
            url: `${productApiBaseURL}/Management/${payload.id}`,
            method: 'delete'
          }),
          invalidatesTags: ['Product']
        })
      })
    })

export const {useListProductsQuery, useGetProductQuery, useLazyListProductsQuery, useCreateProductMutation, useEditProductMutation, useRemoveProductMutation} = productApiSlice