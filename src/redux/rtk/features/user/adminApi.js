import { buildQuery, toastHandler } from "../../../../utils/functions";
import { apiSlice } from "../api/apiSlice";

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdmins: builder.query({
      query: (arg) => {
        const query = buildQuery(arg);
        return {
          url: `user?${query}`,
        };
      },
      providesTags: ["Users"],
    }),

    getAdmin: builder.query({
      query: (id) => ({
        url: `user/${id}`,
      }),
      providesTags: ["User"],
    }),

    addAdmin: builder.mutation({
      query: (values) => ({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `user/admin/register`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          // toastHandler("Registration completed successfully","success");
        } catch (err) {
          // toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Users"],
    }),

    updateAdmin: builder.mutation({
      query: ({ id, values }) => ({
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `user/${id}`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Admin updated successfully","success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Users", "User"],
    }),

    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `user/${id}`,
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: {
          status: "false",
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Deleted status successful","warning");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Users", "User"],
    }),

    loginAdmin: builder.mutation({
      query: (values) => ({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `user/admin/login`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          
          localStorage.setItem("access-token", data.token);
          localStorage.setItem("role", data.role);
          localStorage.setItem("roleId", data.roleId);
          localStorage.setItem("user", data.username);
          localStorage.setItem("id", data.id);
          localStorage.setItem("isLogged", true);
          toastHandler("User logged in successfully","success");
          window.location.href = "/admin/dashboard";
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Users"],
    }),

    logoutAdmin: builder.mutation({
      query: (id) => ({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `user/logout`,
        body: { id },
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          
          localStorage.clear();
          window.location.href = "/admin/auth/login";
          toastHandler("User log out successfully","success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Users"],
    }),
  }),
});


export const {
  useGetAdminQuery,
  useGetAdminsQuery,
  useAddAdminMutation,
  useUpdateAdminMutation,
  useLoginAdminMutation,
  useLogoutAdminMutation,
  useDeleteAdminMutation,
} = adminApi;
