import { apiSlice } from './apiSlice';
import { endpointTypes } from './axios';

const enrollmentPlanApiBaseUrl = '/EnrollmentPlans'
export const enrollmentPlanApiSlice =
  apiSlice
    .enhanceEndpoints({addTagTypes: ['EnrollmentPlan']})
    .injectEndpoints({
      endpoints: (builder) => ({
        listEnrollmentPlans: builder.query({
          query: ({
            page,
            rowsPerPage,
            order,
            orderBy
          }) => ({
            url: `${enrollmentPlanApiBaseUrl}/${endpointTypes.pms}?${new URLSearchParams({
              pageNumber: page + 1,
              pageSize: rowsPerPage
            }).toString()}`, method: 'get'
          }),
          providesTags: (result = [], error, arg) => ['EnrollmentPlan', ...(result?.items?.map(({id}) => ({type: 'EnrollmentPlan', id})) || [])]
        }),
        getEnrollmentPlan: builder.query({
          query: ({id}) => ({
            url: `${enrollmentPlanApiBaseUrl}/${id}`,
            method: 'get'
          }),
          providesTags: (result, error, arg) => {
            return [{ type: 'EnrollmentPlan', id: arg.id }]
          },
        }),
        addEnrollmentPlan: builder.mutation({
          query: (payload) => ({
            url: `${enrollmentPlanApiBaseUrl}/${endpointTypes.cms}`,
            method: 'post',
            data: payload
          }),
          invalidatesTags: ['EnrollmentPlan']
        }),
        updateEnrollmentPlan: builder.mutation({
          query: (payload) => ({
            url: `${enrollmentPlanApiBaseUrl}/${endpointTypes.cms}/${payload.id}`,
            method: 'put',
            data: payload
          }),
          invalidatesTags: (result, error, arg) => {
            return [{ type: 'EnrollmentPlan', id: arg.id }]
          }
        }),
        removeEnrollmentPlan: builder.mutation({
          query: (payload) => ({
            url: `${enrollmentPlanApiBaseUrl}/${endpointTypes.cms}/${payload.id}`,
            method: 'delete'
          }),
          invalidatesTags: ['EnrollmentPlan']
        })
      })
    })

export const {useListEnrollmentPlansQuery, useLazyListEnrollmentPlansQuery, useGetEnrollmentPlanQuery, useAddEnrollmentPlanMutation, useUpdateEnrollmentPlanMutation, useRemoveEnrollmentPlanMutation} = enrollmentPlanApiSlice