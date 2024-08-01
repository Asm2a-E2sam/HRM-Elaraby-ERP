import React, { useState } from "react";
import { useGetJobLocationsQuery } from "../../../redux/rtk/features/recruitment/jobLocation/jobLocationApi";
import ViewBtn from "../../Buttons/ViewBtn";
import CardCustom from "../../CommonUi/CardCustom";
import CommonSearch from "../../CommonUi/CommonSearch";
import CreateDrawer from "../../CommonUi/CreateDrawer";
import StatusSelectionDropdown from "../../CommonUi/StatusSelectionDropdown";
import TablePagination from "../../CommonUi/TablePagination";
import PageTitle from "../../page-header/PageHeader";
import AddJobLocation from "./AddJobLocation";
import { useTranslation } from "react-i18next"; 

const JobLocation = () => {
    const { t } = useTranslation();
    const [pagConfig, setPageConfig] = useState({
        status: "true",
        page: 1,
        count: 10,
    });
    const { data, isLoading } = useGetJobLocationsQuery(pagConfig);
    const columns = [
        {
            key: "id",
            title: t("recruitment.id"),
            dataIndex: "id",
        },
        {
            key: "countryName",
            title: t("recruitment.country"),
            dataIndex: "countryName",
        },
        {
            key: "jobLocation",
            title: t("recruitment.location"),
            dataIndex: "jobLocation",
        },
        {
            key: "action",
            title: t("recruitment.action"),
            dataIndex: "id",
            render: (id) => (
                <ViewBtn path={`/admin/recruitment/jobLocation/${id}`} />
            ),
        },
    ];
    return (
        <>
            <PageTitle title={t("recruitment.back")}/>

            <CardCustom
                title={t("recruitment.job_location")}
                extra={
                    <>
                        <StatusSelectionDropdown
                            setPageConfig={setPageConfig}
                        />
                        <CreateDrawer
                            permission={"create-jobLocation"}
                            title={"Job Location"}
                            width={35}
                        >
                            <AddJobLocation />
                        </CreateDrawer>
                    </>
                }
            >
                <CommonSearch setPageConfig={setPageConfig} />

                <TablePagination
                    columns={columns}
                    list={data?.getAllJobLocation}
                    total={data?.totalJobLocation}
                    setPageConfig={setPageConfig}
                    loading={isLoading}
                    csvFileName={"Job Location"}
                    permission={"readAll-jobLocation"}
                />
            </CardCustom>
        </>
    );
};

export default JobLocation;
