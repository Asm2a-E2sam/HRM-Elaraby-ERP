import { useState } from "react";
import { useGetEmploymentStatusesQuery } from "../../redux/rtk/features/employemntStatus/employmentStatusApi";
import ViewBtn from "../Buttons/ViewBtn";
import CardCustom from "../CommonUi/CardCustom";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TablePagination from "../CommonUi/TablePagination";
import PageTitle from "../page-header/PageHeader";
import { useTranslation } from "react-i18next"; 

import AddEmploymentStatus from "./AddEmploymentStatus";

const EmploymentStatus = () => {
  const [pageConfig, setPageConfig] = useState({status: 'true', page:1, count:10});
  const { data, isLoading } = useGetEmploymentStatusesQuery(pageConfig);
  const { t } = useTranslation();
  const columns = [
    {
      id: 1,
      title: t("employee_status.id"),
      dataIndex: "id",
      key: "id",
    },
    {
      id: 2,
      title: t("employee_status.name"),
      dataIndex: "name",
      key: "name",
    },

    {
      id: 3,
      title: t("employee_status.color_code"),
      dataIndex: "colourValue",
      key: "colourValue",
      render: (colourValue) => (
        <div className='flex'>
          <div
            className='rounded border border-gray-200'
            style={{
              marginRight: "10px",
              width: "20px",
              height: "20px",
              backgroundColor: colourValue,
            }}
          ></div>
          {colourValue}
        </div>
      ),
    },

    {
      id: 4,
      title: t("employee_status.description"),
      dataIndex: "description",
      key: "description",
    },
    {
      id: 5,
      title: t("employee_status.action"),
      dataIndex: "id",
      key: "action",
      render: (id) => <ViewBtn path={`/admin/employment-status/${id}/`} />,
    },
  ];
  return (
    <div>
      <PageTitle title=
      {t("employee_status.back")} />

      <CardCustom
        title={t("employee_status.employment_status_list")}
        extra={
          <>
            <CreateDrawer
              permission={"create-employmentStatus"}
              title={t("employee_status.add_employment_status")}
              width={30}
            >
              <AddEmploymentStatus />
            </CreateDrawer>
          </>
        }
      >
        <TablePagination
          columns={columns}
          list={data?.getAllEmploymentStatus}
          total={data?.totalEmploymentStatus}
          setPageConfig={setPageConfig}
          loading={isLoading}
          csvFileName={"employment status"}
          permission={"readAll-employmentStatus"}
        />
      </CardCustom>
    </div>
  );
};

export default EmploymentStatus;
