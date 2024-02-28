import { apiSlice } from './apiSlice';

const authApiBaseURL = '/Auth'
export const authApiSlice =
  apiSlice
    .enhanceEndpoints({addTagTypes: ['Auth']})
    .injectEndpoints({
      endpoints: (builder) => ({
        login: builder.mutation({
          query: (credentials) => ({
            url: `${authApiBaseURL}/Login`,
            method: 'post',
            data: credentials
          }),
          invalidatesTags: ['Auth']
        }),
        register: builder.mutation({
          query: (payload) => ({
            url: `${authApiBaseURL}/Register`,
            method: 'post',
            data: payload
          }),
          invalidatesTags: ['Auth']
        }),
      })
    })

export const {useLoginMutation, useRegisterMutation} = authApiSlice