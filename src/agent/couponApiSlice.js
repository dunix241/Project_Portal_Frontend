import { apiSlice } from './apiSlice';

const couponApiBaseURL = '/Coupons';
export const couponApiSlice =
  apiSlice
    .enhanceEndpoints({ addTagTypes: ['Coupons', 'CouponUsers'] })
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
        }),
        listCouponUsers: builder.query({
          query: ({
            page,
            rowsPerPage,
            order,
            orderBy,
            couponId,
          }) => ({
            url: `${couponApiBaseURL}/Management/${couponId}/users?${new URLSearchParams({
              pageNumber: page + 1,
              pageSize: rowsPerPage
            }).toString()}`, method: 'get'
          }),
          providesTags: ['CouponUsers']
        }),
        addCouponUser: builder.mutation({
          query: (payload) => ({
            url: `${couponApiBaseURL}/Management/users`,
            method: 'post',
            data: payload
          }),
          invalidatesTags: ['CouponUsers']
        }),
        removeCouponUser: builder.mutation({
          query: (payload) => ({
            url: `${couponApiBaseURL}/Management/users?couponId=${payload.couponId}&userId=${payload.userId}`,
            method: 'delete'
          }),
          invalidatesTags: ['CouponUsers']
        })
      })
    });

export const {
  useListCouponsQuery,
  useLazyListCouponsQuery,
  useCreateCouponMutation,
  useEditCouponMutation,
  useRemoveCouponMutation,
  useLazyListCouponUsersQuery,
  useAddCouponUserMutation,
  useRemoveCouponUserMutation
} = couponApiSlice;