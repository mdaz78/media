import { faker } from "@faker-js/faker";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// fetchBaseQuery function gives us a pre-configured version of fetch
// rtk-query uses fetch

// DEV ONLY
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export const albumsApi = createApi({
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
    fetchFn: async (...args) => {
      // REMOVE ON PROD
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
        // result will be the data we fetch from the BE
        providesTags: (result, error, user) => {
          const tags = result.map((album) => ({ type: "Album", id: album.id }));
          return [...tags, { type: "UserAlbums", id: user.id }];
        },
        query: (user) => {
          return {
            url: "/albums",
            params: {
              userId: user.id,
            },
            method: "GET",
          };
        },
      }),

      addAlbum: builder.mutation({
        invalidatesTags: (result, error, user) => {
          return [{ type: "UserAlbums", id: user.id }];
        },
        query: (user) => {
          return {
            url: "/albums",
            method: "POST",
            body: {
              usedId: user.id,
              title: faker.commerce.productName(),
            },
          };
        },
      }),

      deleteAlbum: builder.mutation({
        invalidatesTags: (result, error, album) => {
          return [{ type: "Album", id: album.id }];
        },
        query: (album) => {
          return {
            url: `/albums/${album.id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useDeleteAlbumMutation,
} = albumsApi;
