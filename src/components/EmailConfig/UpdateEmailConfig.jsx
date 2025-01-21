import { Form, Input, InputNumber } from "antd";
import { Button } from "antd/lib";
import { useState } from "react";
import { useUpdateConfigEmailMutation } from "../../redux/rtk/features/emailConfig/emailConfigApi";
import { useTranslation } from "react-i18next"; 

export default function UpdateEmailConfig({ data }) {
  const [form] = Form.useForm();
  const [updateConfigEmail, { isLoading }] = useUpdateConfigEmailMutation();
  const [initValues, setInitValues] = useState({
    emailConfigName: data[0]?.emailConfigName,
    emailHost: data[0]?.emailHost,
    emailPort: data[0]?.emailPort,
    emailUser: data[0]?.emailUser,
    emailPass: data[0]?.emailPass,
  });
  const { t } = useTranslation();

  const onFinish = (values) => {
    try {
      updateConfigEmail(values);
    } catch (err) {}
  };
  const onFinishFailed = () => {};

  return (
    <div className="mx-5">
      <Form
        size="small"
        form={form}
        name="basic"
        layout="vertical"
        initialValues={initValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          style={{ marginBottom: "10px" }}
          label={t("update_email_config.config_name")}
          name="emailConfigName"
          rules={[
            {
              required: true,
              message: t("update_email_config.please_input_config_name"),
            },
          ]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: "10px" }}
          label={t("update_email_config.host")}
          name="emailHost"
          rules={[
            {
              required: true,
              message: t("update_email_config.please_input_host"),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: "10px" }}
          label={t("update_email_config.port")}
          name="emailPort"
          rules={[
            {
              required: true,
              message: t("update_email_config.please_input_port"),
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: "10px" }}
          label={t("update_email_config.user_email")}
          name="emailUser"
          rules={[
            {
              required: true,
              message: t("update_email_config.please_input_user_email"),
            },
          ]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: "10px" }}
          label={t("update_email_config.password")}
          name="emailPass"
          rules={[
            {
              required: true,
              message: t("update_email_config.please_input_password"),
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item className="flex justify-center mt-5">
          <Button
            loading={isLoading}
            type="primary"
            htmlType="submit"
            shape="round"
            size="large"
          >
            {t("update_email_config.update_config_email")}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
