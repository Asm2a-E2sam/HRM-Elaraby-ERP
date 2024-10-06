import { Button, Col, Form, Input, Row, Typography } from "antd";
import { useTranslation } from "react-i18next"; 

import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAllTaskStatusQuery,
  useUpdateTaskStatusMutation,
} from "../../../redux/rtk/features/projectManagement/project/taskStatus/taskStatusApi";
import Loader from "../../loader/loader";
import PageTitle from "../../page-header/PageHeader";

const UpdateTaskStatus = () => {
  const { t } = useTranslation();
  const { Title } = Typography;
  const [form] = Form.useForm();
  const { id } = useParams("id");
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);

  const { data: taskStatus } = useGetAllTaskStatusQuery({
    status: "true",
  });
  const [updateTaskStatus, { isLoading }] = useUpdateTaskStatusMutation();

  useEffect(() => {
    if (taskStatus) {
      setInitialValues(taskStatus);
    }
  }, [taskStatus]);

  const onFinish = async (values) => {
    const taskStatusData = {
      ...values,
    };

    const resp = await updateTaskStatus({ id, values: taskStatusData });
    if (resp) {
      form.resetFields();
      navigate(-1);
    }
  };

  const onFinishFailed = (errorInfo) => {
    toast.warning(t("update_task_status.failed_adding_task_status"));
  };
  return (
    <>
      {/* <UserPrivateComponent permission={"create-leaveApplication"}> */}
      <PageTitle title={t("update_task_status.back")} />
      <Row className="mt-[25px]">
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={18}
          xl={16}
          className="column-design border rounded card-custom"
        >
          <Title level={4} className="m-2 mt-5 mb-5 text-center">
            {t("update_task_status.update_task_status_column")}
          </Title>
          {initialValues ? (
            <Form
              form={form}
              style={{ marginBottom: "40px" }}
              eventKey="shift-form"
              name="basic"
              initialValues={initialValues}
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 12,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <div>
                <Form.Item
                  style={{ marginBottom: "20px" }}
                  label={t("update_task_status.task_status_name")}
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: t("update_task_status.enter_task_status_name"),
                    },
                  ]}
                >
                  <Input placeholder={t("update_task_status.enter_task_status_name")} />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  wrapperCol={{
                    offset: 8,
                    span: 12,
                  }}
                >
                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    block
                    loading={isLoading}
                  >
                    {t("update_task_status.update_now")}
                  </Button>
                </Form.Item>
              </div>
            </Form>
          ) : (
            <Loader />
          )}
        </Col>
      </Row>
      {/* </UserPrivateComponent> */}
    </>
  );
};

export default UpdateTaskStatus;
