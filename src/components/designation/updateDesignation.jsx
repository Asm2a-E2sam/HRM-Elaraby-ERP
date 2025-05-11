import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useUpdateDesignationMutation } from "../../redux/rtk/features/designation/designationApi";
import PageTitle from "../page-header/PageHeader";
import { useTranslation } from "react-i18next"; 

function UpdateDesignation() {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const { t } = useTranslation();

  //Loading Old data from URL
  const location = useLocation();
  const { data } = location.state;
  const { id } = useParams();
  const [updateDesignation, { isLoading }] = useUpdateDesignationMutation();

  const cust = data;
  // eslint-disable-next-line no-unused-vars
  const [initValues, setInitValues] = useState({
    name: cust.designationName,
  });

<<<<<<< HEAD
  const adminId = localStorage.getItem("admin_id");
=======
  const adminId = localStorage.getItem("");
>>>>>>> bedaf815c21ad1eec7599208043754cc6219b2d7
  const onFinish = (values) => {
    // let val = {
    //   ...values,
    //   // :adminId
    // };
    try {
      updateDesignation({ id, values });
    } catch (error) {
      console.log(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <PageTitle title={t("update_designation.back")} />
      <div className="text-center">
        <Card className="mt-2">
          <Row className="mt-[25px]">
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={10}
              xl={10}
              className="border rounded column-design"
            >
              <Title level={3} className="m-3 text-center">
              {t("update_designation.edit_designation_form")}  
              </Title>
              <Form
                initialValues={{
                  ...initValues,
                }}
                form={form}
                className="m-4"
                name="basic"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  fields={[{ name: "Name" }]}
                  label={t("update_designation.name")}
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: t("update_designation.please_input_designation_name"),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button
                    block
                    type="primary"
                    htmlType="submit"
                    shape="round"
                    loading={isLoading}
                  >
                    {t("update_designation.update_now")}
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
}

export default UpdateDesignation;
