import { apiSlice } from './apiSlice';
import { endpointTypes } from './axios';

const submissionApiBaseUrl = `/Submissions/${endpointTypes.pms}`
export const submissionApiSlice =
  apiSlice
    .enhanceEndpoints({addTagTypes: ['Submission']})
    .injectEndpoints({
      endpoints: (builder) => ({
        listSubmissions: builder.query({
          query: ({
            enrollmentId
          }) => ({
            url: `${submissionApiBaseUrl}?enrollmentId=${enrollmentId}`, method: 'get'
          }),
          providesTags: (result = [], error, arg) => ['Submission', ...(result?.map(({id}) => ({type: 'Submission', id})) || [])]
        }),
        addSubmission: builder.mutation({
          query: (payload) => ({
            url: `${submissionApiBaseUrl}`,
            method: 'post',
            data: payload
          }),
          invalidatesTags: ['Submission']
        }),
        updateSubmission: builder.mutation({
          query: (payload) => ({
            url: `${submissionApiBaseUrl}/${payload.id}`,
            method: 'put',
            data: payload
          }),
          invalidatesTags: (result, error, arg) => {
            return [{ type: 'Submission', id: arg.id }]
          }
        }),
        removeSubmission: builder.mutation({
          query: (payload) => ({
            url: `${submissionApiBaseUrl}/${payload.id}`,
            method: 'delete'
          }),
          invalidatesTags: ['Submission']
        }),
        submit: builder.mutation({
          query: ({id, formData}) => {
            return {
              url: `${submissionApiBaseUrl}/${id}/Submit`,
              method: 'put',
              data: formData,
              headers: {
                'content-type': 'multipart/form-data',
              }
            }
          },
          invalidatesTags: ['Submission']
        }),
        unSubmit: builder.mutation({
          query: (payload) => ({
            url: `${submissionApiBaseUrl}/${payload.id}/Submit`,
            method: 'delete',
            data: payload
          }),
          invalidatesTags: ['Submission']
        }),
        publish: builder.mutation({
          query: (payload) => ({
            url: `${submissionApiBaseUrl}/${payload.id}/Publish`,
            method: 'put',
            data: payload
          }),
          invalidatesTags: ['Submission', 'Enrollment']
        }),
        unpublish: builder.mutation({
          query: (payload) => ({
            url: `${submissionApiBaseUrl}/${payload.id}/Publish`,
            method: 'delete',
          }),
          invalidatesTags: ['Submission', 'Enrollment']
        })
      })
    })

export const {useListSubmissionsQuery, useLazyListSubmissionsQuery, useAddSubmissionMutation, useUpdateSubmissionMutation, useRemoveSubmissionMutation, useSubmitMutation, useUnSubmitMutation, usePublishMutation, useUnpublishMutation} = submissionApiSlice