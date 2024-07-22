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

const JobInterview = () => {
    const [pagConfig, setPageConfig] = useState({
        status: "true",
        page: 1,
        count: 10,
    });
    const { data, isLoading } = useGetJobInterviewsQuery(pagConfig);
    const columns = [
        {
            key: "id",
            title: "ID",
            dataIndex: "id",
        },
        {
            key: "jobApplication",
            title: "Candidate Name",
            dataIndex: "jobApplication",
            render: (jobApplication) => jobApplication?.name,
        },
        {
            key: "jobApplication",
            title: "Applied For",
            dataIndex: "jobApplication",
            render: (jobApplication) => jobApplication?.job?.jobTitle,
        },
        {
            key: "scheduleDate",
            title: "Schedule Date",
            dataIndex: "scheduleDate",
        },
        {
            key: "scheduleTime",
            title: "Schedule Time",
            dataIndex: "scheduleTime",
            render: (scheduleTime) =>
                dayjs(`1970-01-01 ${scheduleTime}`, {
                    customParseFormat: "HH:mm:ss",
                }).format("h:mm A"),
        },
        {
            key: "interviewStatus",
            title: "Interview Status",
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
            title: "Action",
            dataIndex: "id",
            render: (id) => (
                <ViewBtn path={`/admin/recruitment/jobInterview/${id}`} />
            ),
        },
    ];
    return (
        <>
            <PageTitle title="back" />

            <CardCustom
                title={"Job Interview"}
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
                            title={"Job Interview"}
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
