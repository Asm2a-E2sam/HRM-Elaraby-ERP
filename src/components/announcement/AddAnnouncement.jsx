import { Button, Form, Input } from "antd";

import React from "react";

import { toast } from "react-toastify";

import { useAddAnnouncementMutation } from "../../redux/rtk/features/announcement/announcementApi";
import { useTranslation } from "react-i18next"; 

const AddAnnouncement = () => {
  const [addAnnouncement, { isLoading }] = useAddAnnouncementMutation();
  const { t } = useTranslation();

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const adminId = localStorage.getItem("admin_id");
    let val = {
      ...values,
      admin_id:adminId
    };
    const resp = await addAnnouncement(val);

    if (resp.data && !resp.error) {
      form.resetFields();
    }
  };

  const onFinishFailed = (errorInfo) => {
    toast.warning(t("add_announcement.failed_at_adding_shift "));
  };

  return (
    <Form
      form={form}
      style={{ marginBottom: "40px" }}
      eventKey='shift-form'
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
          label= {t("add_announcement.title")}
          name='title'
          rules={[
            {
              required: true,
              message: t("add_announcement.please_input_your_title"),
            },
          ]}
        >
          <Input placeholder={`${t("add_announcement.meeting_at")} 00:00`} />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "20px" }}
          label={t("add_announcement.description")}
          name={"description"}
        >
          <Input.TextArea placeholder={t("add_announcement.description")} />
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
            loading={isLoading}
          >
            {t("add_announcement.add_announcement")}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default AddAnnouncement;
