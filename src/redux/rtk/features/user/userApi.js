import { buildQuery, toastHandler } from "../../../../utils/functions";
import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (arg) => {
        const query = buildQuery(arg);
        const adminId = localStorage.getItem("id");
        return {
          url: `user?${query}&admin_id=${adminId}`,
        };
      },
      providesTags: ["Users"],
    }),

    getUser: builder.query({
      query: (id) => ({
        url: `user/${id}`,
      }),
      providesTags: ["User"],
    }),

    addUser: builder.mutation({
      query: (values) => ({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `user/register`,
        body: values,
      }),
      
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          console.log(queryFulfilled);          
          toastHandler("Registration completed successfully","success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Users"],
    }),

    updateUser: builder.mutation({
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
          toastHandler("User updated successfully","success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Users", "User"],
    }),

    deleteUser: builder.mutation({
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

    loginUser: builder.mutation({
      query: (values) => ({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `user/login`,
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
          localStorage.setItem("admin_id", data.admin_id);
          localStorage.setItem("isLogged", true);
          toastHandler("User logged in successfully","success");
          window.location.href = "/admin/dashboard";
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Users"],
    }),

    logoutUser: builder.mutation({
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
  useGetUserQuery,
  useGetUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useDeleteUserMutation,
} = userApi;
