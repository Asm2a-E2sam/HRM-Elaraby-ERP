import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import useGetPermissions from "../../utils/useGetPermissions";
import Loader from "../loader/loader";

const UserPrivateRoute = ({ path, permission, ...props }) => {
    const { permissions, isLoading } = useGetPermissions();
    const isLogged = localStorage.getItem("isLogged");
    let { pathname } = useLocation();
    pathname = pathname.replace("/", " ");
    const pathArr = pathname.split("/");
    const isRegisterPage = pathArr[0].trim() === "register";
    if (isLoading) {
        return <Loader />;
    }

    if ((permissions?.includes(permission) && isLogged)|| isRegisterPage ) {
        return <Outlet />;
    } else {
        toast.error("You are not Authorized, Contact with Admin");
        // return <Navigate to="/admin/auth/login" />;
        return <Outlet />;
    }
};

export default UserPrivateRoute;
