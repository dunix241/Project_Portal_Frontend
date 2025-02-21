import { apiSlice } from './apiSlice';
import { endpointTypes } from './axios';

const schoolApiBaseUrl = '/Schools'
export const schoolApiSlice =
  apiSlice
    .enhanceEndpoints({addTagTypes: ['School']})
    .injectEndpoints({
      endpoints: (builder) => ({
        listSchools: builder.query({
          query: ({
            page,
            rowsPerPage,
            order,
            orderBy
          }) => ({
            url: `${schoolApiBaseUrl}?${new URLSearchParams({
              pageNumber: page + 1,
              pageSize: rowsPerPage
            }).toString()}`, method: 'get'
          }),
          providesTags: (result = [], error, arg) => ['School', ...(result?.items?.map(({id}) => ({type: 'School', id})) || [])]
        }),
        getSchool: builder.query({
          query: ({id}) => ({
            url: `${schoolApiBaseUrl}/${id}`,
            method: 'get'
          }),
          providesTags: (result, error, arg) => [{ type: 'School', id: arg.id }],
        }),
        addSchool: builder.mutation({
          query: (payload) => ({
            url: `${schoolApiBaseUrl}/${endpointTypes.cms}`,
            method: 'post',
            data: payload
          }),
          invalidatesTags: ['School']
        }),
        updateSchool: builder.mutation({
          query: (payload) => ({
            url: `${schoolApiBaseUrl}/${endpointTypes.cms}/${payload.id}`,
            method: 'put',
            data: payload
          }),
          invalidatesTags: (result, error, arg) => [{ type: 'School', id: arg.id }]
        }),
        removeSchool: builder.mutation({
          query: (payload) => {
            return ({
              url: `${schoolApiBaseUrl}/${endpointTypes.cms}/${payload.id}`,
              method: 'delete'
            })
          },
          invalidatesTags: ['School']
        })
      })
    })

export const {useListSchoolsQuery, useLazyListSchoolsQuery, useGetSchoolQuery, useLazyGetSchoolQuery, useAddSchoolMutation, useUpdateSchoolMutation, useRemoveSchoolMutation} = schoolApiSlice