import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getUserInfo } from "../../Services/Action/auth.services";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api",
  // baseUrl: "https://protfolio-backend-eight.vercel.app/api",
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = getUserInfo();

    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: [],
  refetchOnMountOrArgChange: 30,
  endpoints: () => ({}),
});
