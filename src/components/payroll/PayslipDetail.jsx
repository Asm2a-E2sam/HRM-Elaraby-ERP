import { Button, Col, Divider, Row, Typography } from "antd";
import dayjs from "dayjs";
import React, {
  Fragment,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { useReactToPrint } from "react-to-print";

import { useParams } from "react-router-dom";
import { useGetPayrollQuery } from "../../redux/rtk/features/payroll/payrollApi";
import { useGetSettingQuery } from "../../redux/rtk/features/setting/settingApi";
import PrintIconSVG from "../Icons/PrintIconSVG";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import Loader from "../loader/loader";
import { useTranslation } from "react-i18next"; 

// eslint-disable-next-line react/display-name
const PrintToPdf = forwardRef(({ data, invoiceData }, ref) => {
  const { Title } = Typography;
  const { t } = useTranslation();
  return (
    <Fragment>
      <div ref={ref} className="wrapper">
        <Col className="container mx-auto px-4 my-20">
          <Row justify="center">
            <PrintIconSVG />
          </Row>
          <Row justify="center">
            <h1 className="text-3xl font-semibold text-slate-600 mt-2 mb-8">
            {t("payroll.salary_slip")}
            </h1>
          </Row>
          <Row>
            {/* show Avatar with url */}
            <Col span={6}>
              <span className="text-sm font-semibold text-slate-700">
                {invoiceData?.companyName.toUpperCase()}
              </span>
              <div className="text-sm text-slate-700">
                {invoiceData?.email || "demo@demo.com"}
              </div>

              <div className="text-sm  text-slate-700">
                {invoiceData?.phone}
              </div>
            </Col>

            <Col span={6}>
              <span className="text-sm font-semibold text-slate-700">
                {(data.user.firstName + " " + data.user.lastName).toUpperCase()}
              </span>
              <div className="text-sm text-slate-700">
                {data.user.email || "demo@demo.com"}
              </div>
              <div className="text-sm text-slate-700">
                {data.user.phone || "+800777877787"}
              </div>
            </Col>

            <Col span={6}>
              <p>
                <span className="text-sm font-semibold text-slate-700">
                {t("payroll.salary")}:
                </span>{" "}
                $ {data.salary}
              </p>
              <span className="text-sm font-semibold text-slate-700">
              {t("payroll.work_day")}:{" "}
              </span>{" "}
              {data.workDay}
              <p>
                <span className="text-sm font-semibold text-slate-700">
                {t("payroll.work_day")}:{" "}
                </span>{" "}
                {data.workingHour}  {t("payroll.hours")}
              </p>
            </Col>
            <Col span={6}>
              <p>
                <span className="text-sm font-semibold text-slate-700">
                {t("payroll.payslip_for")}:
                </span>{" "}
                {dayjs().month(data.salaryMonth -1).format("MMMM")}, {data.salaryYear}
              </p>
              <p>
                <span className="text-sm font-semibold text-slate-700">
                {t("payroll.status")}:
                </span>{" "}
                {dayjs(data.createdAt).format("DD/MM/YYYY")}
              </p>
              <p>
                <span className="text-sm font-semibold text-slate-700">
                {t("payroll.salary_slip")}:
                </span>{" "}
                {data.paymentStatus}
              </p>
            </Col>
          </Row>

          <Row style={{ marginTop: "5%" }} gutter={[100, 0]}>
            {/* Earnings */}

            <Col span={12}>
              <h2 className="text-xl font-semibold text-slate-600 mb-4">
              {t("payroll.earnings")}
              </h2>
              <Row>
                <Col span={12}>
                  <Title level={5}>{t("payroll.salary_payable")}</Title>
                </Col>
                <Col
                  span={12}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Title level={5}>$ {data.salaryPayable}</Title>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Title level={5}>{t("payroll.bonus")} : {data.bonusComment}</Title>
                </Col>
                <Col
                  span={12}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Title level={5}>$ {data.bonus}</Title>
                </Col>
              </Row>

              <Divider></Divider>
              <Row>
                <Col span={12}>
                  <Title level={4}>{t("payroll.total_earnings")}</Title>
                </Col>
                <Col
                  span={12}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Title level={5}>$ {data.salaryPayable + data.bonus}</Title>
                </Col>
              </Row>
            </Col>

            <Col span={12}>
              <h2 className="text-xl font-semibold text-slate-600 mb-4">
              {t("payroll.deduction")}
              </h2>

              <Row>
                <Col span={12}>
                  <Title level={5}>{t("payroll.deduction")} : {data.deductionComment}</Title>
                </Col>
                <Col
                  span={12}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Title level={5}>$ {data.deduction}</Title>
                </Col>
              </Row>

              <Divider style={{ marginTop: "40px" }}></Divider>
              <Row>
                <Col span={12}>
                  <Title level={4}>{t("payroll.total_deduction")}</Title>
                </Col>
                <Col
                  span={12}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Title level={5}>$ {data.deduction}</Title>
                </Col>
              </Row>
            </Col>
          </Row>

          <div style={{ marginTop: "5%" }} className="flex justify-end">
            <div>
              <Title level={4}>
              {t("payroll.total_earnings")} : $ {data.salaryPayable + data.bonus}{" "}
              </Title>
              <Title level={4}>{t("payroll.total_deduction")} : $ {data.deduction} </Title>
              <Title level={3}>
              {t("payroll.total_payable_salary")} : $ {data.totalPayable}{" "}
              </Title>
            </div>
          </div>
        </Col>
      </div>
    </Fragment>
  );
});

const DetailPayslip = () => {
  const componentRef = useRef();
  const { t } = useTranslation();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const { data: setting } = useGetSettingQuery();
  const [invoiceData, setInvoiceData] = useState(null);
  
  useEffect(() => {
    if (setting) {
      setInvoiceData(setting);
    }
  }, [setting]);

  const { id } = useParams("id");
  const { data } = useGetPayrollQuery(id);

  return (
    <div>
      <UserPrivateComponent permission={"readSingle-payroll"}>
        <div className=''>
          <div className='flex justify-end mr-10'>
            {invoiceData && (
              <Button type='primary' size='large' onClick={handlePrint}>
                {t("payroll.print_payslip")}
              </Button>
            )}
          </div>
          {data ? (
            <PrintToPdf
              ref={componentRef}
              data={data}
              invoiceData={invoiceData}
            />
          ) : (
            <Loader />
          )}
        </div>
      </UserPrivateComponent>
    </div>
  );
};


export default DetailPayslip;
