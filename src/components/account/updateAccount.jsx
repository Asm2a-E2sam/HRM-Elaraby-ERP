import { Button, Form, Input, Modal, Select } from "antd";
import { useTranslation } from "react-i18next"; 
import React, { useState } from "react";
import {
  useGetMainAccountQuery,
  useUpdateAccountMutation,
} from "../../redux/rtk/features/account/accountApi";
import Loader from "../loader/loader";

const UpdateAccount = ({ data, id }) => {
  const { data: accounts, isLoading } = useGetMainAccountQuery();
  const [UpdateAccount, { isLoading: addLoading }] = useUpdateAccountMutation();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const [form] = Form.useForm();

  const [initValues, setInitValues] = useState({
    name: data?.name,
    accountId: data?.accountId,
  });

  const onFinish = async (values) => {
    try {
      UpdateAccount({ id, values });
    } catch (error) {
      console.log(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Button onClick={showModal} size='small'>
      {t("update_account.update_account")}
      </Button>
      <Modal
        open={open}
        title={t("update_account.update_account")}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key='back' type='danger' onClick={handleCancel}>
            {t("update_account.cancel")}
          </Button>,
        ]}
      >
        <Form
          form={form}
          className='m-4'
          name='basic'
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            ...initValues,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item
            style={{ marginBottom: "10px" }}
            name='name'
            label={t("update_account.name")}
            rules={[
              {
                required: true,
                message: t("update_account.please_input_debit_account"),
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            name='accountId'
            label={t("update_account.account_type")}
            rules={[
              {
                required: true,
                message: t("update_account.please_input_debit_account"),
              },
            ]}
          >
            <Select
              loading={!accounts}
              showSearch
              style={{
                width: 200,
              }}
              placeholder={t("update_account.select_account_type")}
              optionFilterProp='children'
              filterOption={(input, option) => option.children.includes(input)}
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
            >
              {accounts &&
                accounts.map((acc) => (
                  <Select.Option key={acc.id} value={acc.id}>
                    {acc.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            wrapperCol={{
              offset: 6,
              span: 16,
            }}
          >
            <Button
              block
              type='primary'
              htmlType='submit'
              shape='round'
              loading={addLoading}
            >
              {t("update_account.update_account")}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateAccount;
