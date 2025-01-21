import { Button, Form, Input, Select, Typography } from "antd";
import { useTranslation } from "react-i18next"; 

import React from "react";
import { toast } from "react-toastify";
import { useAddWeeklyHolidayMutation } from "../../redux/rtk/features/weeklyHoliday/weeklyHolidayApi";

const AddWeeklyHoliday = () => {
  const [addSingleWeeklyHoliday, { isLoading: addLoading }] =
    useAddWeeklyHolidayMutation();
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const { Title } = Typography;

  const onFinish = async (values) => {
    const resp = await addSingleWeeklyHoliday(values);

    if (resp.data && !resp.error) {
      form.resetFields();
    }
  };

  const onFinishFailed = (errorInfo) => {
    toast.warning(t("add_weekly_holiday.failed_at_adding_department"));
  };
  return (
    <Form
      style={{ marginBottom: "40px" }}
      form={form}
      eventKey="department-form"
      name="basic"
      className="mx-4"
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div>
        <Form.Item
          style={{ marginBottom: "10px" }}
          label={t("add_weekly_holiday.name")}
          name="name"
          rules={[
            {
              required: true,
              message: t("add_weekly_holiday.please_input_name"),
            },
          ]}
        >
          <Input placeholder={t("add_weekly_holiday.saturday_friday")} />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "10px" }}
          label={t("add_weekly_holiday.start_day")}
          name="startDay"
          rules={[
            {
              required: true,
              message: t("add_weekly_holiday.please_input_start_day"),
            },
          ]}
        >
          <Select placeholder={t("add_weekly_holiday.select_start_day")}>
            <Select.Option value="Saturday">{t("add_weekly_holiday.saturday")}</Select.Option>
            <Select.Option value="Sunday">{t("add_weekly_holiday.sunday")}</Select.Option>
            <Select.Option value="Monday">{t("add_weekly_holiday.monday")}</Select.Option>
            <Select.Option value="Tuesday">{t("add_weekly_holiday.tuesday")}</Select.Option>
            <Select.Option value="Wednesday">{t("add_weekly_holiday.wednesday")}</Select.Option>
            <Select.Option value="Thursday">{t("add_weekly_holiday.thursday")}</Select.Option>
            <Select.Option value="Friday">{t("add_weekly_holiday.friday")}</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "10px" }}
          label={t("add_weekly_holiday.end_day")}
          name="endDay"
          rules={[
            {
              required: true,
              message: t("add_weekly_holiday.please_input_end_day"),
            },
          ]}
        >
          <Select placeholder={t("add_weekly_holiday.select_end_day")}>
          <Select.Option value="Saturday">{t("add_weekly_holiday.saturday")}</Select.Option>
            <Select.Option value="Sunday">{t("add_weekly_holiday.sunday")}</Select.Option>
            <Select.Option value="Monday">{t("add_weekly_holiday.monday")}</Select.Option>
            <Select.Option value="Tuesday">{t("add_weekly_holiday.tuesday")}</Select.Option>
            <Select.Option value="Wednesday">{t("add_weekly_holiday.wednesday")}</Select.Option>
            <Select.Option value="Thursday">{t("add_weekly_holiday.thursday")}</Select.Option>
            <Select.Option value="Friday">{t("add_weekly_holiday.friday")}</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "10px" }}
          wrapperCol={{
            offset: 6,
            span: 12,
          }}
        >
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            block
            loading={addLoading}
          >
            {t("add_weekly_holiday.add_weekly_holiday")}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default AddWeeklyHoliday;
