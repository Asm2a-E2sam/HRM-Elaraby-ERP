import { useState } from "react";
import CardCustom from "../CommonUi/CardCustom";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TablePagination from "../CommonUi/TablePagination";
import PageTitle from "../page-header/PageHeader";

import dayjs from "dayjs";
import { useGetPublicHolidaysQuery } from "../../redux/rtk/features/publicHoliday/publicHolidayApi";
import ViewBtn from "../Buttons/ViewBtn";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import AddPublicHoliday from "./AddPublicHoliday";
import { useTranslation } from "react-i18next"; 

const PublicHoliday = () => {
    const { t } = useTranslation();

    const [pageConfig, setPageConfig] = useState({
        page: 1,
        count: 10,
        status: "true",
    });
    const { data, isLoading } = useGetPublicHolidaysQuery(pageConfig);

    const columns = [
        {
            id: 1,
            title: t("holiday.id"),
            dataIndex: "id",
            key: "id",
        },
        {
            id: 2,
            title: t("holiday.name"),
            dataIndex: "name",
            key: "name",
        },

        {
            id: 3,
            title: t("holiday.action"),
            dataIndex: "date",
            key: "date",
            render: (date) => dayjs(date).format("DD/MM/YYYY"),
        },

        {
            id: 3,
            title: t("holiday.created_at"),
            dataIndex: "createdAt",
            key: "createdAt",
            render: (createdAt) => dayjs(createdAt).format("DD/MM/YYYY"),
        },
        {
            id: 4,
            title: t("holiday.action"),
            dataIndex: "id",
            key: "action",
            render: (id) => (
                <UserPrivateComponent permission={"readSingle-publicHoliday"}>
                    <ViewBtn path={`/admin/holiday/public/${id}/`} />
                </UserPrivateComponent>
            ),
        },
    ];
    return (
        <>
            <PageTitle title={t("holiday.back")} />
            <CardCustom
                title={t("holiday.public_holiday_list")}
                extra={
                    <>
                        <CreateDrawer
                            permission={"create-publicHoliday"}
                            title={t("holiday.create_public_holiday")}
                            width={35}
                        >
                            <AddPublicHoliday />
                        </CreateDrawer>
                    </>
                }
            >
                <TablePagination
                    columns={columns}
                    list={data?.getAllPublicHoliday}
                    total={data?.totalPublicHoliday}
                    setPageConfig={setPageConfig}
                    loading={isLoading}
                    csvFileName={"Public holyday list"}
                    permission={"readAll-publicHoliday"}
                />
            </CardCustom>
        </>
    );
};

export default PublicHoliday;
