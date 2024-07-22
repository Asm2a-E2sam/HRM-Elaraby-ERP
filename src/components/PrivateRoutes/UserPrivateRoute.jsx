import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import useGetPermissions from "../../utils/useGetPermissions";
import Loader from "../loader/loader";

const UserPrivateRoute = ({ path, permission, ...props }) => {
    const { permissions, isLoading } = useGetPermissions();
    const isLogged = localStorage.getItem("isLogged");

    if (isLoading) {
        return <Loader />;
    }

    if (permissions?.includes(permission) && isLogged) {
        return <Outlet />;
    } else {
        toast.error("You are not Authorized, Contact with Admin");
        return <Navigate to="/admin/auth/login" />;
    }
};

export default UserPrivateRoute;
