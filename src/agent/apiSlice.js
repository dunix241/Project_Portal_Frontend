import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery, baseUrl} from './axios';

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: axiosBaseQuery({ baseUrl: `${baseUrl}` }),
  tagTypes: [],
  endpoints: (build) => ({})
})
