import Config from "@/utils/config";
import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

interface StoryResponse {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: "story";
  url: string;
}





const baseQuery = fetchBaseQuery({
  baseUrl: Config.apiUrl,
});

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: retry(baseQuery, { maxRetries: 4 }),
  tagTypes: ["STORIES",],
  endpoints: (builder) => ({
    getstory: builder.query<any, void>({
      providesTags: ['STORIES'],
      query: () => `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`,
    }),
    getstoryById: builder.query<StoryResponse, string>({
      providesTags: ['STORIES'],
      query: (id) => `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetstoryQuery, useGetstoryByIdQuery } = appApi;
