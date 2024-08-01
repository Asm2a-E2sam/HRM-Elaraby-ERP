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
import { useTranslation } from "react-i18next"; 

const JobType = () => {
    const { t } = useTranslation();
    const [pagConfig, setPageConfig] = useState({
        status: "true",
        page: 1,
        count: 10,
    });

    const { data, isLoading } = useGetJobTypesQuery(pagConfig);
    const columns = [
        {
            key: "id",
            title: t("recruitment.id"),
            dataIndex: "id",
        },
        {
            key: "jobTypeName",
            title:  t("recruitment.name"),
            dataIndex: "jobTypeName",
        },
        {
            key: "action",
            title:  t("recruitment.action"),
            dataIndex: "id",
            render: (id) => (
                <ViewBtn path={`/admin/recruitment/jobType/${id}`} />
            ),
        },
    ];
    return (
        <>
            <PageTitle title={ t("recruitment.back")} />

            <CardCustom
                title={ t("recruitment.job_type")}
                extra={
                    <>
                        <StatusSelectionDropdown
                            setPageConfig={setPageConfig}
                        />
                        <CreateDrawer
                            permission={"create-jobType"}
                            title={ t("recruitment.job_type")}
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
