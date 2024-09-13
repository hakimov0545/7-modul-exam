import { configureStore } from "@reduxjs/toolkit";
import { companiesApi } from "../api/companies";
import { jobsApi } from "../api/jobs";

export const store = configureStore({
	reducer: {
		[companiesApi.reducerPath]: companiesApi.reducer,
		[jobsApi.reducerPath]: jobsApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(companiesApi.middleware)
			.concat(jobsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
