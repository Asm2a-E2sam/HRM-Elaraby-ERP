import { Button, Card, Col, Form, Input, Row, Typography, Radio } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useLoginUserMutation } from "../../redux/rtk/features/user/userApi";
import { useLoginAdminMutation } from "../../redux/rtk/features/user/adminApi";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [loginUser, { isLoading: isUserLoading }] = useLoginUserMutation();
  const [loginAdmin, { isLoading: isAdminLoading }] = useLoginAdminMutation();
  const { Title } = Typography;
  const { t } = useTranslation();

  const [role, setRole] = useState("user");

  const onRoleChange = (e) => {
    setRole(e.target.value);
  };

  const onFinish = async (values) => {
    // let val = { username: values.username, password: values.password };
    console.log(values);
    loginUser(values);
    // if (role === "admin") {
    //   // loginAdmin(val);
    // } else {
    //   loginUser(val);
    // }
  };

  const onFinishFailed = (errorInfo) => {
    toast.error(t("login.failed_msg"));
  };

  return (
    <>
      <Row className="card-row">
        {/* <Col lg={12} sm={24} className="flex align-items-center justify-center">
          <iframe src="https://lottie.host/embed/36d8d0d2-807e-4dd8-9d8d-da45f7f16f79/PV3pRsbIO4.json" width={300}></iframe>
        </Col> */}
        <Col span={24} className="flex align-items-center justify-center">
          <Card
            bordered={false}
            className="w-full max-w-[40rem] max-h-[60vh] py-5 mx-auto bg-slate-50"
          >
            <Title level={2} className="m-3 text-center text-slate-800">
              {t("login.login")}
            </Title>
            <Form
              name="basic"
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 16,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                className="mb-5"
                label={t("login.username")}
                name="username"
                rules={[
                  {
                    required: true,
                    message: t("login.username_error_msg"),
                  },
                ]}
              >
                <Input/>
              </Form.Item>

              <Form.Item
                className="mb-5"
                label={t("login.password")}
                name="password"
                rules={[
                  {
                    required: true,
                    message: t("login.password_error_msg"),
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item className="flex justify-center">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={role === "admin" ? isAdminLoading : isUserLoading}
                >
                  {t("login.submit")}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Login;
