import { Button, DatePicker, Form, Input } from "antd";

import dayjs from "dayjs";
import React from "react";
import { toast } from "react-toastify";
import { useAddPublicHolidayMutation } from "../../redux/rtk/features/publicHoliday/publicHolidayApi";
import ViewBtn from "../Buttons/ViewBtn";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import { useTranslation } from "react-i18next"; 

const AddPublicHoliday = () => {
  const [addPublicHoliday, { isLoading: addLoading }] =
    useAddPublicHolidayMutation();
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const onFinish = async (values) => {
    const resp = await addPublicHoliday(values);
    if (resp.data && !resp.error) {
      form.resetFields();
    }
  };

  const onFinishFailed = (errorInfo) => {
    toast.warning(t("add_public_holiday.failed_adding_department"));
  };
  const columns = [
    {
      id: 1,
      title: t("add_public_holiday.id"),
      dataIndex: "id",
      key: "id",
    },
    {
      id: 2,
      title:  t("add_public_holiday.name"),
      dataIndex: "name",
      key: "name",
    },

    {
      id: 3,
      title:  t("add_public_holiday.date"),
      dataIndex: "date",
      key: "date",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },

    {
      id: 3,
      title:  t("add_public_holiday.create_at"),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => dayjs(createdAt).format("DD/MM/YYYY"),
    },
    {
      id: 4,
      title:  t("add_public_holiday.action"),
      dataIndex: "id",
      key: "action",
      render: (id) => (
        <UserPrivateComponent permission={"readSingle-publicHoliday"}>
          <ViewBtn path={`/admin/holiday/public/${id}/`} />
        </UserPrivateComponent>
      ),
    },
  ];
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
          label={ t("add_public_holiday.name")}
          name='name'
          rules={[
            {
              required: true,
              message: t("add_public_holiday.please_input_name"),
            },
          ]}
        >
          <Input placeholder={t("add_public_holiday.new_year")} />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "20px" }}
          label={t("add_public_holiday.date")}
          name='date'
          rules={[
            {
              required: true,
              message: t("add_public_holiday.please_input_date"),
            },
          ]}
        >
          <DatePicker placeholder={t("add_public_holiday.select_date")} />
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
            {t("add_public_holiday.add_public_holiday")}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default AddPublicHoliday;
