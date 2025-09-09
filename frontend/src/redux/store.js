// import { configureStore } from "@reduxjs/toolkit";
// import authSlice from './authSlice'
// import jobSlice from './jobSlice'

// const store = configureStore({
//     reducer:{
//         auth:authSlice,
//         job:jobSlice
//     }
// });

// export default store;

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistReducer, persistStore } from "redux-persist";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import companySlice from "./companySlice";
import applicationSlice from "./applicationSlice";

// Combine reducers
const rootReducer = combineReducers({
  auth: authSlice,
  job: jobSlice,
  company: companySlice,
  application: applicationSlice,
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // ✅ only persist auth state (user info, token)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ needed for redux-persist
    }),
});

// Persistor
export const persistor = persistStore(store);
export default store;
