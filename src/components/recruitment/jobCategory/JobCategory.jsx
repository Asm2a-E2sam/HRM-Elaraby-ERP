import { useState } from "react";
import { useGetJobCategoriesQuery } from "../../../redux/rtk/features/recruitment/jobCategory/jobCategoryApi";
import ViewBtn from "../../Buttons/ViewBtn";
import CardCustom from "../../CommonUi/CardCustom";
import CommonSearch from "../../CommonUi/CommonSearch";
import CreateDrawer from "../../CommonUi/CreateDrawer";
import StatusSelectionDropdown from "../../CommonUi/StatusSelectionDropdown";
import TablePagination from "../../CommonUi/TablePagination";
import PageTitle from "../../page-header/PageHeader";
import AddJobCategory from "./AddJobCategory";
import { useTranslation } from "react-i18next"; 


const JobCategory = () => {
  const { t } = useTranslation();
  const [pagConfig, setPageConfig] = useState({
    status: "true",
    page: 1,
    count: 10,
  });
  const { data, isLoading } = useGetJobCategoriesQuery(pagConfig);
  const columns = [
    {
      key: "id",
      title: t("recruitment.id"),
      dataIndex: "id",
    },
    {
      key: "jobCategoryName",
      title: t("recruitment.name"),
      dataIndex: "jobCategoryName",
    },
    {
      key: "action",
      title: t("recruitment.action"),
      dataIndex: "id",
      render: (id) => <ViewBtn path={`/admin/recruitment/jobCategory/${id}`} />,
    },
  ];
  return (
    <>
      <PageTitle title={t("recruitment.back")} />

      <CardCustom
        title={t("recruitment.job_category")}
        extra={
          <>
            <StatusSelectionDropdown setPageConfig={setPageConfig} />
            <CreateDrawer
              permission={"create-jobCategory"}
              title={t("recruitment.job_category")}
              width={35}
            >
              <AddJobCategory />
            </CreateDrawer>
          </>
        }
      >
        <CommonSearch setPageConfig={setPageConfig} />

        <TablePagination
          columns={columns}
          list={data?.getAllJobCategory}
          total={data?.totalJobCategory}
          setPageConfig={setPageConfig}
          loading={isLoading}
          csvFileName={"Job Category"}
          permission={"readAll-jobCategory"}
        />
      </CardCustom>
    </>
  );
};

export default JobCategory;
