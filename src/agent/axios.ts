import { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import {RootState} from "../store";
import {env} from "../utils/env"

type RequestOptions = {
  url: string
  method: AxiosRequestConfig['method']
  data?: AxiosRequestConfig['data']
  params?: AxiosRequestConfig['params']
  headers?: AxiosRequestConfig['headers']
}

axios.interceptors.response.use(function (response) {
  console.log(response);
  return response;
}, function (error) {
  return Promise.reject(error);
});

export const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string } = { baseUrl: '' }): BaseQueryFn<RequestOptions, unknown, unknown> =>
async ({ url, method, data, params, headers }, {getState}) => {
  const token = (getState() as RootState).auth.user?.token
  if (token) {
    headers = {...headers, 'authorization': `Bearer ${token}`};
  }

  try {
    const result = await axios({
      url: baseUrl + url,
      method,
      data,
      params,
      headers,
    })
    return { data: result.data }
  } catch (axiosError) {
    const err = axiosError as AxiosError
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      },
    }
  }
}

export const baseUrl = env.REACT_APP_API_BASE_URL || 'https://localhost:5002/api'
export const apiVersion = env.REACT_APP_API_VERSION || 'v1'
export const endpointTypes = {
  cms: 'cms',
  pms: 'pms'
}