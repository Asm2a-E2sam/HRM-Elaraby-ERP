import { Button, Form, Input } from "antd";
import { useTranslation } from "react-i18next"; 

import React from "react";

import { toast } from "react-toastify";

import { useAddTaskPriorityMutation } from "../../../redux/rtk/features/projectManagement/project/taskPriority/taskPriorityApi";

const AddTaskPriority = () => {
  const { t } = useTranslation();

  const [form] = Form.useForm();
  const [addSingleTaskPriority, { isLoading }] = useAddTaskPriorityMutation();
  const onFinish = async (values) => {
    const taskPriorityData = {
      ...values,
    };

    const resp = await addSingleTaskPriority(taskPriorityData);

    if (resp.data && !resp.error) {
      form.resetFields();
    }
  };

  const onFinishFailed = (errorInfo) => {
    toast.warning(t("add_task_priority.failed_adding_task"));
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
          label={t("add_task_priority.task_priority_name")}
          name='name'
          rules={[
            {
              required: true,
              message: t("add_task_priority.enter_task_priority_name"),
            },
          ]}
        >
          <Input placeholder={t("add_task_priority.enter_task_priority_name")} />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "10px" }}
          wrapperCol={{
            offset: 8,
            span: 12,
          }}
        >
          <Button
            type='primary'
            size='large'
            htmlType='submit'
            block
            loading={isLoading}
          >
            {t("add_task_priority.submit")}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default AddTaskPriority;
