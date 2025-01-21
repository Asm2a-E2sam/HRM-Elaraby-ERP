import dayjs from "dayjs";
import React, { useState } from "react";
import { useGetJobInterviewsQuery } from "../../../redux/rtk/features/recruitment/jobInterview/jobInterviewApi";
import ViewBtn from "../../Buttons/ViewBtn";
import CardCustom from "../../CommonUi/CardCustom";
import CommonSearch from "../../CommonUi/CommonSearch";
import CreateDrawer from "../../CommonUi/CreateDrawer";
import InterviewStatusSelection from "../../CommonUi/InterviewStatusSelection";
import JobSelection from "../../CommonUi/JobSelection";
import ScheduleDateSelection from "../../CommonUi/ScheduleDateSelection";
import StatusSelectionDropdown from "../../CommonUi/StatusSelectionDropdown";
import TablePagination from "../../CommonUi/TablePagination";
import PageTitle from "../../page-header/PageHeader";
import AddJobInterview from "./AddJobInterview";
import { useTranslation } from "react-i18next"; 

const JobInterview = () => {
    const { t } = useTranslation();
    const [pagConfig, setPageConfig] = useState({
        status: "true",
        page: 1,
        count: 10,
    });
    const { data, isLoading } = useGetJobInterviewsQuery(pagConfig);
    const columns = [
        {
            key: "id",
            title: t("job_interview.id"),
            dataIndex: "id",
        },
        {
            key: "jobApplication",
            title: t("job_interview.candidate_name"),
            dataIndex: "jobApplication",
            render: (jobApplication) => jobApplication?.name,
        },
        {
            key: "jobApplication",
            title: t("job_interview.applied_for"),
            dataIndex: "jobApplication",
            render: (jobApplication) => jobApplication?.job?.jobTitle,
        },
        {
            key: "scheduleDate",
            title: t("job_interview.schedule_date"),
            dataIndex: "scheduleDate",
        },
        {
            key: "scheduleTime",
            title: t("job_interview.schedule_time"),
            dataIndex: "scheduleTime",
            render: (scheduleTime) =>
                dayjs(`1970-01-01 ${scheduleTime}`, {
                    customParseFormat: "HH:mm:ss",
                }).format("h:mm A"),
        },
        {
            key: "interviewStatus",
            title: t("job_interview.interview_status"),
            dataIndex: "interviewStatus",
            render: (interviewStatus) => (
                <span
                    className={`${
                        interviewStatus === "PENDING"
                            ? `text-yellow-600 bg-yellow-100`
                            : `text-green-700 bg-green-100`
                    } font-bold`}
                >
                    {interviewStatus}
                </span>
            ),
        },
        {
            key: "action",
            title: t("job_interview.action"),
            dataIndex: "id",
            render: (id) => (
                <ViewBtn path={`/admin/recruitment/jobInterview/${id}`} />
            ),
        },
    ];
    return (
        <>
            <PageTitle title={t("job_interview.back")} />

            <CardCustom
                title={t("job_interview.job_interview")}
                extra={
                    <>
                        <StatusSelectionDropdown
                            setPageConfig={setPageConfig}
                        />
                        <InterviewStatusSelection
                            setPageConfig={setPageConfig}
                        />
                        <JobSelection setPageConfig={setPageConfig} />
                        <ScheduleDateSelection setPageConfig={setPageConfig} />

                        <CreateDrawer
                            permission={"create-jobInterview"}
                            title={t("job_interview.job_interview")}
                            width={35}
                        >
                            <AddJobInterview />
                        </CreateDrawer>
                    </>
                }
            >
                <CommonSearch setPageConfig={setPageConfig} />

                <TablePagination
                    columns={columns}
                    list={data?.getAllJobInterview}
                    total={data?.totalJobInterview}
                    setPageConfig={setPageConfig}
                    loading={isLoading}
                    csvFileName={"Job Interview"}
                    permission={"readAll-jobInterview"}
                />
            </CardCustom>
        </>
    );
};

export default JobInterview;
