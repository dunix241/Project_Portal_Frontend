import { apiSlice } from './apiSlice';
import { endpointTypes } from './axios';

const enrollmentApiBaseUrl = '/Enrollments'
export const enrollmentApiSlice =
  apiSlice
    .enhanceEndpoints({addTagTypes: ['Enrollment']})
    .injectEndpoints({
      endpoints: (builder) => ({
        listEnrollments: builder.query({
          query: ({
            page,
            rowsPerPage,
            order,
            orderBy
          }) => ({
            url: `${enrollmentApiBaseUrl}/${endpointTypes.pms}?${new URLSearchParams({
              pageNumber: page + 1,
              pageSize: rowsPerPage
            }).toString()}`, method: 'get'
          }),
          providesTags: (result = [], error, arg) => ['Enrollment', ...(result?.items?.map(({id}) => ({type: 'Enrollment', id})) || [])]
        }),
        getEnrollmentHistory: builder.query({
          query: ({
            enrollmentId
          }) => ({
            url: `${enrollmentApiBaseUrl}/${endpointTypes.pms}/History?enrollmentId=${enrollmentId}`, method: 'get'
          }),
          providesTags: (result = [], error, arg) => ['EnrollmentHistory']
        }),
        getEnrollment: builder.query({
          query: ({id}) => ({
            url: `${enrollmentApiBaseUrl}/pms/${id}`,
            method: 'get'
          }),
          providesTags: (result, error, arg) => {
            return [{ type: 'Enrollment', id: arg.id }]
          },
        }),
        addEnrollment: builder.mutation({
          query: (payload) => ({
            url: `${enrollmentApiBaseUrl}/${endpointTypes.pms}`,
            method: 'post',
            data: payload
          }),
          invalidatesTags: ['Enrollment']
        }),
        updateEnrollment: builder.mutation({
          query: (payload) => ({
            url: `${enrollmentApiBaseUrl}/${endpointTypes.pms}/${payload.id}`,
            method: 'put',
            data: payload
          }),
          invalidatesTags: (result, error, arg) => {
            return [{ type: 'Enrollment', id: arg.id }]
          }
        }),
      })
    })

export const {useListEnrollmentsQuery, useLazyListEnrollmentsQuery, useGetEnrollmentHistoryQuery, useGetEnrollmentQuery, useAddEnrollmentMutation, useUpdateEnrollmentMutation, useRemoveEnrollmentMutation} = enrollmentApiSlice