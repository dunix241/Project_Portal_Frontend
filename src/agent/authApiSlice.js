import { apiSlice } from './apiSlice';

const authApiBaseURL = '/Auth'
export const authApiSlice =
  apiSlice
    .injectEndpoints({
      endpoints: (builder) => ({
        login: builder.mutation({
          query: (credentials) => ({
            url: `${authApiBaseURL}/Login`,
            method: 'post',
            data: credentials
          }),
        }),
        register: builder.mutation({
          query: (credentials) => ({
            url: `${authApiBaseURL}/Register`,
            method: 'post',
            data: credentials
          }),
        }),
        resetPassword: builder.mutation({
          query: (payload) => ({
            url: `${authApiBaseURL}/ResetPassword`,
            method: 'patch',
            data: payload
          }),
        }),
      })
    })

export const {useLoginMutation, useRegisterMutation, useResetPasswordMutation} = authApiSlice