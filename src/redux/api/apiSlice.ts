import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/helpers/axios/axiosBaseQuery';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1',
  }),
  tagTypes: ['Career'],
  endpoints: () => ({}),
}); 