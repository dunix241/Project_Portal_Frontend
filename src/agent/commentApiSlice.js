import { apiSlice } from './apiSlice';
import { endpointTypes } from './axios';

const commentApiBaseUrl = `/Comments/${endpointTypes.pms}`
export const commentApiSlice =
  apiSlice
    .enhanceEndpoints({addTagTypes: ['SubmissionComment']})
    .injectEndpoints({
      endpoints: (builder) => ({
        listSubmissionComments: builder.query({
          query: ({
            submissionId
          }) => ({
            url: `${commentApiBaseUrl}?submissionId=${submissionId}&pageSize=100&pageNumber=1`, method: 'get'
          }),
          providesTags: (result = [], error, arg) => ['SubmissionComment']
        }),
        addSubmissionComment: builder.mutation({
          query: (payload) => ({
            url: `${commentApiBaseUrl}`,
            method: 'post',
            data: payload
          }),
          invalidatesTags: ['SubmissionComment']
        }),
        updateSubmissionComment: builder.mutation({
          query: (payload) => ({
            url: `${commentApiBaseUrl}/${payload.id}`,
            method: 'put',
            data: payload
          }),
          invalidatesTags: (result, error, arg) => {
            return [{ type: 'SubmissionComment', id: arg.id }]
          }
        }),
        // removeSubmissionComment: builder.mutation({
        //   query: (payload) => ({
        //     url: `${submissionCommentApiBaseUrl}/${endpointTypes.pms}/Members/${payload.id}`,
        //     method: 'delete'
        //   }),
        //   invalidatesTags: ['SubmissionComment']
        // })
      })
    })

export const {useListSubmissionCommentsQuery, useLazyListSubmissionCommentsQuery, useAddSubmissionCommentMutation, useUpdateSubmissionCommentMutation, useRemoveSubmissionCommentMutation} = commentApiSlice