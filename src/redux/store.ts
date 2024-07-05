import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./playerSlice";

const store = configureStore({
  reducer: {
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false, // Désactive la vérification d'immuabilité par défaut
    serializableCheck: false, // Désactive la vérification de sérialisation par défaut
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;