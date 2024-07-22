import React, { useState } from "react";
import { useGetJobWorkExperiencesQuery } from "../../../redux/rtk/features/recruitment/jobWorkExperience/jobWorkExperienceApi";
import ViewBtn from "../../Buttons/ViewBtn";
import CardCustom from "../../CommonUi/CardCustom";
import CreateDrawer from "../../CommonUi/CreateDrawer";
import StatusSelectionDropdown from "../../CommonUi/StatusSelectionDropdown";
import TablePagination from "../../CommonUi/TablePagination";
import PageTitle from "../../page-header/PageHeader";
import AddJobWorkExperience from "./AddJobWorkExperience";

const JobWorkExperience = () => {
    const [pagConfig, setPageConfig] = useState({
        status: "true",
        page: 1,
        count: 10,
    });

    const { data, isLoading } = useGetJobWorkExperiencesQuery(pagConfig);
    const columns = [
        {
            key: "id",
            title: "ID",
            dataIndex: "id",
        },
        {
            key: "jobWorkExperience",
            title: "Work Experience",
            dataIndex: "workExperience",
        },
        {
            key: "action",
            title: "Action",
            dataIndex: "id",
            render: (id) => (
                <ViewBtn path={`/admin/recruitment/jobWorkExperience/${id}`} />
            ),
        },
    ];
    return (
        <>
            <PageTitle title="back" />

            <CardCustom
                title={"Job Work Experience"}
                extra={
                    <>
                        <StatusSelectionDropdown
                            setPageConfig={setPageConfig}
                        />
                        <CreateDrawer
                            permission={"create-jobWorkExperience"}
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
