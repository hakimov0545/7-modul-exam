import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from ".";
import { IJob } from "../interface";

export const jobsApi = createApi({
	reducerPath: "jobsApi",
	baseQuery: axiosBaseQuery({
		baseUrl: "https://b512a69d4392e7a0.mokky.dev/jobs",
	}),
	endpoints: (builder) => ({
		getJobs: builder.query({
			query: () => ({
				url: "",
				method: "get",
			}),
		}),
		createJob: builder.mutation({
			query: (newJob: IJob) => ({
				url: "",
				method: "post",
				data: newJob,
			}),
		}),
		editJob: builder.mutation({
			query: ({
				id,
				newJob,
			}: {
				id: number | string;
				newJob: IJob;
			}) => ({
				url: `/${id}`,
				method: "patch",
				data: newJob,
			}),
		}),
		deleteJob: builder.mutation({
			query: ({ id }: { id: string | number }) => ({
				url: `/${id}`,
				method: "delete",
			}),
		}),
	}),
});

export const {
	useGetJobsQuery,
	useCreateJobMutation,
	useEditJobMutation,
	useDeleteJobMutation,
} = jobsApi;
