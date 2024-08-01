import { Button, Col, Form, Input, Row, Typography } from "antd";

import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { useNavigate, useParams } from "react-router-dom";
import {
  useGetTaskPriorityQuery,
  useUpdateTaskPriorityMutation,
} from "../../../redux/rtk/features/projectManagement/project/taskPriority/taskPriorityApi";
import Loader from "../../loader/loader";
import PageTitle from "../../page-header/PageHeader";
import { useTranslation } from "react-i18next"; 

const UpdateTaskPriority = () => {
  const { t } = useTranslation();
  const [initialValues, setInitialValues] = useState(null);
  const { id } = useParams("id");
  const { data: taskPriority } = useGetTaskPriorityQuery(id);
  const [updateTaskPriority, { isLoading }] = useUpdateTaskPriorityMutation();
  useEffect(() => {
    if (taskPriority) {
      setInitialValues(taskPriority);
    }
  }, [taskPriority]);

  const { Title } = Typography;
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const onFinish = async (values) => {
    const taskData = {
      ...values,
    };

    const resp = await updateTaskPriority({ id, values: taskData });

    if (resp) {
      form.resetFields();
      navigate(-1);
    }
  };

  const onFinishFailed = (errorInfo) => {
    toast.warning("Failed at adding TaskStatus");
  };

  return (
    <>
      {/* <UserPrivateComponent permission={"create-leaveApplication"}> */}
      <PageTitle title={t("task_status.back")} />
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
          {t("task_status.update_task_priority")}
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
                  label={t("task_status.task_priority_name")}
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: t("task_status.task_priority_name_msg ") ,
                    },
                  ]}
                >
                  <Input placeholder={t("task_status.task_priority_name_msg")}/>
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
                    {t("task_status.update_now")}
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

export default UpdateTaskPriority;
