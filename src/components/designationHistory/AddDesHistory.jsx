import { Button, Col, Form, Input, Row, Typography } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import { addDepartment } from "./DesignationApis";
import { useTranslation } from "react-i18next"; 

const AddDesHistory = ({ drawer }) => {
  const [list, setList] = useState(null);
  const [loader, setLoader] = useState(false);
  const { t } = useTranslation();

  const { Title } = Typography;

  const onFinish = async (values) => {
    setLoader(true);
    const resp = await addDepartment(values);

    if (resp.message === "success") {
      setLoader(false);
      const newList = [...list];
      newList.push(resp.data);
      setList(newList);
    }
  };

  const onFinishFailed = (errorInfo) => {
    toast.warning(t("add_des_history.failed_at_adding_department"));
    setLoader(false);
  };
  return (
    <>
      <UserPrivateComponent permission={"create-designationHistory"}>
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
            {t("add_des_history.add_new_department")}
            </Title>
            <Form
              style={{ marginBottom: "100px" }}
              eventKey="department-form"
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
                  style={{ marginBottom: "20px" }}
                  label={t("add_des_history.name")}
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: {t("add_des_history.please_input_your_designation")},
                    },
                  ]}
                >
                  <Input />
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
                    {t("add_des_history.add_new_designation")}
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </Col>
        </Row>
        <hr />
      </UserPrivateComponent>
    </>
  );
};

export default AddDesHistory;
