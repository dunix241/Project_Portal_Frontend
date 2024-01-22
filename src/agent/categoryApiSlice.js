import { apiSlice } from './apiSlice';

const categoryApiBaseURL = '/Categories'
export const categoryApiSlice =
  apiSlice
    .enhanceEndpoints({addTagTypes: ['Categories']})
    .injectEndpoints({
      endpoints: (builder) => ({
        listCategories: builder.query({
          query: () => ({
            url: `${categoryApiBaseURL}`, method: 'get'
          }),
          providesTags: ['Categories']
        }),
        createCategory: builder.mutation({
          query: (payload) => ({
            url: `${categoryApiBaseURL}/Management`,
            method: 'post',
            data: payload
          }),
          invalidatesTags: ['Categories']
        }),
        editCategory: builder.mutation({
          query: (payload) => ({
            url: `${categoryApiBaseURL}/Management/${payload.id}`,
            method: 'put',
            data: payload
          }),
          invalidatesTags: ['Categories']
        }),
        removeCategory: builder.mutation({
          query: (payload) => ({
            url: `${categoryApiBaseURL}/Management/${payload.id}`,
            method: 'delete'
          }),
          invalidatesTags: ['Categories']
        })
      })
    })

export const {useListCategoriesQuery, useLazyListCategoriesQuery, useCreateCategoryMutation, useEditCategoryMutation, useRemoveCategoryMutation} = categoryApiSlice