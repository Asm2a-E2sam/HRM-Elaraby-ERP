import { Tooltip } from "antd";
import React, { useState } from "react";
import {
    jobApi,
    useGetJobsQuery,
} from "../../../redux/rtk/features/recruitment/job/jobApi";
import UpdateBtn from "../../Buttons/UpdateBtn";
import ViewBtn from "../../Buttons/ViewBtn";
import CardCustom from "../../CommonUi/CardCustom";
import CommonDelete from "../../CommonUi/CommonDelete";
import CommonSearch from "../../CommonUi/CommonSearch";
import CreateDrawer from "../../CommonUi/CreateDrawer";
import JobCategorySelection from "../../CommonUi/JobCategorySelection";
import JobLocationSelection from "../../CommonUi/JobLocationSelection";
import StatusSelectionDropdown from "../../CommonUi/StatusSelectionDropdown";
import TablePagination from "../../CommonUi/TablePagination";
import PageTitle from "../../page-header/PageHeader";
import AddJob from "./AddJob";
import { useTranslation } from "react-i18next"; 

const Job = () => {
    const { t } = useTranslation();
    const [pagConfig, setPageConfig] = useState({
        status: "true",
        page: 1,
        count: 10,
    });
    const { data, isLoading } = useGetJobsQuery(pagConfig);
    const columns = [
        {
            key: "id",
            title: t("recruitment.id"),
            dataIndex: "id",
        },
        {
            key: "jobTitle",
            title: t("recruitment.title"),
            dataIndex: "jobTitle",
        },
        {
            key: "jobCategory",
            title: t("recruitment.job_category"),
            dataIndex: "jobCategory",
            render: (jobCategory) => {
                return jobCategory.jobCategoryName;
            },
        },
        {
            key: "totalPosition",
            title: t("recruitment.total_position"),
            dataIndex: "totalPosition",
        },
        {
            key: "jobType",
            title: t("recruitment.job_type"),
            dataIndex: "jobType",
            render: (jobType) => {
                return jobType.jobTypeName;
            },
        },
        {
            key: "action",
            title: t("recruitment.action"),
            dataIndex: "id",
            render: (id) => (
                <>
                    <div className="flex flex-row">
                        <ViewBtn path={`/admin/recruitment/job/${id}`} />
                        <UpdateBtn
                            path={`/admin/recruitment/job/update/${id}`}
                        />
                        <Tooltip title="Delete">
                            <CommonDelete
                                permission={"delete-jobCategory"}
                                deleteThunk={
                                    jobApi.endpoints.deleteJob.initiate
                                }
                                id={id}
                            />
                        </Tooltip>
                    </div>
                </>
            ),
        },
    ];
    return (
        <>
            <PageTitle title={t("recruitment.back")} />

            <CardCustom
                title={t("recruitment.job")}
                extra={
                    <>
                        <StatusSelectionDropdown
                            setPageConfig={setPageConfig}
                        />
                        <JobCategorySelection setPageConfig={setPageConfig} />
                        <JobLocationSelection setPageConfig={setPageConfig} />

                        <CreateDrawer
                            permission={"create-job"}
                            title={t("recruitment.create_job")}
                            width={82}
                        >
                            <AddJob />
                        </CreateDrawer>
                    </>
                }
            >
                <CommonSearch setPageConfig={setPageConfig} />

                <TablePagination
                    columns={columns}
                    list={data?.getAllJob}
                    total={data?.totalJob}
                    setPageConfig={setPageConfig}
                    loading={isLoading}
                    csvFileName={"Job"}
                    permission={"readAll-job"}
                />
            </CardCustom>
        </>
    );
};

export default Job;
