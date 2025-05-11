import React from "react";
import { Button, Form, Input, Select, Typography } from "antd";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

import {
  useAddAccountMutation,
  useGetMainAccountQuery,
} from "../../redux/rtk/features/account/accountApi";
import Loader from "../loader/loader";

const AddAccount = ({ drawer }) => {
  const { data: accounts, isLoading } = useGetMainAccountQuery();
  const [AddAccount, { isLoading: addLoading }] = useAddAccountMutation();

  const { Title } = Typography;
  const { t } = useTranslation(); // Use the hook

  const [form] = Form.useForm();

  const onFinish = async (values) => {
<<<<<<< HEAD
    const adminId = localStorage.getItem("admin_id");
=======
>>>>>>> bedaf815c21ad1eec7599208043754cc6219b2d7
    let val = {
      ...values,
    };
    const resp = await AddAccount(val);
    if (resp.data && !resp.error) {
      form.resetFields();
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Form
      form={form}
      name='basic'
      className='mx-4'
      layout='vertical'
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <Form.Item
        style={{ marginBottom: "10px" }}
        name='name'
        label={t('add_account.name_label')}
        rules={[
          {
            required: true,
            message: t('add_account.name_required'),
          },
        ]}
      >
        <Input placeholder={t('add_account.name_placeholder')} />
      </Form.Item>

      <Form.Item
        style={{ marginBottom: "10px" }}
        name='accountId'
        label={t('add_account.account_type_label')}
        rules={[
          {
            required: true,
            message: t('add_account.account_type_required'),
          },
        ]}
      >
        <Select
          loading={!accounts}
          showSearch
          placeholder={t('add_account.account_type_placeholder')}
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
        className='flex justify-center'
      >
        <Button
          type='primary'
          htmlType='submit'
          shape='round'
          size='large'
          loading={addLoading}
        >
          {t('add_account.submit_button')}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddAccount;
