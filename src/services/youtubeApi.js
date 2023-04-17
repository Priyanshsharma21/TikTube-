import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const youtubeHeaders = {
  'X-RapidAPI-Key': 'c4f5254226msh10570caa9c1f5f8p1def93jsnb6055c72ecd0',
  'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
};

const baseUrl = 'https://youtube-v31.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: youtubeHeaders });
 // attach url with headers for making req

export const youtubeApi = createApi({
  reducerPath: 'youtubeApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    searchVideo: builder.query({
      query: ({ query }) => createRequest(`/search?q=${query}&part=snippet%2Cid&maxResults=50&order=date`),
    }),

    videoDetails: builder.query({
      query: ({ id }) => createRequest(`/videos?part=contentDetails%2Csnippet%2Cstatistics&id=${id}`),
    }),

    relatedVideos: builder.query({
      query: ({ id }) => createRequest(`/search?relatedToVideoId=${id}&part=id%2Csnippet&type=video&maxResults=25`),
    }),

    channelDetails: builder.query({
      query: ({ id }) => createRequest(`/channels?part=snippet%2Cstatistics&id=${id}`),
    }),

    channelVideos: builder.query({
      query: ({ id }) => createRequest(`/search?channelId=${id}&part=snippet%2Cid&order=date&maxResults=50`),
    }),

    videoComments: builder.query({
      query: ({ id }) => createRequest(`/commentThreads?part=snippet&videoId=${id}&maxResults=10`),
    }),

    
  }),
});

export const { useSearchVideoQuery,useVideoCommentsQuery, useVideoDetailsQuery,useRelatedVideosQuery,useChannelDetailsQuery,useChannelVideosQuery } = youtubeApi;

