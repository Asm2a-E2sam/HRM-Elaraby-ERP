import { buildQuery, toastHandler } from "../../../../../utils/functions";
import {apiSlice} from "../../api/apiSlice";

export const jobTypeApi = apiSlice.injectEndpoints({
    endpoints: (builder)=> ({
        getJobTypes: builder.query({
            query: (arg)=> {
                const query = buildQuery(arg);
                return {
                    url: `job-type?${query}`,
                }
            },
            providesTags: ["jobTypes"]
        }),
        
        getJobType: builder.query({
            query: (id)=> {
                return {
                    url: `job-type/${id}`
                }
            },
            providesTags: ["jobType"]
        }),

        addJobType: builder.mutation({
            query: (values)=> ({
                method: "POST",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
                url: `job-type/`,
                body: values
            }),

            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    await queryFulfilled;
                    toastHandler("Job Type added successfully", "success");
                }catch(err){
                    toastHandler("Something went wrong, Please try again", "warning");
                }
            },

            invalidatesTags: ["jobTypes"]
        }),

        updateJobType: builder.mutation({
            query: ({id, values})=> ({
                method: "PUT",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
                url: `job-type/${id}`,
                body: values
            }),

            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    await queryFulfilled;
                    toastHandler("Job Type updated successfully", "success");
                }catch(err){
                    toastHandler("Something went wrong!, please try again", "warning");
                }
            },

            invalidatesTags: ["jobType", "jobTypes"]
        }),

        deleteJobType: builder.mutation({
            query: (id)=> ({
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
                url: `job-type/${id}`,
                body: {status: 'false'}
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    await queryFulfilled;
                    toastHandler("Job Type deleted successfully", "success");
                }catch(err){
                    toastHandler("Something went wrong!, please try again", "warning");
                }
            },

            invalidatesTags: ["jobType", "jobTypes"]
        })
    })
});

export const {
    useGetJobTypesQuery,
    useGetJobTypeQuery,
    useAddJobTypeMutation,
    useUpdateJobTypeMutation,
    useDeleteJobTypeMutation
} = jobTypeApi;