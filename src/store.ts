import rootReducer from "./reducers";
import { configureStore } from "@reduxjs/toolkit";

// Mount it on the Store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare(),
});

// Run the saga

export default store;
