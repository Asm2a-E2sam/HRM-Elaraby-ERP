import dayjs from "dayjs";
import { useState } from "react";
import { useGetRolesQuery } from "../../redux/rtk/features/role/roleApi";
import ViewBtn from "../Buttons/ViewBtn";
import CardCustom from "../CommonUi/CardCustom";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TablePagination from "../CommonUi/TablePagination";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import PageTitle from "../page-header/PageHeader";
import AddRole from "./AddRole";
import { useTranslation } from "react-i18next"; 

const RoleList = () => {
  const [pageConfig, setPageConfig] = useState({status: 'true', page:1, count: 10});
  const { data, isLoading } = useGetRolesQuery(pageConfig);
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
      dataIndex: "name",
      key: "name",
    },

    {
      id: 3,
      title: t("user_list.created_at"),
      dataIndex: "createdAt",
      key: "addrcreatedAtess",
      render: (createdAt) => dayjs(createdAt).format("YYYY-MM-DD"),
    },
    {
      id: 4,
      title: t("user_list.action"),
      dataIndex: "id",
      key: "action",
      render: (id) => (
        <>
          <UserPrivateComponent permission={"readSingle-role"}>
            <ViewBtn path={`/admin/role/${id}/`} />
          </UserPrivateComponent>
        </>
      ),
    },
  ];

  return (
    <div>
      <PageTitle title={t("back")} />
      <CardCustom
        title= {t("user_list.role_list")}
        extra={
          <>
            <CreateDrawer
              permission={"create-role"}
              title={t("user_list.create_role")}
              width={30}
            >
              <AddRole />
            </CreateDrawer>
          </>
        }
      >
        <TablePagination
          permission={"readAll-role"}
          columns={columns}
          list={data?.getAllRole}
          total={data?.totalRole}
          setPageConfig={setPageConfig}
          csvFileName={"Roles"}
          loading={isLoading}
        />
      </CardCustom>
    </div>
  );
};

export default RoleList;
