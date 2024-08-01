import { Button, Col, Form, Input, Row, Select, Typography } from "antd";

import React from "react";

import { toast } from "react-toastify";

import { useParams } from "react-router-dom";
import { useGetProjectsQuery } from "../../../redux/rtk/features/projectManagement/project/project/projectApi";
import { useAddTaskStatusMutation } from "../../../redux/rtk/features/projectManagement/project/taskStatus/taskStatusApi";
import { useTranslation } from "react-i18next"; 

const AddTaskStatus = ({ isFixed, projectId }) => {
  const { t } = useTranslation();
  const { IsLoading: projectLoading, data: projectList } =
    useGetProjectsQuery();
  const [addSingleTaskStatus, { isLoading }] = useAddTaskStatusMutation();

  const { Title } = Typography;
  const [form] = Form.useForm();
  const { id } = useParams("id");

  const onFinish = async (values) => {
    const taskStatusData = {
      ...values,
      projectId: !isFixed
        ? values.projectId
        : id
        ? parseInt(id)
        : parseInt(projectId),
    };

    const resp = await addSingleTaskStatus(taskStatusData);

    if (resp.data && !resp.error) {
      form.resetFields();
    }
  };

  const onFinishFailed = (errorInfo) => {
    toast.warning("Failed at adding TaskStatus");
  };
  return (
    <>
      {/* <UserPrivateComponent permission={"create-leaveApplication"}> */}
      <Row className="mt-[25px]" justify={"center"}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={22}
          xl={22}
          className="column-design border rounded card-custom"
        >
          <Title level={4} className="m-2 mt-5 mb-5 text-center">
            {t("task_status.add_task_status")}
          </Title>
          <Form
            form={form}
            style={{ marginBottom: "40px" }}
            name="basic"
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
              {isFixed ? (
                <>
                  {!projectId && (
                    <Form.Item
                      style={{ marginBottom: "10px" }}
                      label={t("task_status.project")}
                      tooltip="Project is already selected "
                      name="projectId"
                    >
                      <Input defaultValue={id} />
                    </Form.Item>
                  )}
                </>
              ) : (
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t("task_status.project")}
                  name="projectId"
                  rules={[
                    {
                      required: true,
                      message: t("task_status.select_project"),
                    },
                  ]}
                >
                  <Select
                    showSearch
                    loading={projectLoading}
                    placeholder={t("task_status.select_project")}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children

                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {projectList?.map((project) => (
                      <Select.Option key={project.id} value={project.id}>
                        {project.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              )}
              <Form.Item
                style={{ marginBottom: "20px" }}
                label={t("task_status.task_status_name")}
                name="name"
                rules={[
                  {
                    required: true,
                    message: t("task_status.enter_task_status_name"),
                  },
                ]}
              >
                <Input placeholder={t("task_status.enter_task_status_name")} />
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
                  {t("task_status.submit")}
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Col>
      </Row>
      {/* </UserPrivateComponent> */}
    </>
  );
};

export default AddTaskStatus;
