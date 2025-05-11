import { Button, Col, DatePicker, Form, Row, Select, Typography } from "antd";

import dayjs from "dayjs";
import React from "react";

import { toast } from "react-toastify";

import { useAddLeaveMutation } from "../../redux/rtk/features/leave/leaveApi";
import getUserFromToken from "../../utils/getUserFromToken";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import { useTranslation } from "react-i18next"; 

const AddLeave = ({ drawer }) => {
  const { t } = useTranslation();
  const id = getUserFromToken();
  const [addLeaveApplication, { isLoading }] = useAddLeaveMutation();
  const { Title } = Typography;
  const [form] = Form.useForm();

  const onFinish = async (values) => {
<<<<<<< HEAD
    const adminId = localStorage.getItem("admin_id");

=======
>>>>>>> bedaf815c21ad1eec7599208043754cc6219b2d7
    const leaveData = {
      ...values,
      userId: id,
      leaveFrom: dayjs(values.leaveFrom).format(),
      leaveTo: dayjs(values.leaveTo).format(),
    };

    const resp = await addLeaveApplication(leaveData);

    if (resp.data && !resp.error) {
      form.resetFields();
    }
  };

  const onFinishFailed = (errorInfo) => {
    toast.warning("Failed at adding shift");
  };
  return (
    <>
      <UserPrivateComponent permission={"create-leaveApplication"}>
        <Row className='mt-4' justify={"center"}>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={drawer ? 22 : 16}
            xl={drawer ? 22 : 12}
            className='column-design border rounded card-custom'
          >
            <Title level={4} className='m-2 mt-5 mb-5 text-center'>
            {t("leave.application_for_Leave")}
            </Title>
            <Form
              form={form}
              style={{ marginBottom: "40px" }}
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
                  style={{ marginBottom: "10px" }}
                  label={t("leave.leave_type")}
                  name='leaveType'
                  rules={[
                    {
                      required: true,
                      message:  t("leave.msg_error"),
                    },
                  ]}
                >
                  <Select
                    mode='single'
                    placeholder={t("leave.select_leave_type")}
                    optionFilterProp='children'
                  >
                    <Select.Option value='PAID'>{t("leave.paid")}</Select.Option>
                    <Select.Option value='UNPAID'>{t("leave.unpaid")}</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t("leave.start_date")}
                  name='leaveFrom'
                  rules={[
                    {
                      required: true,
                      message:  t("leave.msg_error"),
                    },
                  ]}
                >
                  <DatePicker />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "20px" }}
                  label= {t("leave.end_date")}
                  name='leaveTo'
                  rules={[
                    {
                      required: true,
                      message:  t("leave.msg_error"),
                    },
                  ]}
                >
                  <DatePicker />
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
                    {t("leave.submit_leave")}
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </Col>
        </Row>
      </UserPrivateComponent>
    </>
  );
};

export default AddLeave;
