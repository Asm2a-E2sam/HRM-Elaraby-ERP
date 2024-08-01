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

import { useParams } from "react-router-dom";
import { useAddMilestoneMutation } from "../../../redux/rtk/features/projectManagement/project/milestone/milestoneApi";
import { useGetProjectsQuery } from "../../../redux/rtk/features/projectManagement/project/project/projectApi";
import { useTranslation } from "react-i18next"; 

const AddMilestone = ({ isFixed, projectId }) => {
  const { t } = useTranslation();
  const { isLoading: loading, data: list } = useGetProjectsQuery();
  const [addSingleMilestone, { isLoading }] = useAddMilestoneMutation();
  const { id } = useParams("id");

  const { Title } = Typography;
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const milestoneData = {
      ...values,
      projectId: !isFixed
        ? values.projectId
        : id
        ? parseInt(id)
        : parseInt(projectId),
      startDate: dayjs(values.startDate).format(),
      endDate: dayjs(values.endDate).format(),
    };

    const resp = await addSingleMilestone(milestoneData);

    if (resp.data && !resp.error) {
      form.resetFields();
    }
  };

  const onFinishFailed = (errorInfo) => {
    toast.warning("Failed at adding Milestone");
  };
  return (
    <>
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
          { t("milestone.add_milestones_in_project")}
          </Title>
          <Form
            form={form}
            style={{ marginBottom: "40px" }}
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 12,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div>
              {!isFixed ? (
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={ t("milestone.project")}
                  name="projectId"
                  rules={[
                    {
                      required: true,
                      message: t("milestone.select_project"),
                    },
                  ]}
                >
                  <Select
                    mode="single"
                    disabled={isFixed}
                    loading={loading}
                    placeholder= {t("milestone.select_project")}
                    optionFilterProp="children"
                  >
                    {list?.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              ) : (
                <>
                  {!projectId && (
                    <Form.Item
                      style={{ marginBottom: "10px" }}
                      label={t("milestone.project")}
                      tooltip="Your Project is already selected"
                      name="projectId"
                    >
                      <Input defaultValue={id} disabled />
                    </Form.Item>
                  )}
                </>
              )}

              <Form.Item
                style={{ marginBottom: "10px" }}
                label={t("milestone.name")}
                name="name"
                rules={[
                  {
                    required: true,
                    message: t("milestone.enter_milestone_name"),
                  },
                ]}
              >
                <Input placeholder={t("milestone.enter_milestone_name")}/>
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label={t("milestone.start_date")}
                name="startDate"
                rules={[
                  {
                    required: true,
                    message: t("milestone.start_date_msg"),
                  },
                ]}
              >
                <DatePicker />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "20px" }}
                label={t("milestone.end_date")}
                name="endDate"
                rules={[
                  {
                    required: true,
                    message:t("milestone.end_date_msg"),
                  },
                ]}
              >
                <DatePicker />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "10px" }}
                label={t("milestone.milestone_description")}
                name="description"
                rules={[
                  {
                    required: true,
                    message: t("milestone.milestone_description_msg"),
                  },
                ]}
              >
                <Input placeholder={t("milestone.milestone_description_msg")}/>
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
                  loading={isLoading}
                >
                  {t("milestone.add_milestone")}
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default AddMilestone;
