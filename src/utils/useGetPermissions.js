import jwtDecode from "jwt-decode";
import { useGetPermissionByRoleIdQuery } from "../redux/rtk/features/role/roleApi";

const useGetPermissions = () => {
    const token = localStorage.getItem("access-token");
	const roleId = jwtDecode(token)?.roleId;

    const {data: permissionsData, isLoading} = useGetPermissionByRoleIdQuery(roleId);

    if(!isLoading && permissionsData){
        return {permissions: permissionsData.permissions, isLoading};
    }

    return {permissions: [], isLoading};
    
};

export default useGetPermissions;