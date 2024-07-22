import { buildQuery, toastHandler } from "../../../../../utils/functions";
import {apiSlice} from "../../api/apiSlice";

export const jobWorkExperienceApi = apiSlice.injectEndpoints({
    endpoints: (builder)=> ({
        getJobWorkExperiences: builder.query({
            query: (arg)=> {
                const query = buildQuery(arg);
                return {
                    url: `job-workExperience?${query}`,
                }
            },
            providesTags: ["jobWorkExperiences"]
        }),
        
        getJobWorkExperience: builder.query({
            query: (id)=> {
                return {
                    url: `job-workExperience/${id}`
                }
            },
            providesTags: ["jobWorkExperience"]
        }),

        addJobWorkExperience: builder.mutation({
            query: (values)=> ({
                method: "POST",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
                url: `job-workExperience/`,
                body: values
            }),

            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    await queryFulfilled;
                    toastHandler("Job Work Experience added successfully", "success");
                }catch(err){
                    toastHandler("Something went wrong, Please try again", "warning");
                }
            },

            invalidatesTags: ["jobWorkExperiences"]
        }),

        updateJobWorkExperience: builder.mutation({
            query: ({id, values})=> ({
                method: "PUT",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
                url: `job-workExperience/${id}`,
                body: values
            }),

            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    await queryFulfilled;
                    toastHandler("Job Work Experience updated successfully", "success");
                }catch(err){
                    toastHandler("Something went wrong!, please try again", "warning");
                }
            },

            invalidatesTags: ["jobWorkExperience", "jobWorkExperiences"]
        }),

        deleteJobWorkExperience: builder.mutation({
            query: (id)=> ({
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
                url: `job-workExperience/${id}`,
                body: {status: 'false'}
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    await queryFulfilled;
                    toastHandler("Job Work Experience deleted successfully", "success");
                }catch(err){
                    toastHandler("Something went wrong!, please try again", "warning");
                }
            },

            invalidatesTags: ["jobWorkExperience", "jobWorkExperiences"]
        })
    })
});

export const {
    useGetJobWorkExperienceQuery,
    useGetJobWorkExperiencesQuery,
    useAddJobWorkExperienceMutation,
    useUpdateJobWorkExperienceMutation,
    useDeleteJobWorkExperienceMutation
} = jobWorkExperienceApi;