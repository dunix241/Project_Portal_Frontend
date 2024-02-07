import { apiSlice } from './apiSlice';

const couponApiBaseURL = '/Coupons'
export const couponApiSlice =
  apiSlice
    .enhanceEndpoints({addTagTypes: ['Coupons']})
    .injectEndpoints({
      endpoints: (builder) => ({
        listCoupons: builder.query({
          query: ({
            page,
            rowsPerPage,
            order,
            orderBy
          }) => ({
            url: `${couponApiBaseURL}/Management?${new URLSearchParams({
              pageNumber: page + 1,
              pageSize: rowsPerPage
            }).toString()}`, method: 'get'
          }),
          providesTags: ['Coupons']
        }),
        createCoupon: builder.mutation({
          query: (payload) => ({
            url: `${couponApiBaseURL}/Management`,
            method: 'post',
            data: payload
          }),
          invalidatesTags: ['Coupons']
        }),
        editCoupon: builder.mutation({
          query: (payload) => ({
            url: `${couponApiBaseURL}/Management/${payload.id}`,
            method: 'put',
            data: payload
          }),
          invalidatesTags: ['Coupons']
        }),
        removeCoupon: builder.mutation({
          query: (payload) => ({
            url: `${couponApiBaseURL}/Management/${payload.id}`,
            method: 'delete'
          }),
          invalidatesTags: ['Coupons']
        })
      })
    })

export const {useListCouponsQuery, useLazyListCouponsQuery, useCreateCouponMutation, useEditCouponMutation, useRemoveCouponMutation} = couponApiSlice