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

export interface AddFigure{
  shape: number,
  levelName: string
}

export interface Board extends CreateBoard{
  id: string,  
}

export interface Board extends CreateBoard{
  id: string,  
}

export interface CreateBoard{
  height: number,
  width: number
}

export interface GetBoard extends Board{
  id: string,
  levels: string[]
}


export interface PointsResult extends Result{
  pointsRecord: number,
}
 
export interface TimesResult extends Result{
  timeRecord: number,
}
export interface FetchData {
  accessToken: string,
}
 
export interface LoginData {
  email: string,
  password: string
}

interface Figure{
  shape: number;
}

export interface Level{
  name: string,
  board: Board,
  figures: Figure[],
  points: number,
  tick: number,
  time: number,
  isNextFigureShown: boolean,
  isGridShown: boolean
}

export interface FetchScore{
  pointsRecord: number,
  timeRecord: number,
  id: string
}

export interface FetchLevel{
  name: string,
  boardId: string,
  points: number,
  tick: number,
  time: number,
  isNextFigureShown: boolean,
  isGridShown: boolean
}
  export  interface Error{
  error: {
    data: string,
    status: 400,
  }
}

 
 const baseQuery = fetchBaseQuery({
   baseUrl: 'http://localhost:4000/api',
   credentials: 'include',
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
 
   if (result?.error?.status === 402) {
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
        url: '/user/time-records',
        method: 'GET',
      }),
    }),
    setBoard: builder.mutation<GetBoard, CreateBoard>({
      query: (credentials) => ({
        url: '/board',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    addFigures: builder.mutation<any, AddFigure>({
      query: (credentials) => ({
        url: '/figure',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    getFigures: builder.mutation<any, void>({
      query: () => ({
        url: '/figure',
        method: 'GET',
      }),
    }),
    getBoards: builder.mutation<Board[], void>({
      query: () => ({
        url: '/board',
        method: 'GET',
      }),
    }),
    getLevel: builder.query<Level, string>({
      query: (name) => `/level/by-name/${name}`,
    }),
    getLevels: builder.mutation<Level[], void>({
      query: () => ({
        url: '/level',
        method: 'GET',
      }),
    }),
    updateLevel: builder.mutation<any, FetchLevel>({
      query: (credentials) => ({
        url: `/level/by-name/${credentials.name}`,
        method: 'PATCH',
        body: { ...credentials },
      }),
    }),  
    saveScore: builder.mutation<any, FetchScore>({
      query: (credentials) => ({
        url: `/user/update-user-records/${credentials.id}`,
        method: 'POST',
        body: { ...credentials },
      }),
    }),  
   }),
 });
 
 export const {
   useLoginMutation,
   useSignupMutation,
   useLogoutMutation,
   useGetPointsResultsMutation,
   useGetTimesResultsMutation,
   useSetBoardMutation,
   useGetFiguresMutation,
   useAddFiguresMutation,
   useGetLevelQuery,
   useUpdateLevelMutation,
   useGetLevelsMutation,
   useGetBoardsMutation,
   useSaveScoreMutation
 } = apiSlice;
 