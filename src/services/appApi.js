import {
  createApi,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react'

const appsApiHeader = {
  'X-RapidAPI-Key': 'c4f5254226msh10570caa9c1f5f8p1def93jsnb6055c72ecd0',
    'X-RapidAPI-Host': 'tiktok-all-in-one.p.rapidapi.com',
}

const baseUrl =  'https://tiktok-all-in-one.p.rapidapi.com';

const createRequest = (url) => ({url,headers: appsApiHeader}) // attach url with headers for making req


export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQuery({
    baseUrl
}),

  endpoints: (builder) => ({ // set of operations we want to perform with our api
    getFeed: builder.query({
      query: () => createRequest(`/feed`)
    }),

    getVideoDetails: builder.query({
      query: (id) => createRequest(`/video?id=${id}`)
    }),

    getCountryFeed: builder.query({
      query: (code) => createRequest(`/feed?region=${code}`)
    }),

    getCategorySearch: builder.query({
      query: ({cato,query}) => createRequest(`/search/${cato}?query=${query}`)
    }),


  })
})

export const {
  useGetFeedQuery, useGetVideoDetailsQuery,useGetCountryFeedQuery,useGetCategorySearchQuery // use + GetCrypto + Query
} = appApi;




