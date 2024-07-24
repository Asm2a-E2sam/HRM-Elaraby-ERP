import { Segmented, Tag } from "antd";
import "bootstrap-icons/font/bootstrap-icons.css";
import dayjs from "dayjs";
import { useState } from "react";
import { useGetLeavesByStatusQuery } from "../../redux/rtk/features/leave/leaveApi";
import ViewBtn from "../Buttons/ViewBtn";
import CardCustom from "../CommonUi/CardCustom";
import TablePagination from "../CommonUi/TablePagination";
import BtnAllSvg from "../UI/Button/btnAllSvg";
import BtnViewSvg from "../UI/Button/btnViewSvg";
import { useTranslation } from "react-i18next"; 

const GetAllLeaves = (props) => {
  const { t } = useTranslation();
  const [pageConfig, setPageConfig] = useState({
    value: "all",
    page: 1,
    count: 10
  });
  const [status, setStatus] = useState("true");
  const { data, isLoading } = useGetLeavesByStatusQuery(pageConfig);

  const columns = [
    {
      id: 1,
      title: t("leave.id"),
      dataIndex: "id",
      key: "id",
    },

    {
      id: 2,
      title: t("leave.name"),
      key: "name",
      dataIndex: "user",
      render: ({ firstName, lastName }) => firstName + " " + lastName,
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
  //make a onChange function
  const onChange = (value) => {
    setStatus(value);
    setPageConfig({ page: 1, count: 20, status: value });
  };
  const onAllClick = () => {
    setPageConfig({
      value: "all",
      page: 1,
      count: 10
    });
  };
  return (
    <CardCustom
      title={t("leave.leave_application")}
      extra={
        <>
          <div className="ml-2 mt-0.5">
            <div className="bg-green-500 flex justify-between hover:bg-emerald-500 text-white font-bold py-1 px-3 rounded mr-2">
              <button onClick={onAllClick}>
                <BtnAllSvg size={15} title={"ALL"} />
              </button>
            </div>
          </div>
          <Segmented
            className="text-center rounded text-red-500"
            size="middle"
            defaultValue={"accepted"}
            options={[
              {
                label: (
                  <span>
                    <i className="bi bi-person-lines-fill"></i> {t("leave.accepted")}
                  </span>
                ),
                value: "accepted",
              },
              {
                label: (
                  <span>
                    <i className="bi bi-person-dash-fill"></i> {t("leave.pending")}
                  </span>
                ),
                value: "pending",
              },
            ]}
            value={status}
            onChange={onChange}
          />
        </>
      }
    >
      <TablePagination
        columns={columns}
        list={data?.getAllLeave}
        total={data?.totalLeave}
        csvFileName={"Leave Applications"}
        permission={"readAll-leaveApplication"}
        loading={isLoading}
        setPageConfig={setPageConfig}
      />
    </CardCustom>
  );
};

export default GetAllLeaves;
