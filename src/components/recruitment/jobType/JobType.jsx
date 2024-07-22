import React, { useState } from "react";
import { useGetJobTypesQuery } from "../../../redux/rtk/features/recruitment/jobType/jobTypeApi";
import ViewBtn from "../../Buttons/ViewBtn";
import CardCustom from "../../CommonUi/CardCustom";
import CommonSearch from "../../CommonUi/CommonSearch";
import CreateDrawer from "../../CommonUi/CreateDrawer";
import StatusSelectionDropdown from "../../CommonUi/StatusSelectionDropdown";
import TablePagination from "../../CommonUi/TablePagination";
import PageTitle from "../../page-header/PageHeader";
import AddJobType from "./AddJobType";

const JobType = () => {
    const [pagConfig, setPageConfig] = useState({
        status: "true",
        page: 1,
        count: 10,
    });

    const { data, isLoading } = useGetJobTypesQuery(pagConfig);
    const columns = [
        {
            key: "id",
            title: "ID",
            dataIndex: "id",
        },
        {
            key: "jobTypeName",
            title: "Name",
            dataIndex: "jobTypeName",
        },
        {
            key: "action",
            title: "Action",
            dataIndex: "id",
            render: (id) => (
                <ViewBtn path={`/admin/recruitment/jobType/${id}`} />
            ),
        },
    ];
    return (
        <>
            <PageTitle title="back" />

            <CardCustom
                title={"Job Type"}
                extra={
                    <>
                        <StatusSelectionDropdown
                            setPageConfig={setPageConfig}
                        />
                        <CreateDrawer
                            permission={"create-jobType"}
                            title={"Job Type"}
                            width={35}
                        >
                            <AddJobType />
                        </CreateDrawer>
                    </>
                }
            >
                <CommonSearch setPageConfig={setPageConfig} />

                <TablePagination
                    columns={columns}
                    list={data?.getAllJobType}
                    total={data?.totalJobType}
                    setPageConfig={setPageConfig}
                    loading={isLoading}
                    csvFileName={"Job Type"}
                    permission={"readAll-jobType"}
                />
            </CardCustom>
        </>
    );
};

export default JobType;
