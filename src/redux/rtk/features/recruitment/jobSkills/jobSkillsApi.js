import { buildQuery, toastHandler } from "../../../../../utils/functions";
import {apiSlice} from "../../api/apiSlice";

export const jobSkillsApi = apiSlice.injectEndpoints({
    endpoints: (builder)=> ({
        getJobSkills: builder.query({
            query: (arg)=> {
                const query = buildQuery(arg);
                return {
                    url: `job-skills?${query}`,
                }
            },
            providesTags: ["jobSkills"]
        }),

        getJobSkillsByJobCategoryId: builder.query({
            query: (id)=> {
                return {
                    url: `job-skills/byJobCategoryId/${id}`,
                }
            },
            providesTags: ["jobSkills"]
        }),
        
        getJobSkill: builder.query({
            query: (id)=> {
                return {
                    url: `job-skills/${id}`
                }
            },
            providesTags: ["jobSkill"]
        }),

        addJobSkills: builder.mutation({
            query: (values)=> ({
                method: "POST",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
                url: `job-skills/`,
                body: values
            }),

            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    await queryFulfilled;
                    toastHandler("Job Skill added successfully", "success");
                }catch(err){
                    toastHandler("Something went wrong, Please try again", "warning");
                }
            },

            invalidatesTags: ["jobSkills"]
        }),

        updateJobSkills: builder.mutation({
            query: ({id, values})=> ({
                method: "PUT",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
                url: `job-skills/${id}`,
                body: values
            }),

            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    await queryFulfilled;
                    toastHandler("Job Skill updated successfully", "success");
                }catch(err){
                    toastHandler("Something went wrong!, please try again", "warning");
                }
            },

            invalidatesTags: ["jobSkill", "jobSkills"]
        }),

        deleteJobSkills: builder.mutation({
            query: (id)=> ({
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
                url: `job-skills/${id}`,
                body: {status: 'false'}
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    await queryFulfilled;
                    toastHandler("Job Skill deleted successfully", "success");
                }catch(err){
                    toastHandler("Something went wrong!, please try again", "warning");
                }
            },

            invalidatesTags: ["jobSkill", "jobSkills"]
        })
    })
});

export const {
    useGetJobSkillQuery,
    useGetJobSkillsByJobCategoryIdQuery,
    useGetJobSkillsQuery,
    useAddJobSkillsMutation,
    useUpdateJobSkillsMutation,
    useDeleteJobSkillsMutation
} = jobSkillsApi;