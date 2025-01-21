import dayjs from "dayjs";
import { useState } from "react";
import { useGetAwardsQuery } from "../../redux/rtk/features/award/awardApi";
import ViewBtn from "../Buttons/ViewBtn";
import CardCustom from "../CommonUi/CardCustom";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TablePagination from "../CommonUi/TablePagination";
import PageTitle from "../page-header/PageHeader";
import AddAward from "./AddAward";
import { useTranslation } from "react-i18next"; 

function GetAllAward() {
  const { t } = useTranslation();
  const [pageConfig, setPageConfig] = useState({page: 1, count: 10 , status: 'true'});
  const { data, isLoading } = useGetAwardsQuery(pageConfig);

  const columns = [
    {
      id: 1,
      title: t("award.id"),
      dataIndex: "id",
      key: "id",
    },
    {
      id: 2,
      title: t("award.name"),
      dataIndex: "name",
      key: "name",
    },

    {
      id: 3,
      title: t("award.description"),
      dataIndex: "description",
      key: "description",
    },

    {
      id: 3,
      title: t("award.created_at"),
      dataIndex: "createdAt",
      key: "addrcreatedAtess",
      render: (createdAt) => dayjs(createdAt).format("YYYY-MM-DD"),
    },
    {
      id: 4,
      title: t("award.action"),
      dataIndex: "id",
      key: "action",
      render: (id) => <ViewBtn path={`/admin/award/${id}/`} />,
    },
  ];

  return (
    <>
      <PageTitle title={t("award.back")} />

      <CardCustom
        title={t("award.award_list")}
        extra={
          <>
            <CreateDrawer
              permission={"create-award"}
              title={t("award.create_award")}
              width={30}
            >
              <AddAward />
            </CreateDrawer>
          </>
        }
      >
        <TablePagination
          csvFileName={"Award"}
          loading={isLoading}
          columns={columns}
          list={data?.getAllAward}
          total={data?.totalAward}
          setPageConfig={setPageConfig}
          permission={"readAll-award"}
        />
      </CardCustom>
    </>
  );
}

export default GetAllAward;
