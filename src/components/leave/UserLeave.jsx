import { Tag } from "antd";
import "bootstrap-icons/font/bootstrap-icons.css";

import dayjs from "dayjs";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetLeaveHistoryQuery } from "../../redux/rtk/features/leave/leaveApi";
import ViewBtn from "../Buttons/ViewBtn";
import CardCustom from "../CommonUi/CardCustom";
import TablePagination from "../CommonUi/TablePagination";
import BtnViewSvg from "../UI/Button/btnViewSvg";
import { useTranslation } from "react-i18next"; 

const UserLeave = (props) => {
  const { t } = useTranslation();
  const { id } = useParams("id");

  const [pageConfig, setPageConfig] = useState({page: 1, count: 10});
  const { data, isLoading } = useGetLeaveHistoryQuery({id, ...pageConfig});
  
  const columns = [
    {
      id: 1,
      title: t("leave.id"),
      dataIndex: "id",
      key: "id",
    },

    {
      id: 3,
      title: t("leave.leave_type"),
      dataIndex: "leaveType",
      key: "leaveType",
    },
    {
      id: 4,
      title: t("leave.leave_from"),
      key: "leaveFrom",
      render: ({leaveFrom, status, acceptLeaveFrom}) => {
        return status === 'ACCEPTED' ? dayjs(acceptLeaveFrom).format("DD-MM-YYYY") : dayjs(leaveFrom).format("DD-MM-YYYY");
      },
    },
    {
      id: 5,
      title: t("leave.leave_to"),
      key: "leaveTo",
      render: ({leaveTo, status, acceptLeaveTo}) => {
        return status === 'ACCEPTED' ? dayjs(acceptLeaveTo).format("DD-MM-YYYY") : dayjs(leaveTo).format("DD-MM-YYYY");
      },
    },
    {
      id: 6,
      title: t("leave.leave_duration"),
      dataIndex: "leaveDuration",
      key: "leaveDuration",
      render: (leaveDuration) => {
        if (leaveDuration > 1) {
          return <span>{leaveDuration} days</span>;
        } else {
          return <span>{leaveDuration} day</span>;
        }
      },
    },

    {
      id: 7,
      title: t("leave.status"),
      dataIndex: "status",
      key: "status",
      render: (status) => {
        if (status === "ACCEPTED") {
          return <Tag color='green'>{status.toUpperCase()}</Tag>;
        } else if (status === "REJECTED") {
          return <Tag color='red'>{status.toUpperCase()}</Tag>;
        } else {
          return <Tag color='orange'>{status.toUpperCase()}</Tag>;
        }
      },
    },

    {
      id: 7,
      title: t("leave.applied_on"),
      dataIndex: "createdAt",
      render: (createdAt) => dayjs(createdAt).format("DD-MM-YYYY"),
    },

    {
      id: 7,
      title: t("leave.action"),
      key: "action",
      render: ({ id }) => (
        <ViewBtn
          path={`/admin/leave/${id}`}
          text='View'
          icon={<BtnViewSvg />}
        />
      ),
    },
  ];
  return (
    <CardCustom title={t("leave.my_leave_application")}>
      <TablePagination
        columns={columns}
        list={data?.getAllLeaveByUser}
        total={data?.totalLeaveByUser}
        setPageConfig={setPageConfig}
        loading={isLoading}
        permission={"readSingle-leaveApplication"}
      />
    </CardCustom>
  );
};

export default UserLeave;
