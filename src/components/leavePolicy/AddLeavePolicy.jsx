import { Button, Form, Input } from "antd";

import React from "react";
import { toast } from "react-toastify";
import { useAddLeavePolicyMutation } from "../../redux/rtk/features/leavePolicy/leavePolicyApi";
import { useTranslation } from "react-i18next"; 

const AddLeavePolicy = ({ drawer }) => {
  const [addSingleLeavePolicy, { isLoading: addLoading }] =
    useAddLeavePolicyMutation();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const adminId = localStorage.getItem("admin_id");

    const FormData = {
      ...values,
      paidLeaveCount: parseInt(values.paidLeaveCount),
      unpaidLeaveCount: parseInt(values.unpaidLeaveCount),
      admin_id:adminId
    };

    const resp = await addSingleLeavePolicy(FormData);

    if (resp.data && !resp.error) {
      form.resetFields();
    }
  };
  const { t } = useTranslation();

  const onFinishFailed = (errorInfo) => {
    toast.warning(t("add_leave_policy.failed_at_adding_department"));
  };

  return (
    <Form
      style={{ marginBottom: "40px" }}
      form={form}
      eventKey='department-form'
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
          label={t("add_leave_policy.name")}
          name='name'
          rules={[
            {
              required: true,
              message: t("add_leave_policy.name_msg"),
            },
          ]}
        >
          <Input placeholder='Policy 10-12' />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "10px" }}
          label={t("add_leave_policy.paid_leave")}
          name='paidLeaveCount'
          rules={[
            {
              required: true,
              message: t("add_leave_policy.paid_leave_msg"),
            },
          ]}
        >
          <Input placeholder='20' />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "10px" }}
          label={t("add_leave_policy.unpaid_leave")}
          name='unpaidLeaveCount'
          rules={[
            {
              required: true,
              message: t("add_leave_policy.unpaid_leave_msg"),
            },
          ]}
        >
          <Input placeholder='10' />
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
            {t("add_leave_policy.add_new_policy")}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default AddLeavePolicy;
