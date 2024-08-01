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
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProjectQuery,
  useUpdateProjectMutation,
} from "../../redux/rtk/features/projectManagement/project/project/projectApi";
import { useGetUsersQuery } from "../../redux/rtk/features/user/userApi";
import { toastHandler } from "../../utils/functions";
import Loader from "../loader/loader";
import PageTitle from "../page-header/PageHeader";
import { useTranslation } from "react-i18next"; 

const UpdateProject = ({ drawer }) => {
  const { t } = useTranslation();
  const projectId = useParams("id").projectId;
  const { data: userList, isLoading } = useGetUsersQuery({ status: "true" });
  const { data: project } = useGetProjectQuery(projectId);
  const [updateSingleProject, { isLoading: addLoading }] =
    useUpdateProjectMutation();
  const [initialState, setInitialState] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (project) {
      setInitialState({
        ...project,
        startDate: dayjs(project.startDate),
        endDate: dayjs(project.endDate),
      });
    }
  }, [project]);

  const { Title } = Typography;
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const projectData = {
      ...values,
      startDate: dayjs(values.startDate).format(),
      endDate: dayjs(values.endDate).format(),
    };

    const resp = await dispatch(
      updateSingleProject({ id: projectId, values: projectData })
    );

    if (resp) {
      form.resetFields();
      navigate(-1);
    }
  };

  const onFinishFailed = (errorInfo) => {
    toastHandler(t("project.warning_msg") , "warning");
  };
  return (
    <>
      {/* <UserPrivateComponent permission={"create-leaveApplication"}> */}
      <PageTitle title={t("project.back")} />
      <Row className="mt-[25px]" justify={drawer ? "center" : "center"}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={drawer ? 22 : 18}
          xl={drawer ? 22 : 16}
          className="column-design border rounded card-custom"
        >
          <Title level={4} className="m-2 mt-5 mb-5 text-center">
          {t("project.update_project")}
          </Title>
          {initialState ? (
            <Form
              form={form}
              style={{ marginBottom: "40px" }}
              eventKey="shift-form"
              name="basic"
              initialValues={initialState}
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
                  style={{ marginBottom: "10px" }}
                  label={t("project.select_project_manager")}
                  name="projectManagerId"
                  rules={[
                    {
                      required: true,
                      message: t("project.back"),
                    },
                  ]}
                >
                  <Select
                    loading={isLoading}
                    mode="single"
                    showSearch
                    placeholder={t("project.select_project_manager")}
                    optionFilterProp="children"
                  >
                    {userList?.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.firstName} {item.lastName}
                      </Select.Option>
                    ))}
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
                  <Input.TextArea placeholder={t("project.enter_project_description")} />
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
                    loading={addLoading}
                  >
                    {t("project.update_project")}
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

export default UpdateProject;
