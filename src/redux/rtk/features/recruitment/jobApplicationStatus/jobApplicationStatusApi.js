import { buildQuery, toastHandler } from "../../../../../utils/functions";
import {apiSlice} from "../../api/apiSlice";

export const jobApplicationStatusApi = apiSlice.injectEndpoints({
    endpoints: (builder)=> ({
        getJobApplicationStatuses: builder.query({
            query: (arg)=> {
                const query = buildQuery(arg);
                return {
                    url: `job-applicationStatus?${query}`,
                }
            },
            providesTags: ["jobApplicationStatuses"]
        }),
        
        getJobApplicationStatus: builder.query({
            query: (id)=> {
                return {
                    url: `job-applicationStatus/${id}`
                }
            },
            providesTags: ["jobApplicationStatus"]
        }),

        addJobApplicationStatus: builder.mutation({
            query: (values)=> ({
                method: "POST",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
                url: `job-applicationStatus/`,
                body: values
            }),

            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    await queryFulfilled;
                    toastHandler("Job Application Status added successfully", "success");
                }catch(err){
                    toastHandler("Something went wrong, Please try again", "warning");
                }
            },

            invalidatesTags: ["jobApplicationStatuses"]
        }),

        updateJobApplicationStatus: builder.mutation({
            query: ({id, values})=> ({
                method: "PUT",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
                url: `job-applicationStatus/${id}`,
                body: values
            }),

            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    await queryFulfilled;
                    toastHandler("Job Application Status updated successfully", "success");
                }catch(err){
                    toastHandler("Something went wrong!, please try again", "warning");
                }
            },

            invalidatesTags: ["jobApplicationStatus", "jobApplicationStatuses"]
        }),

        deleteJobApplicationStatus: builder.mutation({
            query: (id)=> ({
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
                url: `job-applicationStatus/${id}`,
                body: {status: 'false'}
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    await queryFulfilled;
                    toastHandler("Job Application Status deleted successfully", "success");
                }catch(err){
                    toastHandler("Something went wrong!, please try again", "warning");
                }
            },

            invalidatesTags: ["jobApplicationStatus", "jobApplicationStatuses"]
        })
    })
});

export const {
    useGetJobApplicationStatusesQuery,
    useGetJobApplicationStatusQuery,
    useAddJobApplicationStatusMutation,
    useUpdateJobApplicationStatusMutation,
    useDeleteJobApplicationStatusMutation
} = jobApplicationStatusApi;