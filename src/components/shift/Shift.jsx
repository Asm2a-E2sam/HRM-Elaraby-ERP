import dayjs from "dayjs";
import { useState } from "react";
import { useGetShiftsQuery } from "../../redux/rtk/features/shift/shiftApi";
import ViewBtn from "../Buttons/ViewBtn";
import CardCustom from "../CommonUi/CardCustom";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TablePagination from "../CommonUi/TablePagination";
import PageTitle from "../page-header/PageHeader";
import AddShift from "./AddShift";
import { useTranslation } from "react-i18next"; 

const Shift = (props) => {
  const { t } = useTranslation();

  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: "true",
  });
  const { data, isLoading } = useGetShiftsQuery(pageConfig);
  const columns = [
    {
      id: 1,
      title: t("shift.id"),
      dataIndex: "id",
      key: "id",
    },
    {
      id: 2,
      title: t("shift.name"),
      dataIndex: "name",
      key: "name",
    },

    {
      id: 3,
      title: t("shift.start_time"),
      dataIndex: "startTime",
      key: "startTime",
      render: (startTime) => dayjs(startTime).format("hh:mm A"),
    },

    {
      id: 4,
      title: t("shift.end_time"),
      dataIndex: "endTime",
      key: "endTime",
      render: (endTime) => dayjs(endTime).format("hh:mm A"),
    },
    {
      id: 5,
      title: t("shift.action"),
      dataIndex: "id",
      key: "action",
      render: (id) => <ViewBtn path={`/admin/shift/${id}/`} />,
    },
  ];
  return (
    <div>
      <PageTitle title={t("shift.back")} />
      <CardCustom
        title={t("shift.shift_list")}
        extra={
          <>
            <CreateDrawer
              permission={"create-shift"}
              title={t("shift.add_shift")}
              width={30}
            >
              <AddShift />
            </CreateDrawer>
          </>
        }
      >
        <TablePagination
          list={data?.getAllShift}
          total={data?.totalShift}
          columns={columns}
          csvFileName={"shift list"}
          loading={isLoading}
          setPageConfig={setPageConfig}
          permission={"readAll-shift"}
        />
      </CardCustom>
    </div>
  );
};

export default Shift;
