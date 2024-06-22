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
        getEnrollment: builder.query({
          query: ({id}) => ({
            url: `${enrollmentApiBaseUrl}/${id}`,
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
        listEnrollmentMembers: builder.query({
          query: ({
            id
          }) => ({
            url: `${enrollmentApiBaseUrl}/${endpointTypes.pms}/${id}/Members`, method: 'get'
          }),
          providesTags: (result = [], error, arg) => ['EnrollmentMember', ...(result?.enrollmentMembers?.map(({id}) => ({type: 'EnrollmentMember', id})) || [])]
        }),
        addEnrollmentMember: builder.mutation({
          query: (payload) => ({
            url: `${enrollmentApiBaseUrl}/${endpointTypes.pms}/${payload.id}/Members`,
            method: 'post',
            data: payload
          }),
          invalidatesTags: ['Enrollment']
        }),
        updateEnrollmentMember: builder.mutation({
          query: (payload) => ({
            url: `${enrollmentApiBaseUrl}/${endpointTypes.pms}/Members/${payload.id}`,
            method: 'put',
            data: payload
          }),
          invalidatesTags: (result, error, arg) => {
            return [{ type: 'EnrollmentMember', id: arg.id }]
          }
        }),
        removeEnrollmentMember: builder.mutation({
          query: (payload) => ({
            url: `${enrollmentApiBaseUrl}/${endpointTypes.pms}/Members/${payload.id}`,
            method: 'delete'
          }),
          invalidatesTags: ['EnrollmentMember']
        })
      })
    })

export const {useListEnrollmentsQuery, useLazyListEnrollmentsQuery, useGetEnrollmentQuery, useAddEnrollmentMutation, useUpdateEnrollmentMutation, useRemoveEnrollmentMutation} = enrollmentApiSlice