/* eslint-disable @typescript-eslint/no-explicit-any */
import {
   createApi, fetchBaseQuery,
 } from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut, RootState, AuthUser } from './AuthSlice';


export interface User{
   name: string,
   email: string,
   password: string
}

export interface Result {
   id: string,
   name: string      
}

export interface PointsResult extends Result{
  pointsRecord: number,
}
 
export interface TimesResult extends Result{
  timesRecord: number,
}
 export interface FetchData {
   accessToken: string,
 }
 
 export interface LoginData {
   email: string,
   password: string
}

 
 const baseQuery = fetchBaseQuery({
   baseUrl: 'http://localhost:4000/api',
   /* credentials: 'include', */
   prepareHeaders: (headers, { getState }) => {
     const { token } = (getState() as RootState).auth;
     if (token) {
       headers.set('authorization', `Bearer ${token}`);
     }
     return headers;
   },
 });
 
 const baseQueryWithReauth = async (args : any, api : any, extraOptions: any) => {
   let result = await baseQuery(args, api, extraOptions);
 
   if (result?.error?.status === 400) {
     const refreshResult = await baseQuery('/auth/refresh-tokens', api, extraOptions);
     if (refreshResult?.data) {
       const user = api.getState().auth.user as AuthUser;
       const { accessToken } = refreshResult.data as FetchData;
 
       api.dispatch(setCredentials({ user, accessToken }));
       result = await baseQuery(args, api, extraOptions);
     } else {
       api.dispatch(logOut());
     }
   }
 
   return result;
 };
 
 export const apiSlice = createApi({
   baseQuery: baseQueryWithReauth,
   endpoints: (builder) => ({
     login: builder.mutation<FetchData, LoginData>({
       query: (credentials) => ({
         url: '/auth/login',
         method: 'POST',
         body: { ...credentials },
       }),
     }),
     signup: builder.mutation<FetchData, User>({
       query: (credentials) => ({
         url: '/auth/register',
         method: 'POST',
         body: { ...credentials },
       }),
     }),
     logout: builder.mutation<void, void>({
       query: () => ({
         url: '/auth/logout',
         method: 'POST',
       }),
     }),
     getPointsResults: builder.mutation<PointsResult[], void>({
      query: () => ({
        url: '/user/points-records',
        method: 'GET',
      }),
    }),
    getTimesResults: builder.mutation<TimesResult[], void>({
      query: () => ({
        url: '/user/times-records',
        method: 'GET',
      }),
    }),
   }),
 });
 
 export const {
   useLoginMutation,
   useSignupMutation,
   useLogoutMutation,
   useGetPointsResultsMutation,
   useGetTimesResultsMutation
 } = apiSlice;
 