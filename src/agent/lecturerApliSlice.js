import { apiSlice } from './apiSlice';
import { endpointTypes } from './axios';

const lecturerApiBaseUrl = '/Lecturers'
export const lecturerApiSlice =
  apiSlice
    .enhanceEndpoints({addTagTypes: ['Lecturer']})
    .injectEndpoints({
      endpoints: (builder) => ({
        listLecturers: builder.query({
          query: ({
            page,
            rowsPerPage,
            order,
            orderBy
          }) => ({
            url: `${lecturerApiBaseUrl}?${new URLSearchParams({
              pageNumber: page + 1,
              pageSize: rowsPerPage
            }).toString()}`, method: 'get'
          }),
          providesTags: (result = [], error, arg) => ['Lecturer', ...(result?.items?.map(({id}) => ({type: 'Lecturer', id})) || [])]
        }),
        getLecturer: builder.query({
          query: ({id}) => ({
            url: `${lecturerApiBaseUrl}/${id}`,
            method: 'get'
          }),
          providesTags: (result, error, arg) => {
            return [{ type: 'Lecturer', id: arg.id }]
          },
        }),
        addLecturer: builder.mutation({
          query: (payload) => ({
            url: `${lecturerApiBaseUrl}/${endpointTypes.cms}`,
            method: 'post',
            data: payload
          }),
          invalidatesTags: ['Lecturer']
        }),
        updateLecturer: builder.mutation({
          query: (payload) => ({
            url: `${lecturerApiBaseUrl}/${endpointTypes.cms}/${payload.id}`,
            method: 'put',
            data: payload
          }),
          invalidatesTags: (result, error, arg) => {
            return [{ type: 'Lecturer', id: arg.id }]
          }
        }),
        removeLecturer: builder.mutation({
          query: (payload) => ({
            url: `${lecturerApiBaseUrl}/${endpointTypes.cms}/${payload.id}`,
            method: 'delete'
          }),
          invalidatesTags: ['Lecturer']
        })
      })
    })

export const {useListLecturersQuery, useLazyListLecturersQuery, useGetLecturerQuery, useAddLecturerMutation, useUpdateLecturerMutation, useRemoveLecturerMutation} = lecturerApiSlice