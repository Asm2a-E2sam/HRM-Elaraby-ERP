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

const JobCategory = () => {
  const [pagConfig, setPageConfig] = useState({
    status: "true",
    page: 1,
    count: 10,
  });
  const { data, isLoading } = useGetJobCategoriesQuery(pagConfig);
  const columns = [
    {
      key: "id",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "jobCategoryName",
      title: "Name",
      dataIndex: "jobCategoryName",
    },
    {
      key: "action",
      title: "Action",
      dataIndex: "id",
      render: (id) => <ViewBtn path={`/admin/recruitment/jobCategory/${id}`} />,
    },
  ];
  return (
    <>
      <PageTitle title='back' />

      <CardCustom
        title={"Job Category"}
        extra={
          <>
            <StatusSelectionDropdown setPageConfig={setPageConfig} />
            <CreateDrawer
              permission={"create-jobCategory"}
              title={"Job Category"}
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
