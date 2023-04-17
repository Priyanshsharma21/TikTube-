import {
    createApi,
    fetchBaseQuery
  } from '@reduxjs/toolkit/query/react'
  
  const tweetApiHeader = {
    'X-RapidAPI-Key': 'c4f5254226msh10570caa9c1f5f8p1def93jsnb6055c72ecd0',
		'X-RapidAPI-Host': 'twitter135.p.rapidapi.com',
  }
  
  const baseUrl =  'https://twitter135.p.rapidapi.com';
  
  const createRequest = (url) => ({url,headers: tweetApiHeader}) // attach url with headers for making req
  
  
  export const tweetApi = createApi({
    reducerPath: 'tweetApi',
    baseQuery: fetchBaseQuery({
      baseUrl
  }),
  
    endpoints: (builder) => ({ // set of operations we want to perform with our api
      searchTweets: builder.query({
        query: ({query}) => createRequest(`/Search/?q=${query}&count=20`)
      }),

      userById: builder.query({
        query: ({id}) => createRequest(`/UserByRestId/?id=${id}`)
      }),

      userTweets: builder.query({
        query: ({id}) => createRequest(`/UserTweets/?id=${id}&count=20`)
      }),
  
    })
  })
  
  export const {
    useSearchTweetsQuery,useUserByIdQuery,useUserTweetsQuery
  } = tweetApi;
  
  