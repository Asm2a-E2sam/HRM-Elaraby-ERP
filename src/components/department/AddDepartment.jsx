import { Button, Form, Input, Typography } from "antd";
import { useTranslation } from "react-i18next"; 

import React from "react";
import { toast } from "react-toastify";
import { useAddDepartmentMutation } from "../../redux/rtk/features/Department/departmentApi";

const AddDepartment = () => {
  const [addDepartment, { isLoading: addLoading }] = useAddDepartmentMutation();
  const adminId = localStorage.getItem("admin_id");
  const { t } = useTranslation();

  const [form] = Form.useForm();
  const onFinish = async (values) => {
    let val = {
      ...values,
      admin_id:adminId
    };
    const resp = await addDepartment(val);
    if (resp.data && !resp.error) {
      form.resetFields();
    }
  };

  const onFinishFailed = (errorInfo) => {
    toast.warning(t("add_department.failed_at_adding_department"));
  };

  return (
    <Form
      form={form}
      style={{ marginBottom: "40px" }}
      eventKey='department-form'
      name='basic'
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 12,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <div>
        <Form.Item
          style={{ marginBottom: "20px" }}
          label={t("add_department.failed_at_adding_department")}
          name='name'
          rules={[
            {
              required: true,
              message: t("add_department.please_input_your_username"),
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
            type='primary'
            size='large'
            htmlType='submit'
            block
            loading={addLoading}
          >
            {t("add_department.add_new_department")}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default AddDepartment;
