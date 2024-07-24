import dayjs from "dayjs";
import { useState } from "react";
import { useGetDepartmentsQuery } from "../../redux/rtk/features/Department/departmentApi";
import ViewBtn from "../Buttons/ViewBtn";
import CardCustom from "../CommonUi/CardCustom";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TablePagination from "../CommonUi/TablePagination";
import PageTitle from "../page-header/PageHeader";
import AddDepartment from "./AddDepartment";
import { useTranslation } from "react-i18next"; 

const Department = () => {
  const { t } = useTranslation();
  const [pageConfig, setPageConfig] = useState({status: 'true', page:1, count: 10});
  const { data, isLoading } = useGetDepartmentsQuery(pageConfig);
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
      render: (id) => <ViewBtn path={`/admin/department/${id}/`} />,
    },
  ];
  return (
    <>
      <PageTitle title={t("user_list.back")} />
      <CardCustom
        title={t("user_list.department_list")}
        extra={
          <CreateDrawer
            permission={"create-department"}
            title= {t("user_list.create_department")}
            width={30}
          >
            <AddDepartment />
          </CreateDrawer>
        }
      >
        <TablePagination
          columns={columns}
          list={data?.getAllDepartment}
          total={data?.totalDepartment}
          setPageConfig={setPageConfig}
          permission={"readAll-department"}
          loading={isLoading}
          csvFileName={"departments"}
        />
      </CardCustom>
    </>
  );
};

export default Department;
