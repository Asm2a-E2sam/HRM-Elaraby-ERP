import { buildQuery, toastHandler } from "../../../../../utils/functions";
import {apiSlice} from "../../api/apiSlice";

export const jobApplicationApi = apiSlice.injectEndpoints({
    endpoints: (builder)=> ({
        getJobApplications: builder.query({
            query: (arg)=> {
                const query = buildQuery(arg);
                return {
                    url: `job-application?${query}`,
                }
            },
            providesTags: ["jobApplications"]
        }),
        
        getJobApplication: builder.query({
            query: (id)=> {
                return {
                    url: `job-application/${id}`
                }
            },
            providesTags: ["jobApplication"]
        }),

        addJobApplication: builder.mutation({
            query: (values)=> ({
                method: "POST",
                url: `job-application/`,
                body: values
            }),

            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    await queryFulfilled;
                    toastHandler("Job Application added successfully", "success");
                }catch(err){
                    toastHandler("Something went wrong, Please try again", "warning");
                }
            },

            invalidatesTags: ["jobApplications"]
        }),

        updateJobApplication: builder.mutation({
            query: ({id, formData})=> ({
                method: "POST",
                url: `job-application/${id}`,
                body: formData
            }),

            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    await queryFulfilled;
                    toastHandler("Job Application updated successfully", "success");
                }catch(err){
                    toastHandler("Something went wrong!, please try again", "warning");
                }
            },

            invalidatesTags: ["jobApplication", "jobApplications"]
        }),

        updateJobApplicationStatus: builder.mutation({
            query: ({id, values})=> ({
                method: "PATCH",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
                url: `job-application/${id}`,
                body: values
            }),

            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    await queryFulfilled;
                    toastHandler("Job Application Reviewed successfully", "success");
                }catch(err){
                    toastHandler("Something went wrong!, please try again", "warning");
                }
            },

            invalidatesTags: ["jobApplication", "jobApplications"]
        }),

        deleteJobApplication: builder.mutation({
            query: (id)=> ({
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
                url: `job-application/${id}`,
                body: {status: 'false'}
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    await queryFulfilled;
                    toastHandler("Job Application deleted successfully", "success");
                }catch(err){
                    toastHandler("Something went wrong!, please try again", "warning");
                }
            },

            invalidatesTags: ["jobApplication", "jobApplications"]
        })
    })
});

export const {
    useGetJobApplicationsQuery,
    useGetJobApplicationQuery,
    useAddJobApplicationMutation,
    useUpdateJobApplicationMutation,
    useUpdateJobApplicationStatusMutation,
    useDeleteJobApplicationMutation
} = jobApplicationApi;