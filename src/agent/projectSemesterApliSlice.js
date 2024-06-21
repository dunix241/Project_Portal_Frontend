import { apiSlice } from './apiSlice';
import { endpointTypes } from './axios';

const ProjectSemesterApiBaseUrl = '/Semesters'
export const ProjectSemesterApiSlice =
  apiSlice
    .enhanceEndpoints({addTagTypes: ['ProjectSemester']})
    .injectEndpoints({
      endpoints: (builder) => ({
        listProjectSemesters: builder.query({
          query: ({
            page,
            rowsPerPage,
            order,
            orderBy,
            semesterId
          }) => ({
            url: `${ProjectSemesterApiBaseUrl}/${endpointTypes.pms}/${semesterId}/Projects?${new URLSearchParams({
              pageNumber: page + 1,
              pageSize: rowsPerPage
            }).toString()}`, method: 'get'
          }),
          providesTags: (result = [], error, arg) => ['ProjectSemester', ...(result?.items?.map(({projectId, semesterId}) => ({type: 'ProjectSemester', projectId, semesterId})) || [])]
        }),
        addProjectSemester: builder.mutation({
          query: (payload) => ({
            url: `${ProjectSemesterApiBaseUrl}/${endpointTypes.cms}/${payload.semesterId}/Projects`,
            method: 'post',
            data: payload
          }),
          invalidatesTags: ['ProjectSemester']
        }),
        updateProjectSemester: builder.mutation({
          query: (payload) => ({
            url: `${ProjectSemesterApiBaseUrl}/${endpointTypes.cms}/${payload.semesterId}/Projects/${payload.projectId}`,
            method: 'put',
            data: payload
          }),
          invalidatesTags: (result, error, arg) => {
            return [{ type: 'ProjectSemester', semesterId: arg.semesterId, projectId: arg.projectId }]
          }
        }),
        removeProjectSemester: builder.mutation({
          query: (payload) => ({
            url: `${ProjectSemesterApiBaseUrl}/${endpointTypes.cms}/${payload.semesterId}/Projects/${payload.projectId}`,
            method: 'delete'
          }),
          invalidatesTags: ['ProjectSemester']
        })
      })
    })

export const {useListProjectSemestersQuery, useLazyListProjectSemestersQuery, useGetProjectSemesterQuery, useAddProjectSemesterMutation, useUpdateProjectSemesterMutation, useRemoveProjectSemesterMutation} = ProjectSemesterApiSlice