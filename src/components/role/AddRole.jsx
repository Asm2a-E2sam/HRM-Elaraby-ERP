import { Button, Card, Col, Form, Input, Row, Table, Typography } from "antd";

import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import React, { Fragment, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { toast } from "react-toastify";
import { useAddRoleMutation } from "../../redux/rtk/features/role/roleApi";
import ViewBtn from "../Buttons/ViewBtn";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";
import { useTranslation } from "react-i18next"; 

const AddRole = () => {
  const [addRole, { isLoading }] = useAddRoleMutation();
  const { Title } = Typography;
  const [form] = useForm();
  const { t } = useTranslation();

  const onFinish = async (values) => {
    const res = await addRole(values);
    if (!res.error && res.data) {
      form.resetFields();
    }
  };

  const onFinishFailed = (errorInfo) => {
    toast.warning(t("role.failed_adding_role"));
  };
  return (
    <Form
      form={form}
      style={{ marginBottom: "100px" }}
      eventKey='role-form'
      name='basic'
    
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <div>
        <Form.Item
          style={{ marginBottom: "20px" }}
          label={t("role.name")}
          name='name'
          rules={[
            {
              required: true,
              message: t("role.please_input_username"),
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
            loading={isLoading}
          >
            {t("role.add_new_role")}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default AddRole;
