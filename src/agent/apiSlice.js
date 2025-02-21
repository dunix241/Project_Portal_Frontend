import {createApi} from '@reduxjs/toolkit/query/react';
import { apiVersion, axiosBaseQuery, baseUrl } from './axios';

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: axiosBaseQuery({ baseUrl: `${baseUrl}${apiVersion ? `/${apiVersion}` : ''}` }),
  tagTypes: [],
  endpoints: (build) => ({})
})
