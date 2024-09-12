import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { setupListeners } from "@reduxjs/toolkit/query";
import userSlice from "./reducers/userSlice";
import { appApi } from "@/service/appApi";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["appApi"],
  whitelist: ["user", "appConfig"],
};

const storeReducers = combineReducers({
  user: userSlice,
  [appApi.reducerPath]: appApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, storeReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    //@ts-ignore
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([appApi.middleware]),
  devTools: __DEV__,
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
