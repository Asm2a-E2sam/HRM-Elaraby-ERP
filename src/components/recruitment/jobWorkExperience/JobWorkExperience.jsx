import React, { useState } from "react";
import { useGetJobWorkExperiencesQuery } from "../../../redux/rtk/features/recruitment/jobWorkExperience/jobWorkExperienceApi";
import ViewBtn from "../../Buttons/ViewBtn";
import CardCustom from "../../CommonUi/CardCustom";
import CreateDrawer from "../../CommonUi/CreateDrawer";
import StatusSelectionDropdown from "../../CommonUi/StatusSelectionDropdown";
import TablePagination from "../../CommonUi/TablePagination";
import PageTitle from "../../page-header/PageHeader";
import AddJobWorkExperience from "./AddJobWorkExperience";
import { useTranslation } from "react-i18next"; 

const JobWorkExperience = () => {
    const { t } = useTranslation();
    const [pagConfig, setPageConfig] = useState({
        status: "true",
        page: 1,
        count: 10,
    });

    const { data, isLoading } = useGetJobWorkExperiencesQuery(pagConfig);
    const columns = [
        {
            key: "id",
            title: t("recruitment.id"),
            dataIndex: "id",
        },
        {
            key: "jobWorkExperience",
            title: t("recruitment.work_experience"),
            dataIndex: "workExperience",
        },
        {
            key: "action",
            title: t("recruitment.action"),
            dataIndex: "id",
            render: (id) => (
                <ViewBtn path={`/admin/recruitment/jobWorkExperience/${id}`} />
            ),
        },
    ];
    return (
        <>
            <PageTitle title={t("recruitment.back")} />

            <CardCustom
                title= {t("recruitment.job_work_experience")}
                extra={
                    <>
                        <StatusSelectionDropdown
                            setPageConfig={setPageConfig}
                        />
                        <CreateDrawer
                            permission={t("recruitment.job_work_experience")}
                            title={"Job Work Experience"}
                            width={35}
                        >
                            <AddJobWorkExperience />
                        </CreateDrawer>
                    </>
                }
            >
                <TablePagination
                    columns={columns}
                    list={data?.getAllJobWorkExperience}
                    total={data?.totalJobWorkExperience}
                    setPageConfig={setPageConfig}
                    loading={isLoading}
                    csvFileName={"Job Work Experience"}
                    permission={"readAll-jobWorkExperience"}
                />
            </CardCustom>
        </>
    );
};

export default JobWorkExperience;
