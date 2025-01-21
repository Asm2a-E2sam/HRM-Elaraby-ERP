import React, { Fragment, useState } from "react";

import { Alert, Button, Card, Col, Form, Input, Row, Typography } from "antd";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import Main from "../layouts/Main";
import PageTitle from "../page-header/PageHeader";
import { useTranslation } from "react-i18next"; 

//Update Supplier API REQ
const updateSupplier = async (id, values) => {
  try {
    await axios({
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `supplier/${id}`,
      data: {
        ...values,
      },
    });
    return "success";
    // return data;
  } catch (error) {
    console.log(error.message);
  }
};

function UpdateSup() {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [success, setSuccess] = useState(false);
  const { id } = useParams();

  //Loading Old data from URL
  const location = useLocation();
  const { data } = location.state;

  const sup = data;
  const [initValues, setInitValues] = useState({
    name: sup.name,
    phone: sup.phone,
    address: sup.address,
    due_amount: sup.due_amount,
  });

  const onFinish = (values) => {
    try {
      updateSupplier(id, values);
      setSuccess(true);
      toast.success("Supplier details is updated");
      setInitValues({});
    } catch (error) {
      console.log(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const { t } = useTranslation();

  return (
    <UserPrivateComponent permission={"upate-transaction"}>
      <Fragment>
        <Main>
          <PageTitle title={t("transaction.back")} />
          <div className="text-center">
            <div className="">
              <Row className="mt-[25px]">
                <Col
                  xs={24}
                  sm={24}
                  md={12}
                  lg={12}
                  xl={14}
                  className="border rounded column-design "
                >
                  {success && (
                    <div>
                      <Alert
                        message={t("transaction.supplier_details_updated_successfully")}
                        type="success"
                        closable={true}
                        showIcon
                      />
                    </div>
                  )}
                  <Card bordered={false} className="criclebox h-full">
                    <Title level={3} className="m-3 text-center">
                      {t("transaction.edit_supplier_form")}
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
                        label={t("transaction.name")}
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: t("transaction.please_input_supplier_name"),
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        style={{ marginBottom: "10px" }}
                        label={t("transaction.phone")}
                        name="phone"
                        rules={[
                          {
                            required: true,
                            message: t("transaction.please_input_supplier_phone"),
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        style={{ marginBottom: "10px" }}
                        label={t("transaction.address")}
                        name="address"
                        rules={[
                          {
                            required: true,
                            message: t("transaction.please_input_supplier_address"),
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        style={{ marginBottom: "10px" }}
                        label={t("transaction.due_amount")}
                        name="due_amount"
                        rules={[
                          {
                            type: Number,
                            required: true,
                            message: t("transaction.please_input_supplier_amount"),
                          },
                        ]}
                      >
                        <Input type={t("transaction.number")} />
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
                        >
                          {t("transaction.update_now")}
                        </Button>
                      </Form.Item>
                    </Form>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </Main>
      </Fragment>
    </UserPrivateComponent>
  );
}

export default UpdateSup;
