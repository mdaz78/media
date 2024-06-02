import { faker } from "@faker-js/faker";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const photosApi = createApi({
  reducerPath: "photos",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
  }),
  endpoints(builder) {
    return {
      fetchPhotos: builder.query({
        providesTags: (response, error, album) => {
          const tags = response.map((photo) => ({
            type: "Photo",
            id: photo.id,
          }));
          return [...tags, { type: "AlbumPhoto", id: album.id }];
        },
        query: (album) => {
          return {
            method: "GET",
            url: "/photos",
            params: {
              albumId: album.id,
            },
          };
        },
      }),
      addPhotos: builder.mutation({
        invalidatesTags: (response, error, album) => [
          { type: "AlbumPhoto", id: album.id },
        ],
        query: (album) => {
          return {
            method: "POST",
            url: "/photos",
            body: {
              albumId: album.id,
              url: faker.image.abstract(150, 150, true),
            },
          };
        },
      }),
      removePhotos: builder.mutation({
        invalidatesTags: (response, error, photo) => [
          { type: "Photo", id: photo.id },
        ],
        query: (photo) => {
          return {
            method: "DELETE",
            url: `/photos/${photo.id}`,
          };
        },
      }),
    };
  },
});

export const {
  useFetchPhotosQuery,
  useAddPhotosMutation,
  useRemovePhotosMutation,
} = photosApi;
