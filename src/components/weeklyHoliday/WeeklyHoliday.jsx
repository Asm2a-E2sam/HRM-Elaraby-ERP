import CardCustom from "../CommonUi/CardCustom";
import PageTitle from "../page-header/PageHeader";

import { useState } from "react";
import { useGetWeeklyHolidaysQuery } from "../../redux/rtk/features/weeklyHoliday/weeklyHolidayApi";
import ViewBtn from "../Buttons/ViewBtn";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TablePagination from "../CommonUi/TablePagination";
import AddWeeklyHoliday from "./AddWeeklyHoliday";
import { useTranslation } from "react-i18next"; 

const WeeklyHoliday = () => {
    const { t } = useTranslation();
    const [pagConfig, setPageConfig] = useState({
        status: "true",
        page: 1,
        count: 10,
    });
    const { data, isLoading } = useGetWeeklyHolidaysQuery(pagConfig);
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
            title: t("holiday.start_date"),
            dataIndex: "startDay",
            key: "startDay",
        },

        {
            id: 3,
            title: t("holiday.end_date"),
            dataIndex: "endDay",
            key: "endDay",
        },
        {
            id: 4,
            title: t("holiday.action"),
            dataIndex: "id",
            key: "action",
            render: (id) => <ViewBtn path={`/admin/holiday/week/${id}/`} />,
        },
    ];
    return (
        <>
            <PageTitle title={t("holiday.back")} />
            <CardCustom
                title={t("holiday.weekly_holiday_list")}
                extra={
                    <>
                        <CreateDrawer
                            permission={"create-weeklyHoliday"}
                            title={t("holiday.create_weekly_holiday")}
                            width={35}
                        >
                            <AddWeeklyHoliday />
                        </CreateDrawer>
                    </>
                }
            >
                <TablePagination
                    columns={columns}
                    list={data?.getAllWeeklyHoliday}
                    total={data?.totalWeeklyHoliday}
                    setPageConfig={setPageConfig}
                    loading={isLoading}
                    csvFileName={"Weekly holiday"}
                    permission={"readAll-weeklyHoliday"}
                />
            </CardCustom>
        </>
    );
};

export default WeeklyHoliday;
