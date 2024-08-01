import { Card, Table } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  milestoneApi,
  useGetMilestoneByProjectIdQuery,
} from "../../../redux/rtk/features/projectManagement/project/milestone/milestoneApi";
import UpdateBtn from "../../Buttons/UpdateBtn";
import CommonDelete from "../../CommonUi/CommonDelete";
import PageTitle from "../../page-header/PageHeader";
import AddMilestone from "./AddMilestone";
import { useTranslation } from "react-i18next"; 

const Milestone = ({ isFixed }) => {
  const { id } = useParams("id");
  const { t } = useTranslation();

  const { isLoading: loading, data: list } =
    useGetMilestoneByProjectIdQuery(id);
  const [columnsToShow, setColumnsToShow] = useState([]);

  useEffect(() => {
    setColumnsToShow(columns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      id: 1,
      title:t("milestone.id"),
      dataIndex: "id",
      key: "id",
    },
    {
      id: 2,
      title:t("milestone.name"),
      dataIndex: "name",
      key: "name",
    },

    {
      id: 4,
      title:t("milestone.start_date"),
      key: "startDate",
      render: ({ startDate }) => dayjs(startDate).format("DD/MM/YYYY"),
    },
    {
      id: 5,
      title:t("milestone.end_date"),
      key: "endDate",
      render: ({ endDate }) => dayjs(endDate).format("DD/MM/YYYY"),
    },
    {
      id: 5,
      title:t("milestone.action"),
      dataIndex: "id",
      key: "action",
      render: (id) => (
        <div className='flex justify-start'>
          <UpdateBtn path={`/admin/milestone/update/${id}`} />
          <CommonDelete
            permission={"delete-milestone"}
            deleteThunk={milestoneApi.endpoints.deleteMilestone.initiate}
            id={id}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageTitle title={t("milestone.back")} />
      <AddMilestone isFixed={isFixed} />
      {isFixed && (
        <Card>
          <h1 className='text-xl mb-5'>{t("milestone.milestones_in_project")} </h1>
          <Table
            scroll={{ x: true }}
            loading={loading}
            pagination={{
              defaultPageSize: 20,
            }}
            columns={columnsToShow}
            dataSource={list}
          />
        </Card>
      )}
    </div>
  );
};

export default Milestone;
