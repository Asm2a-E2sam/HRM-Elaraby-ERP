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

const Job = () => {
    const [pagConfig, setPageConfig] = useState({
        status: "true",
        page: 1,
        count: 10,
    });
    const { data, isLoading } = useGetJobsQuery(pagConfig);
    const columns = [
        {
            key: "id",
            title: "ID",
            dataIndex: "id",
        },
        {
            key: "jobTitle",
            title: "Title",
            dataIndex: "jobTitle",
        },
        {
            key: "jobCategory",
            title: "Job Category",
            dataIndex: "jobCategory",
            render: (jobCategory) => {
                return jobCategory.jobCategoryName;
            },
        },
        {
            key: "totalPosition",
            title: "Total Position",
            dataIndex: "totalPosition",
        },
        {
            key: "jobType",
            title: "Job Type",
            dataIndex: "jobType",
            render: (jobType) => {
                return jobType.jobTypeName;
            },
        },
        {
            key: "action",
            title: "Action",
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
            <PageTitle title="back" />

            <CardCustom
                title={"Job"}
                extra={
                    <>
                        <StatusSelectionDropdown
                            setPageConfig={setPageConfig}
                        />
                        <JobCategorySelection setPageConfig={setPageConfig} />
                        <JobLocationSelection setPageConfig={setPageConfig} />

                        <CreateDrawer
                            permission={"create-job"}
                            title={"Create Job"}
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
