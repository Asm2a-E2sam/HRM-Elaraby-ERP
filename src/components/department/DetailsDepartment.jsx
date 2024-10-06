import { useParams } from "react-router-dom";
import {
    departmentApi,
    useGetDepartmentQuery,
} from "../../redux/rtk/features/Department/departmentApi";
import ViewBtn from "../Buttons/ViewBtn";
import CardCustom from "../CommonUi/CardCustom";
import CommonDelete from "../CommonUi/CommonDelete";
import TableNoPagination from "../CommonUi/TableNoPagination";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import DepartmentEditPopup from "../UI/PopUp/DepartmentEditPopup";
import PageTitle from "../page-header/PageHeader";
import { useTranslation } from "react-i18next"; 

const DetailDepartment = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const { data: department, isLoading } = useGetDepartmentQuery(id);
  const columns = [
    {
      id: 1,
      title:t("detail_department.id"),
      dataIndex: "id",
      key: "id",
    },

    {
      id: 2,
      title: t("detail_department.name"),
      key: "firstName",
      render: ({ firstName, lastName }) => firstName + " " + lastName,
    },

    {
      id: 6,
      title: t("detail_department.username"),
      dataIndex: "username",
      key: "username",
    },

    {
      id: 5,
      title: t("detail_department.role"),
      dataIndex: "role",
      key: "role",
      render: (role) => role?.name,
    },

    {
      id: 6,
      title: t("detail_department.designation"),
      dataIndex: "designationHistory",
      key: "designationHistory",
      render: (designationHistory) =>
        designationHistory[0]?.designation?.name || "N/A",
    },

    {
      id: 4,
      title: t("detail_department.action"),
      dataIndex: "id",
      key: "action",
      render: (id) => (
        <UserPrivateComponent permission={"readSingle-user"}>
          <ViewBtn path={`/admin/hr/staffs/${id}/`} />
        </UserPrivateComponent>
      ),
    },
  ];
  return (
    <div>
      <PageTitle title={t("detail_department.back")} />
      <UserPrivateComponent permission={"readSingle-department"}>
        <CardCustom
          title={
            <h3>
              {t("detail_department.id")} : {department?.id} | {department?.name}
            </h3>
          }
          extra={
            <>
              <DepartmentEditPopup data={department && department} />
              <CommonDelete
                permission={"delete-department"}
                deleteThunk={departmentApi.endpoints.deleteDepartment.initiate}
                id={id}
                navigatePath={"/admin/department"}
              />
            </>
          }
        >
          <TableNoPagination
            leftElement={
              <h1 className='p-2 font-semibold text-lg text-center'>
                {t("detail_department.user_list")} 
              </h1>
            }
            list={department?.user}
            loading={isLoading}
            columns={columns}
            permission={"readSingle-department"}
            csvFileName={"user of department"}
          />
        </CardCustom>
      </UserPrivateComponent>
    </div>
  );
};

export default DetailDepartment;
