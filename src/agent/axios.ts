import { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import {RootState} from "../store";
import { env, getParsedEnv } from '../utils/env';
import toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import _ from 'lodash';

type RequestOptions = {
  url: string
  method: AxiosRequestConfig['method']
  data?: AxiosRequestConfig['data']
  params?: AxiosRequestConfig['params']
  headers?: AxiosRequestConfig['headers']
}

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (!getParsedEnv().NEXT_PUBLIC_DISABLE_LOGS) {
    toastify({
      text: `${error.code}\n${getOneLineMessage(error.response?.data?.errors || getParsedEnv().NEXT_PUBLIC_ENABLE_SERVER_LOGS && error.response?.data?.message || error.message) || ''}`,
      duration: 5000,
      // destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "bottom", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113))",
      },
      onClick: function(){}
    }).showToast()
  }
  return Promise.reject(error);
});

function getOneLineMessage(message) {
  if (_.isString(message)) return message;
  if (_.isObject(message)) {
    message = Object.values(message)
  }
  if (_.isArray(message)) return message.reduce((prev, current, index) => `${prev}${index !== 0 ? '\n' : ''}${current}`, '')
  return message;
}

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

export const baseUrl = getParsedEnv().NEXT_PUBLIC_API_BASE_URL || 'https://localhost:5002/api'
export const apiVersion = getParsedEnv().NEXT_PUBLIC_API_VERSION || 'v1'
export const endpointTypes = {
  cms: 'cms',
  pms: 'pms'
}