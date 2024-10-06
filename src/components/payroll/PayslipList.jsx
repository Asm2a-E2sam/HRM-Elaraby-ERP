import { DollarCircleFilled, EyeFilled } from "@ant-design/icons";
import { Button, DatePicker, Radio, Tooltip } from "antd";
import React from "react";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useAddPaymentMutation } from "../../redux/rtk/features/payment/paymentApi";
import { useGetPayslipForPaymentMonthWiseQuery } from "../../redux/rtk/features/payroll/payrollApi";
import CardCustom from "../CommonUi/CardCustom";
import TablePagination from "../CommonUi/TablePagination";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import PageTitle from "../page-header/PageHeader";
import { useTranslation } from "react-i18next"; 

const PayslipList = () => {
  const [pageConfig, setPageConfig] = useState({page:1, count:10});
  const { data: payroll, isLoading } =
    useGetPayslipForPaymentMonthWiseQuery(pageConfig);
  const [addPayslipPayment, { isLoading: loading }] = useAddPaymentMutation();
  const { t } = useTranslation();

  const onMonthChange = (date, dateString) => {
    setPageConfig((prev) => {
      return { ...prev, value: "monthWise", salaryMonth: dateString };
    });
  };

  const onYearChange = (date, dateString) => {
    setPageConfig((prev) => {
      return { ...prev, value: "monthWise", salaryYear: dateString };
    });
  };

  const options = [
    {
      label: "ALL",
      value: "ALL",
    },
    {
      label: "PAID",
      value: "PAID",
    },
    {
      label: "UNPAID",
      value: "UNPAID",
    },
  ];

  const onChange4 = ({ target: { value } }) => {
    if(value === 'ALL'){
        setPageConfig((prev) => {
          return {page:1, count:10};
        });
    }else{
        setPageConfig((prev) => {
          return { ...prev, value: "monthWise", paymentStatus: value };
        });
    }
  };

  const columns = [
    {
      title: t("payslip_list.id"),
      dataIndex: "id",
      key: "id",
    },
    {
      title: t("payslip_list.name"),
      key: "name",
      dataIndex: "user",
      render: (user) => `${user?.firstName} ${user?.lastName}`,
    },

    {
      title: t("payslip_list.salary"),
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: t("payslip_list.salary_payable"),
      dataIndex: "salaryPayable",
      key: "salaryPayable",
    },
    {
      title: t("payslip_list.month"),
      key: "month",
      render: ({ salaryMonth }) => `${salaryMonth}`,
    },
    {
      title: t("payslip_list.year"),
      key: "year",
      render: ({ salaryYear }) => `${salaryYear}`,
    },

    {
      title: t("payslip_list.bonus"),
      dataIndex: "bonus",
      key: "bonus",
    },

    {
      title: t("payslip_list.bonus_comment"),
      dataIndex: "bonusComment",
      key: "bonusComment",
    },

    {
      title: t("payslip_list.deduction"),
      dataIndex: "deduction",
      key: "deduction",
    },

    {
      title: t("payslip_list.deduction_comment"),
      dataIndex: "deductionComment",
      key: "deductionComment",
    },

    {
      title: t("payslip_list.total"),
      dataIndex: "totalPayable",
      key: "totalPayable",
    },

    {
      title: t("payslip_list.w_hours"),
      dataIndex: "workingHour",
      key: "workingHour",
      render: (workingHour) => `${workingHour?.toFixed(2)} hours`,
    },
    {
      title: t("payslip_list.status"),
      dataIndex: "paymentStatus",
      key: "paymentStatus",
    },
    {
      title: t("payslip_list.action"),
      key: "action",
      render: ({ id, paymentStatus }) => {
        const onPayment = async () => {
          addPayslipPayment(id);
        };

        return (
          <div className="flex flex-col gap-1">
            <Link to={`/admin/payroll/${id}`}>
              <Tooltip title='View'>
                <Button
                  icon={<EyeFilled />}
                  type='primary'
                  size='middle'
                  className='mr-2'
                ></Button>
              </Tooltip>
            </Link>

            <UserPrivateComponent permission='create-transaction'>
              <Tooltip title='Payment'>
                <Button
                  loading={loading}
                  icon={<DollarCircleFilled />}
                  type='primary'
                  size='middle'
                  onClick={onPayment}
                  disabled={paymentStatus === "PAID"}
                ></Button>
              </Tooltip>
            </UserPrivateComponent>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <PageTitle title={t("payslip_list.back")} />

      <CardCustom
        title={"Payslip List"}
        extra={
          <div className="flex items-center">
            <h1 className="text-base text-color-2 items-center mr-2 mt-1 w-[140px]">
              {" "}
              {t("payslip_list.select_month")} :{" "}
            </h1>
            <DatePicker
              format={"M"}
              className=" mr-5"
              style={{ maxWidth: "200px" }}
              picker="month"
              onChange={onMonthChange}
            />
            <h1 className="text-base text-color-2 items-center mr-2 mt-1 w-[140px]">
              {" "}
              {t("payslip_list.select_year")} :{" "}
            </h1>
            <DatePicker
              format={"YYYY"}
              picker="year"
              style={{ maxWidth: "200px" }}
              onChange={onYearChange}
            />
            <Radio.Group
              className="ml-4 w-[250px]"
              options={options}
              onChange={onChange4}
              value={pageConfig?.paymentStatus || "ALL"}
              optionType="button"
              buttonStyle="solid"
            />
          </div>
        }
      >
        <TablePagination
          list={payroll?.getAllPayslip}
          total={payroll?.totalPayslip}
          setPageConfig={setPageConfig}
          loading={isLoading}
          columns={columns}
          permission={"readAll-payroll"}
          csvFileName={"Payslip List"}
        />
      </CardCustom>
    </div>
  );
};

export default PayslipList;
