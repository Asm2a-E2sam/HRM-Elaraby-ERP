import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from "antd";

import dayjs from "dayjs";
import React from "react";

import { toast } from "react-toastify";

import { useAddProjectMutation } from "../../redux/rtk/features/projectManagement/project/project/projectApi";
import { useGetUsersQuery } from "../../redux/rtk/features/user/userApi";
import PageTitle from "../page-header/PageHeader";
import { useTranslation } from "react-i18next";

const AddProject = ({ drawer }) => {
  const { t } = useTranslation();
  const { data: list, isLoading: listLoading } = useGetUsersQuery({
    query: "all",
  });
  const [addSingleProject, { isLoading }] = useAddProjectMutation();

  const { Title } = Typography;
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const projectData = {
      ...values,
      startDate: dayjs(values.startDate).format(),
      endDate: dayjs(values.endDate).format(),
    };

    const resp = await addSingleProject(projectData);

    if (resp.data && !resp.error) {
      form.resetFields();
    }
  };

  const onFinishFailed = () => {
    toast.warning(t("project.warning_msg"));
  };
  return (
    <>
      <PageTitle title={t("back")} />
      <Row className="mt-4" justify={"center"}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={drawer ? 22 : 18}
          xl={drawer ? 22 : 16}
          className="column-design border rounded card-custom"
        >
          <Title level={4} className="m-2 mt-5 mb-5 text-center">
            {t("project.add_new_project")}
          </Title>
          <Form
            form={form}
            style={{ marginBottom: "40px" }}
            name="basic"
            labelCol={{
              span: 7,
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
                style={{ marginBottom: "10px" }}
                label={t("project.project_manager")}
                name="projectManagerId"
                rules={[
                  {
                    required: true,
                    message: t("project.select_project_manager"),
                  },
                ]}
              >
                <Select
                  loading={listLoading}
                  mode="single"
                  showSearch
                  placeholder={t("project.select_project_manager")}
                  optionFilterProp="children"
                >
                  {Array.isArray(list) ? (
                    list.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.firstName} {item.lastName}
                      </Select.Option>
                    ))
                  ) : (
                    <Select.Option disabled>
                      {t("project.no_users_found")}
                    </Select.Option>
                  )}
                </Select>
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label={t("project.project_name")}
                name="name"
                rules={[
                  {
                    required: true,
                    message: t("project.enter_project_name"),
                  },
                ]}
              >
                <Input placeholder={t("project.enter_project_name")} />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label={t("project.start_date")}
                name="startDate"
                rules={[
                  {
                    required: true,
                    message: t("project.start_date_err"),
                  },
                ]}
              >
                <DatePicker />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "20px" }}
                label={t("project.end_date")}
                name="endDate"
                rules={[
                  {
                    required: true,
                    message: t("project.end_date_err"),
                  },
                ]}
              >
                <DatePicker />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "20px" }}
                label={t("project.project_description")}
                name="description"
                rules={[
                  {
                    required: true,
                    message: t("project.enter_project_description"),
                  },
                ]}
              >
                <Input.TextArea
                  placeholder={t("project.enter_project_description")}
                />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                wrapperCol={{
                  offset: 7,
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
                  {t("project.submit")}
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default AddProject;
