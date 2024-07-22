import { buildQuery, toastHandler } from "../../../../../utils/functions";
import {apiSlice} from "../../api/apiSlice";

export const jobLocationApi = apiSlice.injectEndpoints({
    endpoints: (builder)=> ({
        getJobLocations: builder.query({
            query: (arg)=> {
                const query = buildQuery(arg);
                return {
                    url: `job-location?${query}`,
                }
            },
            providesTags: ["jobLocations"]
        }),
        
        getJobLocation: builder.query({
            query: (id)=> {
                return {
                    url: `job-location/${id}`
                }
            },
            providesTags: ["jobLocation"]
        }),

        addJobLocation: builder.mutation({
            query: (values)=> ({
                method: "POST",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
                url: `job-location/`,
                body: values
            }),

            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    await queryFulfilled;
                    toastHandler("Job Location added successfully", "success");
                }catch(err){
                    toastHandler("Something went wrong, Please try again", "warning");
                }
            },

            invalidatesTags: ["jobLocations"]
        }),

        updateJobLocation: builder.mutation({
            query: ({id, values})=> ({
                method: "PUT",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
                url: `job-location/${id}`,
                body: values
            }),

            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    await queryFulfilled;
                    toastHandler("Job Location updated successfully", "success");
                }catch(err){
                    toastHandler("Something went wrong!, please try again", "warning");
                }
            },

            invalidatesTags: ["jobLocation", "jobLocations"]
        }),

        deleteJobLocation: builder.mutation({
            query: (id)=> ({
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
                url: `job-location/${id}`,
                body: {status: 'false'}
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    await queryFulfilled;
                    toastHandler("Job Location deleted successfully", "success");
                }catch(err){
                    toastHandler("Something went wrong!, please try again", "warning");
                }
            },

            invalidatesTags: ["jobLocation", "jobLocations"]
        })
    })
});

export const {
    useGetJobLocationsQuery,
    useGetJobLocationQuery,
    useAddJobLocationMutation,
    useUpdateJobLocationMutation,
    useDeleteJobLocationMutation
} = jobLocationApi;