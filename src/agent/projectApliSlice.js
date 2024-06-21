import { apiSlice } from './apiSlice';
import { endpointTypes } from './axios';

const projectApiBaseUrl = '/Projects'
export const projectApiSlice =
  apiSlice
    .enhanceEndpoints({addTagTypes: ['Project']})
    .injectEndpoints({
      endpoints: (builder) => ({
        listProjects: builder.query({
          query: ({
            page,
            rowsPerPage,
            order,
            orderBy
          }) => ({
            url: `${projectApiBaseUrl}/${endpointTypes.pms}?${new URLSearchParams({
              pageNumber: page + 1,
              pageSize: rowsPerPage
            }).toString()}`, method: 'get'
          }),
          providesTags: (result = [], error, arg) => ['Project', ...(result?.items?.map(({id}) => ({type: 'Project', id})) || [])]
        }),
        getProject: builder.query({
          query: ({id}) => ({
            url: `${projectApiBaseUrl}/${id}`,
            method: 'get'
          }),
          providesTags: (result, error, arg) => {
            return [{ type: 'Project', id: arg.id }]
          },
        }),
        addProject: builder.mutation({
          query: (payload) => ({
            url: `${projectApiBaseUrl}/${endpointTypes.cms}`,
            method: 'post',
            data: payload
          }),
          invalidatesTags: ['Project']
        }),
        updateProject: builder.mutation({
          query: (payload) => ({
            url: `${projectApiBaseUrl}/${endpointTypes.cms}/${payload.id}`,
            method: 'put',
            data: payload
          }),
          invalidatesTags: (result, error, arg) => {
            return [{ type: 'Project', id: arg.id }]
          }
        }),
        removeProject: builder.mutation({
          query: (payload) => ({
            url: `${projectApiBaseUrl}/${endpointTypes.cms}/${payload.id}`,
            method: 'delete'
          }),
          invalidatesTags: ['Project']
        })
      })
    })

export const {useListProjectsQuery, useLazyListProjectsQuery, useGetProjectQuery, useAddProjectMutation, useUpdateProjectMutation, useRemoveProjectMutation} = projectApiSlice