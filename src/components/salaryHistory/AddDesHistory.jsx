import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Typography,
} from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import { addSalaryHistory } from "./salaryHistoryApis";
import { useTranslation } from "react-i18next"; 

const AddSalaryHistory = ({ drawer }) => {
  const [loader, setLoader] = useState(false);
  const { t } = useTranslation();

  const { Title } = Typography;

  const onFinish = async (values) => {
    setLoader(true);
    const resp = await addSalaryHistory(values);

    if (resp.message === "success") {
      setLoader(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    toast.warning(t("add_salary_history.failed_adding_salary_history"));
    setLoader(false);
  };
  return (
    <>
      <UserPrivateComponent permission={"create-salaryHistory"}>
        <Row
          className="mt-[25px]"
          justify={drawer ? "center" : "space-between"}
        >
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={drawer ? 22 : 16}
            xl={drawer ? 22 : 12}
            className="column-design border rounded card-custom"
          >
            <Title level={4} className="m-2 mt-5 mb-5 text-center">
            {t("add_salary_history.add_new_salary_history")}
            </Title>
            <Form
              style={{ marginBottom: "100px" }}
              eventKey="Salary History-form"
              name="basic"
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 12,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <div>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t("add_salary_history.salary")}
                  salary="salary"
                  rules={[
                    {
                      required: true,
                      message: t("add_salary_history.please_input_salary"),
                    },
                  ]}
                >
                  <InputNumber placeholder="ex:10000" />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t("add_salary_history.start_date")}
                  name="salaryStartDate"
                  rules={[
                    {
                      required: true,
                      message: t("add_salary_history.please_input_start_date"),
                    },
                  ]}
                >
                  <DatePicker placeholder={t("add_salary_history.select_date")} />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t("add_salary_history.end_date")}
                  name="salaryEndDate"
                >
                  <DatePicker placeholder={t("add_salary_history.select_date")} />
                </Form.Item>

                <Form.Item label={t("add_salary_history.comment")} name="salaryComment">
                  <Input placeholder={t("add_salary_history.comment")} />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  wrapperCol={{
                    offset: 6,
                    span: 12,
                  }}
                >
                  <Button
                    onClick={() => setLoader(true)}
                    type="primary"
                    size="small"
                    htmlType="submit"
                    block
                    loading={loader}
                  >
                    {t("add_salary_history.add_new_designation")}
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </Col>
        </Row>
      </UserPrivateComponent>
    </>
  );
};

export default AddSalaryHistory;
