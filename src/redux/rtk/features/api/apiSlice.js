import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useLocation } from "react-router-dom";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_API,
  credentials: "include",
  prepareHeaders: async (headers, { getState, endpoint }) => {
    const token = localStorage.getItem("access-token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    try {
      // Use a function to check if the current page is the registration page
      const isRegisterPage = checkIfRegisterPage();

      if (isRegisterPage) {
        result = await baseQuery(args, api, extraOptions);
      } else {
        const refreshResult = await baseQuery(`/refresh-token`, api, extraOptions);
        if (refreshResult.data || isRegisterPage) {
          localStorage.setItem("access-token", refreshResult.data.token);
          result = await baseQuery(args, api, extraOptions);
        } else {
          localStorage.clear();
          // window.location.replace("/admin/auth/login");
          return undefined;
        }
      }
    } catch (error) {
      localStorage.clear();
      window.location.replace("/admin/auth/login");
      return undefined;
    }
  }
  return result;
};

// Helper function to determine if the current page is the register page
const checkIfRegisterPage = () => {
  if (typeof window !== "undefined") {
    let pathname = window.location.pathname;
    pathname = pathname.replace("/", " ");
    const pathArr = pathname.split("/");
    return pathArr[0].trim() === "register";
  }
  return false;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Users",
    "User",
    "Transactions",
    "Accounts",
    "PublicHolidays",
    "PublicHoliday",
    "TaskTimes",
    "TaskStatusAll",
    "TaskStatusById",
    "TaskStatus",
    "TaskPriority",
    "TaskPriorities",
    "TaskDependency",
    "ProjectTeams",
    "ProjectTeam",
    "ProjectTeamsById",
    "ProjectTask",
    "ProjectAll",
    "Projects",
    "Project",
    "Milestones",
    "MilestoneById",
    "Milestone",
    "AssignedTasks",
    "Payrolls",
    "Payroll",
    "PaySlips",
    "PaySlipsByMonth",
    "Payments",
    "LeavePolicies",
    "LeavePolicy",
    "Leaves",
    "LeaveByStatus",
    "Leave",
    "EmploymentStatus",
    "Designations",
    "Designation",
    "DesignationHistories",
    "DesignationHistory",
    "DesignationByEmployee",
    "AwardHistory",
    "Awards",
    "Attendances",
    "AttendanceById",
    "Attendance",
    "AttendanceAll",
    "AttendanceByClock",
    "Announcements",
    "Announcement",
    "Departments",
    "Department",
    "setting",
    "WeeklyHolidays",
    "WeeklyHoliday",
    "Roles",
    "Role",
    "Shifts",
    "Shift",
    "Educations",
    "Education",
    "SalaryHistories",
    "SalaryHistory",
    "ConfigEmail",
    "jobCategory",
    "jobCategories",
    "jobType",
    "jobTypes",
    "jobLocation",
    "jobLocations",
    "jobSkill",
    "jobSkills",
    "jobWorkExperience",
    "jobWorkExperiences",
    "job",
    "jobs",
    "jobApplication",
    "jobApplications",
    "jobInterview",
    "jobInterviews",
    "jobApplicationStatuses",
    "jobApplicationStatus",
  ],
  endpoints: (builder) => ({}),
});
