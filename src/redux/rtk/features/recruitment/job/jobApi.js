import { buildQuery, toastHandler } from "../../../../../utils/functions";
import {apiSlice} from "../../api/apiSlice";


export const jobApi = apiSlice.injectEndpoints({
    endpoints: (builder)=> ({
        getJobs: builder.query({
            query: (arg)=> {
                const query = buildQuery(arg);
                return {
                    url: `job?${query}`,
                }
            },
            providesTags: ["jobs"]
        }),
        
        getJob: builder.query({
            query: (id)=> {
                return {
                    url: `job/${id}`
                }
            },
            providesTags: ["job"]
        }),

        addJob: builder.mutation({
            query: (values)=> ({
                method: "POST",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
                url: `job/`,
                body: values
            }),

            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    await queryFulfilled;
                    toastHandler("Job  added successfully", "success");
                }catch(err){
                    toastHandler("Something went wrong, Please try again", "warning");
                }
            },

            invalidatesTags: ["jobs"]
        }),

        updateJob: builder.mutation({
            query: ({id, values})=> ({
                method: "PUT",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
                url: `job/${id}`,
                body: values
            }),

            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    await queryFulfilled;
                    toastHandler("Job  updated successfully", "success");
                }catch(err){
                    toastHandler("Something went wrong!, please try again", "warning");
                }
            },

            invalidatesTags: ["job", "jobs"]
        }),

        deleteJob: builder.mutation({
            query: (id)=> ({
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
                url: `job/${id}`,
                body: {status: 'false'}
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    await queryFulfilled;
                    toastHandler("Job deleted successfully", "success");
                }catch(err){
                    toastHandler("Something went wrong!, please try again", "warning");
                }
            },

            invalidatesTags: ["job", "jobs"]
        })
    })
});

export const {
    useGetJobsQuery,
    useGetJobQuery,
    useAddJobMutation,
    useUpdateJobMutation,
    useDeleteJobMutation
} = jobApi;