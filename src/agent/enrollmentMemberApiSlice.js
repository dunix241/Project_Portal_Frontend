import { apiSlice } from './apiSlice';
import { endpointTypes } from './axios';

const enrollmentApiBaseUrl = '/Enrollments'
export const enrollmentMemberApiSlice =
  apiSlice
    .enhanceEndpoints({addTagTypes: ['EnrollmentMember']})
    .injectEndpoints({
      endpoints: (builder) => ({
        listEnrollmentMembers: builder.query({
          query: ({
            enrollmentId
          }) => ({
            url: `${enrollmentApiBaseUrl}/${endpointTypes.pms}/${enrollmentId}/Members`, method: 'get'
          }),
          providesTags: (result = [], error, arg) => ['EnrollmentMember', ...(result?.enrollmentMembers?.map(({id}) => ({type: 'EnrollmentMember', id})) || [])]
        }),
        addEnrollmentMember: builder.mutation({
          query: (payload) => ({
            url: `${enrollmentApiBaseUrl}/${endpointTypes.pms}/${payload.id}/Members?email=${payload.email}`,
            method: 'post',
            data: payload
          }),
          invalidatesTags: ['EnrollmentMember']
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

export const {useListEnrollmentMembersQuery, useLazyListEnrollmentMembersQuery, useAddEnrollmentMemberMutation, useUpdateEnrollmentMemberMutation, useRemoveEnrollmentMemberMutation} = enrollmentMemberApiSlice