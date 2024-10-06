import { apiSlice } from "../api/apiSlice";

const adminId = localStorage.getItem("admin_id");
export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboards: builder.query({
      query: ({ startdate, enddate }) => ({
        url: `dashboard?startdate=${startdate}&enddate=${enddate}&admin_id=${adminId}`,
      }),
      providesTags: ["Dashboards"],
    }),
  }),
});

export const {
  useGetDashboardsQuery,
} = dashboardApi;
