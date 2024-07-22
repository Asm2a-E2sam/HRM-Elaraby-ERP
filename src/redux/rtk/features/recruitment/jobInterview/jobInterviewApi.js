import { buildQuery, toastHandler } from "../../../../../utils/functions";
import {apiSlice} from "../../api/apiSlice";

export const jobInterviewApi = apiSlice.injectEndpoints({
    endpoints: (builder)=> ({
        getJobInterviews: builder.query({
            query: (arg)=> {
                const query = buildQuery(arg);
                return {
                    url: `job-interview?${query}`,
                }
            },
            providesTags: ["jobInterviews"]
        }),
        
        getJobInterview: builder.query({
            query: (id)=> {
                return {
                    url: `job-interview/${id}`
                }
            },
            providesTags: ["jobInterview"]
        }),

        addJobInterview: builder.mutation({
            query: (values)=> ({
                method: "POST",
                url: `job-interview/`,
                headers: {
                    accept: "Application/json",
                    "Content-Type": "Application/json;charset=UTF-8",
                },
                body: values
            }),

            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    await queryFulfilled;
                    toastHandler("Job Interview added successfully", "success");
                }catch(err){
                    toastHandler(err.error.data.error || "Something Went wrong!, please try again later", "warning");
                }
            },

            invalidatesTags: ["jobInterviews"]
        }),

        updateJobInterview: builder.mutation({
            query: ({id, values})=> ({
                method: "PUT",
                url: `job-interview/${id}`,
                headers: {
                    accept: "Application/json",
                    "Content-Type": "Application/json;charset=UTF-8",
                },
                body: values
            }),

            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    await queryFulfilled;
                    toastHandler("Job Interview updated successfully", "success");
                }catch(err){
                    toastHandler("Something went wrong!, please try again", "warning");
                }
            },

            invalidatesTags: ["jobInterview", "jobInterviews"]
        }),

        updateJobInterviewStatus: builder.mutation({
            query: ({id, modifiedValues})=> ({
                method: "PATCH",
                headers: {
                    accept: "Application/json",
                    "Content-Type": "Application/json;charset=UTF-8",
                },
                url: `job-interview/${id}`,
                body: modifiedValues
            }),

            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    await queryFulfilled;
                    toastHandler("Job Interview Reviewed successfully", "success");
                }catch(err){
                    toastHandler("Something went wrong!, please try again", "warning");
                }
            },

            invalidatesTags: ["jobInterview", "jobInterviews"]
        }),

        deleteJobInterview: builder.mutation({
            query: (id)=> ({
                method: "PATCH",
                headers: {
                    accept: "Application/json",
                    "Content-Type": "Application/json;charset=UTF-8",
                },
                url: `job-interview/${id}`,
                body: {status: 'false'}
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    await queryFulfilled;
                    toastHandler("Job Interview deleted successfully", "success");
                }catch(err){
                    toastHandler("Something went wrong!, please try again", "warning");
                }
            },

            invalidatesTags: ["jobInterview", "jobInterviews"]
        })
    })
});

export const {
    useGetJobInterviewsQuery,
    useGetJobInterviewQuery,
    useAddJobInterviewMutation,
    useUpdateJobInterviewMutation,
    useUpdateJobInterviewStatusMutation,
    useDeleteJobInterviewMutation
} = jobInterviewApi;