import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetDesignationsQuery } from "../../redux/rtk/features/designation/designationApi";
import ViewBtn from "../Buttons/ViewBtn";
import CardCustom from "../CommonUi/CardCustom";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TablePagination from "../CommonUi/TablePagination";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import AddDesignation from "./addDesignation";
import { useTranslation } from "react-i18next"; 

const GetAllDesignation = () => {
  const [pageConfig, setPageConfig] = useState({status: 'true', page:1, count: 10})
  const { data, isLoading: loading } = useGetDesignationsQuery(pageConfig);
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
      render: (name, { id }) => (
        <Link to={`/admin/designation/${id}`}>{name}</Link>
      ),
    },

    {
      id: 3,
      title: t("user_list.action"),
      key: "action",
      render: ({ id }) => (
        <UserPrivateComponent permission={"readSingle-designation"}>
          <ViewBtn path={`/admin/designation/${id}`} />
        </UserPrivateComponent>
      ),
    },
  ];
  return (
    <CardCustom
      title={t("user_list.designation_list")}
      extra={
        <>
          <CreateDrawer
            permission={"create-designation"}
            title={t("user_list.create_designation")}
            width={30}
          >
            <AddDesignation />
          </CreateDrawer>
        </>
      }
    >
      <TablePagination
        columns={columns}
        list={data?.getAllDesignation}
        total={data?.totalDesignation}
        setPageConfig={setPageConfig}
        loading={loading}
        csvFileName={"designations"}
        permission={"readAll-designation"}
      />
    </CardCustom>
  );
};

export default GetAllDesignation;
