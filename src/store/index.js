import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { albumsApi } from "./apis/albumsApi";
import { photosApi } from "./apis/photosApi";
import { usersReducer } from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(albumsApi.middleware)
      .concat(photosApi.middleware);
  },
});

setupListeners(store.dispatch);

export {
  useAddAlbumMutation,
  useDeleteAlbumMutation,
  useFetchAlbumsQuery,
} from "./apis/albumsApi";
export {
  useAddPhotosMutation,
  useFetchPhotosQuery,
  useRemovePhotosMutation,
} from "./apis/photosApi";

export * from "./thunks/addUser";
export * from "./thunks/fetchUsers";
export * from "./thunks/removeUser";
