import PageTitle from "../../page-header/PageHeader";
import AddProjectTeam from "./AddProjectTeam";

import { useState } from "react";
import {
  projectTeamApi,
  useGetProjectTeamsQuery,
} from "../../../redux/rtk/features/projectManagement/project/projectTeam/projectTeamApi";
import ViewBtn from "../../Buttons/ViewBtn";
import CardCustom from "../../CommonUi/CardCustom";
import CommonDelete from "../../CommonUi/CommonDelete";
import CreateDrawer from "../../CommonUi/CreateDrawer";
import TablePagination from "../../CommonUi/TablePagination";
import ProjectTeamStatusUpdatePopup from "../../UI/PopUp/ProjectManagemnet/ProjectTeamStatusUpdatePopup";
import { useTranslation } from "react-i18next"; 

const ProjectTeam = () => {
  const [pageConfig, setPageConfig] = useState({status: "true", page: 1, count: 10});
  const { data, isLoading } = useGetProjectTeamsQuery(pageConfig);
  const { t } = useTranslation();
  const columns = [
    {
      id: 1,
      title: t("team.id"),
      dataIndex: "id",
      key: "id",
    },
    {
      id: 2,
      title: t("team.status"),
      dataIndex: "status",
      key: "status",
      render: (status) => (status ? "True" : "False"),
    },
    {
      id: 3,
      title: t("team.team_name"),
      dataIndex: "projectTeamName",
      key: "projectTeamName",
    },
    {
      id: 4,
      title: t("team.action"),
      key: "action",
      render: ({ id, projectTeamName, status }) => (
        <div className='flex justify-start items-center'>
          <ViewBtn path={`/admin/team/${id}`} />
          <ProjectTeamStatusUpdatePopup
            projectId={id}
            teamName={projectTeamName}
            status={status}
          />
          <CommonDelete
            permission={"delete-projectTeam"}
            deleteThunk={projectTeamApi.endpoints.deleteProjectTeam.initiate}
            id={id}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageTitle title={t("team.back")} />

      <CardCustom
        title={t("team.team_list")}
        extra={
          <>
            <CreateDrawer
              permission={"create-projectTeam"}
              title={t("team.create_team")}
            >
              <AddProjectTeam />
            </CreateDrawer>
          </>
        }
      >
        <TablePagination
          loading={isLoading}
          columns={columns}
          list={data?.getAllProjectTeam}
          total={data?.totalProjectTeam}
          setPageConfig={setPageConfig}
          csvFileName={"Team list"}
          permission={"readAll-projectTeam"}
        />
      </CardCustom>
    </div>
  );
};

export default ProjectTeam;
