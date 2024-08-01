import { DatePicker } from "antd";
import "bootstrap-icons/font/bootstrap-icons.css";
import dayjs from "dayjs";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetTransactionsQuery } from "../../redux/rtk/features/transaction/transactionApi";
import CardCustom from "../CommonUi/CardCustom";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TablePagination from "../CommonUi/TablePagination";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import AddTransaction from "./AddTransaction";
import { useTranslation } from "react-i18next"; 

const GetAllTransaction = () => {
  const { t } = useTranslation();
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: "true",
    startdate: dayjs().startOf("month").format("YYYY-MM-DD"),
    enddate: dayjs().endOf("month").format("YYYY-MM-DD"),
  });
  const { data, isLoading } = useGetTransactionsQuery(pageConfig);
  const { RangePicker } = DatePicker;

  const onCalendarChange = (dates) => {
    const startdate = (dates?.[0]).format("YYYY-MM-DD");
    const enddate = (dates?.[1]).format("YYYY-MM-DD");
    setPageConfig((prev) => {
      return { ...prev, startdate, enddate };
    });
  };

  const columns = [
    {
      id: 1,
      title: t("transaction.id"),
      dataIndex: "id",
      key: "id",
      render: (id) => <Link to={`/admin/transaction/${id}`}>{id}</Link>,
    },
    {
      id: 2,
      title: t("transaction.date"),
      dataIndex: "date",
      key: "date",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },

    {
      id: 3,
      title: t("transaction.debit_account"),
      dataIndex: "debit",
      key: "debit",
      render: (debit) => debit?.name,
    },

    {
      id: 4,
      title: t("transaction.credit_account"),
      dataIndex: "credit",
      key: "credit",
      render: (credit) => credit?.name,
    },

    {
      id: 5,
      title: t("transaction.amount"),
      dataIndex: "amount",
      key: "amount",
      responsive: ["md"],
    },
    {
      id: 6,
      title: t("transaction.particulars"),
      dataIndex: "particulars",
      key: "particulars",
    },
  ];

  return (
    <UserPrivateComponent permission={"readAll-transaction"}>
      <CardCustom
        title={t("transaction.transaction_history")}
        extra={
          <>
            <RangePicker
              className='range-picker max-w-[350px]'
              onCalendarChange={onCalendarChange}
              defaultValue={[
                dayjs(pageConfig.startdate, "YYYY-MM-DD"),
                dayjs(pageConfig.enddate, "YYYY-MM-DD"),
              ]}
            />
            <CreateDrawer
              permission={"create-transaction"}
              title={t("transaction.add_transaction")}
              width={30}
            >
              <AddTransaction />
            </CreateDrawer>
          </>
        }
      >
        <TablePagination
          permission={"readAll-transaction"}
          columns={columns}
          csvFileName={"Transactions"}
          list={data?.allTransaction}
          total={data?.aggregations?._count.id}
          loading={isLoading}
          setPageConfig={setPageConfig}
        />
      </CardCustom>
    </UserPrivateComponent>
  );
};

export default GetAllTransaction;
