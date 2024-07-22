import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import React from "react";

import { toast } from "react-toastify";
import { useLoginMutation } from "../../redux/rtk/features/user/userApi";
import LoginTable from "../Card/LoginTable";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const { Title } = Typography;

  const onFinish = async (values) => {
    login(values);
  };
  
  const { t } = useTranslation();
  const onFinishFailed = (errorInfo) => {
    toast.error(t("login.failed_msg"));
  };
  return (
    <>
      <Row className="card-row ">
        <Col span={24}>
          <Card
            bordered={false}
            className="w-full max-w-[30rem] mx-auto bg-slate-50 shadow-lg"
          >
            <Title level={3} className="m-3 text-center">
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
                <Input />
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
                <Button type="primary" htmlType="submit" loading={isLoading}>
                  {t("login.submit")}
                </Button>
              </Form.Item>
              <Form.Item className="w-100 mt-[30px]text-center">
                <p>
                {t("login.do_not_have_account")}
                    <Link to="/admin/auth/register" className="px-3">{t("login.register_now")}</Link>
                </p>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Login;
