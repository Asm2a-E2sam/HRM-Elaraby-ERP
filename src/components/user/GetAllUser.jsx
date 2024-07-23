import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";

import { useGetUsersQuery } from "../../redux/rtk/features/user/userApi";
import AttendBtn from "../Buttons/AttendBtn";
import ViewBtn from "../Buttons/ViewBtn";
import CardCustom from "../CommonUi/CardCustom";
import CreateDrawer from "../CommonUi/CreateDrawer";
import StatusSelection from "../CommonUi/StatusSelection";
import TablePagination from "../CommonUi/TablePagination";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import AddUser from "./addUser";
import { useTranslation } from "react-i18next"; 

const GetAllUser = () => {
  const [pageConfig, setPageConfig] = useState({ status: "true", page:1, count:10 });
  const { data, isLoading } = useGetUsersQuery(pageConfig);
  const { t } = useTranslation();
  const columns = [
    {
      id: 1,
      title: t("user_list.id"),
      dataIndex: "id",
      key: "id",
    },
    {
      id: 2,
      title: t("user_list.name"),
      key: "fullName",
      render: ({ firstName, lastName }) =>
        (firstName + " " + lastName).toUpperCase(),
    },
    {
      id: 3,
      title: t("user_list.username"),
      dataIndex: "username",
      key: "username",
    },

    {
      id: 5,
      title: t("user_list.designation"),
      dataIndex: "designationHistory",
      key: "designationHistory",
      render: (record) =>
        record?.length > 0 ? record[0].designation.name : "N/A",
    },

    {
      id: 6,
      title: t("user_list.e_status"),
      dataIndex: "employmentStatus",
      key: "employmentStatus",
      render: (record) => (record?.name ? record?.name : "N/A"),
    },
    {
      id: 8,
      title: t("user_list.department"),
      dataIndex: "department",
      key: "department",
      render: (record) => (record?.name ? record?.name : "N/A"),
    },

    {
      id: 9,
      title: t("user_list.shift"),
      dataIndex: "shift",
      key: "shift",
      render: (record) => (record?.name ? record?.name : "N/A"),
    },

    {
      id: 7,
      title: t("user_list.action"),
      dataIndex: "id",
      key: "action",
      render: (id) => (
        <div className='flex justify-start'>
          <UserPrivateComponent permission={"readSingle-user"}>
            <ViewBtn path={`/admin/hr/staffs/${id}/`} />
          </UserPrivateComponent>
          <UserPrivateComponent permission={"readSingle-attendance"}>
            <AttendBtn path={`/admin/attendance/user/${id}`} />
          </UserPrivateComponent>
        </div>
      ),
    },
  ];

  return (
    <CardCustom
      title={t("user_list.user_list")}
      extra={
        <>
          <StatusSelection setPageConfig={setPageConfig} />
          <CreateDrawer
            permission={"create-user"}
            title={t("user_list.create_user")}
            width={100}
          >
            <AddUser />
          </CreateDrawer>
        </>
      }
    >
      <TablePagination
        list={data?.getAllUser}
        total = {data?.totalUser}
        loading={isLoading}
        setPageConfig ={setPageConfig}
        permission={"readAll-user"}
        csvFileName={"users"}
        columns={columns}
      />
    </CardCustom>
  );
};

export default GetAllUser;
