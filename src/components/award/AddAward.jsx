import { Button, Form, Input } from "antd";
import { useTranslation } from "react-i18next"; 

import React from "react";
import { toast } from "react-toastify";
import { useAddAwardMutation } from "../../redux/rtk/features/award/awardApi";

const AddAward = () => {
  const [form] = Form.useForm();
  const [addSingleAward, { isLoading }] = useAddAwardMutation();
  const { t } = useTranslation();

  const onFinish = async (values) => {
<<<<<<< HEAD
    const adminId = localStorage.getItem("admin_id");
    let val = {
      ...values,
      admin_id:adminId
    };
    const resp = await addSingleAward(val);
=======
    const resp = await addSingleAward(values);
>>>>>>> bedaf815c21ad1eec7599208043754cc6219b2d7

    if (resp.data && !resp.error) {
      form.resetFields();
    }
  };

  const onFinishFailed = (errorInfo) => {
    toast.warning(t("add_award.failed_at_adding_department"));
  };
  return (
    <Form
      style={{ marginBottom: "40px" }}
      form={form}
      eventKey='department-form'
      name='basic'
      className='mx-4'
      layout='vertical'
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <div>
        <Form.Item
          style={{ marginBottom: "10px" }}
          label={t("add_award.name")}
          name='name'
          rules={[
            {
              required: true,
              message: t("add_award.please_input_your_award_name"),
            },
          ]}
        >
          <Input placeholder={t("add_award.please_input_your_award_name")} />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "20px" }}
          label={t("add_award.description")}
          name='description'
          rules={[
            {
              required: true,
              message: t("add_award.please_input_your_award_description"),
            },
          ]}
        >
          <Input placeholder={t("add_award.employee_who_performed_well")} />
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
            {t("add_award.add_new_award")}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default AddAward;
