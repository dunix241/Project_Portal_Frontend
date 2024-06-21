import { apiSlice } from './apiSlice';
import { endpointTypes } from './axios';

const semesterApiBaseUrl = '/Semesters'
export const semesterApiSlice =
  apiSlice
    .enhanceEndpoints({addTagTypes: ['Semester']})
    .injectEndpoints({
      endpoints: (builder) => ({
        listSemesters: builder.query({
          query: ({
            page,
            rowsPerPage,
            order,
            orderBy
          }) => ({
            url: `${semesterApiBaseUrl}/${endpointTypes.pms}?${new URLSearchParams({
              pageNumber: page + 1,
              pageSize: rowsPerPage
            }).toString()}`, method: 'get'
          }),
          providesTags: (result = [], error, arg) => ['Semester', ...(result?.items?.map(({id}) => ({type: 'Semester', id})) || [])]
        }),
        getSemester: builder.query({
          query: ({id}) => ({
            url: `${semesterApiBaseUrl}/${id}`,
            method: 'get'
          }),
          providesTags: (result, error, arg) => {
            return [{ type: 'Semester', id: arg.id }]
          },
        }),
        addSemester: builder.mutation({
          query: (payload) => ({
            url: `${semesterApiBaseUrl}/${endpointTypes.cms}`,
            method: 'post',
            data: payload
          }),
          invalidatesTags: ['Semester']
        }),
        updateSemester: builder.mutation({
          query: (payload) => ({
            url: `${semesterApiBaseUrl}/${endpointTypes.cms}/${payload.id}`,
            method: 'put',
            data: payload
          }),
          invalidatesTags: (result, error, arg) => {
            return [{ type: 'Semester', id: arg.id }]
          }
        }),
        removeSemester: builder.mutation({
          query: (payload) => ({
            url: `${semesterApiBaseUrl}/${endpointTypes.cms}/${payload.id}`,
            method: 'delete'
          }),
          invalidatesTags: ['Semester']
        })
      })
    })

export const {useListSemestersQuery, useLazyListSemestersQuery, useGetSemesterQuery, useAddSemesterMutation, useUpdateSemesterMutation, useRemoveSemesterMutation} = semesterApiSlice