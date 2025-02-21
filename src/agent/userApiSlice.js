import { apiSlice } from './apiSlice';

const couponApiBaseURL = '/Users';
export const couponApiSlice =
  apiSlice
    .enhanceEndpoints({ addTagTypes: [] })
    .injectEndpoints({
      endpoints: (builder) => ({
        listUsers: builder.query({
          query: () => ({
            url: `${couponApiBaseURL}/Management`, method: 'get'
          }),
          providesTags: []
        }),
      })
    });

export const {
  useListUsersQuery
} = couponApiSlice;