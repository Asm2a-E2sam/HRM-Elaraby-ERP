import { Button, ColorPicker, Form, Input, Typography } from "antd";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next"; 

import { useAddEmploymentStatusMutation } from "../../redux/rtk/features/employemntStatus/employmentStatusApi";

const AddEmploymentStatus = ({ drawer }) => {
  const [addEmploymentStatus, { isLoading: loading }] =
    useAddEmploymentStatusMutation();
  const [colorCode, setColorCode] = useState("#1677FF");
  const { t } = useTranslation();

  const { Title } = Typography;
  const [form] = Form.useForm();

  const onFinish = async (values) => {
<<<<<<< HEAD
    const adminId = localStorage.getItem("admin_id");
=======
>>>>>>> bedaf815c21ad1eec7599208043754cc6219b2d7
    const FormData = {
      ...values,
      colourValue: colorCode,
    };

    const resp = await addEmploymentStatus(FormData);

    if (resp.data && !resp.error) {
      form.resetFields();
      setColorCode("#1677FF");
    }
  };

  const onFinishFailed = (errorInfo) => {
    toast.warning(t("add_employment_status.failed_at_adding_shift"));
  };

  return (
    <Form
      form={form}
      style={{ marginBottom: "40px" }}
      eventKey='shift-form'
      name='basic'
      layout='vertical'
      className='mx-4'
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <div>
        <Form.Item
          style={{ marginBottom: "10px" }}
          label={t("add_employment_status.name")}
          name='name'
          rules={[
            {
              required: true,
              message: t("add_employment_status.please_input_your_shift"),
            },
          ]}
        >
          <Input placeholder={t("add_employment_status.parmanet")} />
        </Form.Item>

        <Form.Item style={{ marginBottom: "10px" }} label={t("add_employment_status.color_code")}>
          <ColorPicker
            showText
            format='hex'
            value={colorCode}
            onChange={(code) => {
              setColorCode(code.toHexString());
            }}
            presets={[
              {
                label: t("add_employment_status.recommended"),
                colors: [
                  "#000000",
                  "#000000E0",
                  "#000000A6",
                  "#00000073",
                  "#00000040",
                  "#00000026",
                  "#0000001A",
                  "#00000012",
                  "#0000000A",
                  "#00000005",
                  "#F5222D",
                  "#FA8C16",
                  "#FADB14",
                  "#8BBB11",
                  "#52C41A",
                  "#13A8A8",
                  "#1677FF",
                  "#2F54EB",
                  "#722ED1",
                  "#EB2F96",
                  "#F5222D4D",
                  "#FA8C164D",
                  "#FADB144D",
                  "#8BBB114D",
                  "#52C41A4D",
                  "#13A8A84D",
                  "#1677FF4D",
                  "#2F54EB4D",
                  "#722ED14D",
                  "#EB2F964D",
                ],
              },
              {
                label: t("add_employment_status.recent"),
                colors: [],
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "20px" }}
          label={t("add_employment_status.description")}
          name={"description"}
        >
          <Input.TextArea placeholder={t("add_employment_status.description")} />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "10px" }}
          wrapperCol={{
            offset: 6,
            span: 12,
          }}
        >
          <Button
            type='primary'
            size='large'
            block
            htmlType='submit'
            loading={loading}
          >
            {t("add_employment_status.add_employment_status")}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default AddEmploymentStatus;
