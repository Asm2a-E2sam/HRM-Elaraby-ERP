import { Button, Form, Input, TimePicker, Typography } from "antd";

import dayjs from "dayjs";
import React from "react";
import { toast } from "react-toastify";
import { useAddShiftMutation } from "../../redux/rtk/features/shift/shiftApi";
import { useTranslation } from "react-i18next"; 

const AddShift = ({ drawer }) => {
  const [addShift, { isLoading: addLoading }] = useAddShiftMutation();

  const { Title } = Typography;
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const onFinish = async (values) => {
    const adminId = localStorage.getItem("admin_id");
    const shiftData = {
      name: values.name,
      startTime: dayjs(values.startTime).format(),
      endTime: dayjs(values.endTime).format(),
      admin_id:adminId
    };
    try {
      const res = await addShift(shiftData);
      if (!res.error && res.data) {
        form.resetFields();
      }
    } catch (err) {}
  };

  const onFinishFailed = (errorInfo) => {
    toast.warning(t("shift.failed_adding_shift"));
  };

  return (
    <Form
      form={form}
      style={{ marginBottom: "40px" }}
      eventKey='shift-form'
      name='basic'
      layout='vertical'
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
      className='mx-4'
    >
      <div>
        <Form.Item
          style={{ marginBottom: "10px" }}
          label={t("shift.name")}
          name='name'
          rules={[
            {
              required: true,
              message: t("shift.please_input_shift"),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "10px" }}
          label={t("shift.start_time")}
          name='startTime'
          rules={[
            {
              required: true,
              message: t("shift.please_input_shift"),
            },
          ]}
        >
          <TimePicker />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "20px" }}
          label={t("shift.end_time")}
          name='endTime'
          rules={[
            {
              required: true,
              message: t("shift.please_input_shift"),
            },
          ]}
        >
          <TimePicker />
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
            htmlType='submit'
            block
            loading={addLoading}
          >
            {t("shift.add_new_shift")}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default AddShift;
