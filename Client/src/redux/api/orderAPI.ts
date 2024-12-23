import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MessageResponse, NewOrderRequest } from "../../types/api-types";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/order/`,
  }),

  tagTypes: ["orders"],

    endpoints: (builder) => ({
        newOrder: builder.mutation<MessageResponse, NewOrderRequest>({
          query: (order) => ({
            url: "new",
            method: "POST",
            body: order,
          }),
          invalidatesTags: ["orders"],
        }),
  }),
});
