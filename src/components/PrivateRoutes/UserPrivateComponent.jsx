import React from "react";
import useGetPermissions from "../../utils/useGetPermissions";
import Loader from "../loader/loader";

const UserPrivateComponent = ({ permission, children }) => {
    const { permissions, isLoading } = useGetPermissions();

    if (isLoading) {
        return <Loader />;
    }

    if (permissions?.includes(permission)) {
        return <>{children}</>;
    } else {
        return "";
    }
};

export default UserPrivateComponent;
