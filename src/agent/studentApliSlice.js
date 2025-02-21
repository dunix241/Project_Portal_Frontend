import { apiSlice } from './apiSlice';
import { endpointTypes } from './axios';

const studentApiBaseUrl = '/Students'
export const studentApiSlice =
  apiSlice
    .enhanceEndpoints({addTagTypes: ['Student']})
    .injectEndpoints({
      endpoints: (builder) => ({
        listStudent: builder.query({
          query: ({
            page,
            rowsPerPage,
            order,
            orderBy
          }) => ({
            url: `${studentApiBaseUrl}?${new URLSearchParams({
              pageNumber: page + 1,
              pageSize: rowsPerPage
            }).toString()}`, method: 'get'
          }),
          providesTags: (result = [], error, arg) => ['Student', ...(result?.items?.map(({id}) => ({type: 'Student', id})) || [])]
        }),
        getStudent: builder.query({
          query: ({id}) => ({
            url: `${studentApiBaseUrl}/${id}`,
            method: 'get'
          }),
          providesTags: (result, error, arg) => [{ type: 'Student', id: arg.id }],
        }),
        addStudent: builder.mutation({
          query: (payload) => ({
            url: `${studentApiBaseUrl}/${endpointTypes.cms}`,
            method: 'post',
            data: payload
          }),
          invalidatesTags: ['Student']
        }),
        updateStudent: builder.mutation({
          query: (payload) => ({
            url: `${studentApiBaseUrl}/${endpointTypes.cms}/${payload.id}`,
            method: 'put',
            data: payload
          }),
          invalidatesTags: (result, error, arg) => [{ type: 'Student', id: arg.id }]
        }),
        removeStudent: builder.mutation({
          query: (payload) => ({
            url: `${studentApiBaseUrl}/${endpointTypes.cms}/${payload.id}`,
            method: 'delete'
          }),
          invalidatesTags: ['Student']
        })
      })
    })

export const {useListStudentQuery, useLazyListStudentQuery, useGetStudentQuery, useAddStudentMutation, useUpdateStudentMutation, useRemoveStudentMutation} = studentApiSlice