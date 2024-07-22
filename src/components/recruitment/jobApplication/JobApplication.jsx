import dayjs from "dayjs";
import React, { useState } from "react";
import { useGetJobApplicationsQuery } from "../../../redux/rtk/features/recruitment/jobApplication/jobApplicationApi";
import ViewBtn from "../../Buttons/ViewBtn";
import ApplicationStatusSelection from "../../CommonUi/ApplicationStatusSelection";
import CardCustom from "../../CommonUi/CardCustom";
import CommonSearch from "../../CommonUi/CommonSearch";
import CreateDrawer from "../../CommonUi/CreateDrawer";
import JobSelection from "../../CommonUi/JobSelection";
import StatusSelectionDropdown from "../../CommonUi/StatusSelectionDropdown";
import TablePagination from "../../CommonUi/TablePagination";
import PageTitle from "../../page-header/PageHeader";
import AddJobApplication from "./AddJobApplication";

const JobApplication = () => {
    const [pagConfig, setPageConfig] = useState({
        status: "true",
        page: 1,
        count: 10,
    });

    const { data, isLoading } = useGetJobApplicationsQuery(pagConfig);

    const columns = [
        {
            key: "id",
            title: "ID",
            dataIndex: "id",
        },
        {
            key: "job",
            title: "Job Title",
            dataIndex: "job",
            render: (job) => {
                return job?.jobTitle;
            },
        },
        {
            key: "name",
            title: "Candidate",
            dataIndex: "name",
        },
        {
            key: "createdAt",
            title: "Application Date",
            dataIndex: "createdAt",
            render: (createdAt) => dayjs(createdAt).format("DD/MM/YYYY"),
        },
        {
            key: "applicationStatus",
            title: "Status",
            dataIndex: "jobApplicationStatus",
            render: (jobApplicationStatus) => (
                <span
                    className={`${
                        jobApplicationStatus.applicationStatus === "APPLIED"
                            ? `text-gray-700 bg-gray-100`
                            : jobApplicationStatus.applicationStatus ===
                              "REVIEWING"
                            ? `text-yellow-600 bg-yellow-100`
                            : jobApplicationStatus.applicationStatus ===
                              "SELECTED FOR INTERVIEW"
                            ? `text-green-600 bg-green-100`
                            : jobApplicationStatus.applicationStatus ===
                              "INTERVIEWING"
                            ? `text-yellow-600 bg-yellow-100`
                            : jobApplicationStatus.applicationStatus ===
                              "INTERVIEWED"
                            ? `text-orange-700 bg-orange-100`
                            : jobApplicationStatus.applicationStatus === "HIRED"
                            ? `text-green-700 bg-green-100`
                            : `text-red-600 bg-red-100`
                    } font-bold`}
                >
                    {jobApplicationStatus.applicationStatus}
                </span>
            ),
        },
        {
            key: "action",
            title: "Action",
            dataIndex: "id",
            render: (id) => (
                <>
                    <div className="flex flex-row">
                        <ViewBtn
                            path={`/admin/recruitment/jobApplication/${id}`}
                        />
                    </div>
                </>
            ),
        },
    ];
    return (
        <>
            <PageTitle title="back" />

            <CardCustom
                title={"Job Application"}
                extra={
                    <>
                        <StatusSelectionDropdown
                            setPageConfig={setPageConfig}
                        />
                        <ApplicationStatusSelection
                            setPageConfig={setPageConfig}
                        />
                        <JobSelection setPageConfig={setPageConfig} />

                        <CreateDrawer
                            permission={"create-jobApplication"}
                            title={"Create JobApplication"}
                            width={42}
                        >
                            <AddJobApplication />
                        </CreateDrawer>
                    </>
                }
            >
                <CommonSearch setPageConfig={setPageConfig} />

                <TablePagination
                    columns={columns}
                    list={data?.getAllJobApplication}
                    total={data?.totalJobApplication}
                    setPageConfig={setPageConfig}
                    loading={isLoading}
                    csvFileName={"Job Application"}
                    permission={"readAll-jobApplication"}
                />
            </CardCustom>
        </>
    );
};

export default JobApplication;
