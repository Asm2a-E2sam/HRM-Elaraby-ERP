import { buildQuery, toastHandler } from "../../../../../utils/functions";
import {apiSlice} from "../../api/apiSlice";

export const jobCategoryApi = apiSlice.injectEndpoints({
    endpoints: (builder)=> ({
        getJobCategories: builder.query({
            query: (arg)=> {
                const query = buildQuery(arg);
                return {
                    url: `job-category?${query}`,
                }
            },
            providesTags: ["jobCategories"]
        }),
        
        getJobCategory: builder.query({
            query: (id)=> {
                return {
                    url: `job-category/${id}`
                }
            },
            providesTags: ["jobCategory"]
        }),

        addJobCategory: builder.mutation({
            query: (values)=> ({
                method: "POST",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
                url: `job-category/`,
                body: values
            }),

            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    await queryFulfilled;
                    toastHandler("Job Category added successfully", "success");
                }catch(err){
                    toastHandler("Something went wrong, Please try again", "warning");
                }
            },

            invalidatesTags: ["jobCategories"]
        }),

        updateJobCategory: builder.mutation({
            query: ({id, values})=> ({
                method: "PUT",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
                url: `job-category/${id}`,
                body: values
            }),

            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    await queryFulfilled;
                    toastHandler("Job Category updated successfully", "success");
                }catch(err){
                    toastHandler("Something went wrong!, please try again", "warning");
                }
            },

            invalidatesTags: ["jobCategory", "jobCategories"]
        }),

        deleteJobCategory: builder.mutation({
            query: (id)=> ({
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
                url: `job-category/${id}`,
                body: {status: 'false'}
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    await queryFulfilled;
                    toastHandler("Job Category deleted successfully", "success");
                }catch(err){
                    toastHandler("Something went wrong!, please try again", "warning");
                }
            },

            invalidatesTags: ["jobCategory", "jobCategories"]
        })
    })
});

export const {
    useGetJobCategoriesQuery,
    useGetJobCategoryQuery,
    useAddJobCategoryMutation,
    useUpdateJobCategoryMutation,
    useDeleteJobCategoryMutation
} = jobCategoryApi;