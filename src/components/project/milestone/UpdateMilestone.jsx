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
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetMilestoneQuery,
  useUpdateMilestoneMutation,
} from "../../../redux/rtk/features/projectManagement/project/milestone/milestoneApi";
import { useGetProjectsQuery } from "../../../redux/rtk/features/projectManagement/project/project/projectApi";
import { toastHandler } from "../../../utils/functions";
import Loader from "../../loader/loader";
import { useTranslation } from "react-i18next"; 

const UpdateMilestone = () => {
  const { t } = useTranslation();
  const { id } = useParams("id");
  const { data: milestone, loading } = useGetMilestoneQuery(id);
  const { data: list } = useGetProjectsQuery();
  const [updateMilestone, { isLoading }] = useUpdateMilestoneMutation();
  const [initialState, setInitialState] = useState(null);

  useEffect(() => {
    if (milestone) {
      setInitialState({
        ...milestone,
        startDate: dayjs(milestone.startDate),
        endDate: dayjs(milestone.endDate),
      });
    }
  }, [milestone]);

  const { Title } = Typography;
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const milestoneData = {
      ...values,
      startDate: dayjs(values.startDate).format(),
      endDate: dayjs(values.endDate).format(),
    };

    const resp = await updateMilestone({ id, values: milestoneData });

    if (resp.data && !resp.error) {
      form.resetFields();
      navigate(-1);
    }
  };

  const onFinishFailed = (errorInfo) => {
    toastHandler("Failed at adding Milestone", "warning");
  };
  return (
    <>
      {/* <UserPrivateComponent permission={"create-leaveApplication"}> */}
      <Row className="mt-[25px]" justify={"center"}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={18}
          xl={18}
          className="column-design border rounded card-custom"
        >
          <Title level={4} className="m-2 mt-5 mb-5 text-center">
          {t("milestone.update_milestone")}
          </Title>
          {initialState ? (
            <Form
              form={form}
              style={{ marginBottom: "40px" }}
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
                  label= {t("milestone.project")}
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
                    loading={loading}
                    placeholder={t("milestone.select_project")}
                    optionFilterProp="children"
                  >
                    {list.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Milestone Name"
                  name= {t("milestone.name")}
                  rules={[
                    {
                      required: true,
                      message: t("milestone.enter_milestone_name"),
                    },
                  ]}
                >
                  <Input placeholder= {t("milestone.start_date_msg")} />
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
                      message: t("milestone.end_date_msg"),
                    },
                  ]}
                >
                  <DatePicker />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label= {t("milestone.milestone_description")}
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: t("milestone.milestone_description_msg"),
                    },
                  ]}
                >
                  <Input placeholder={t("milestone.milestone_description_msg")} />
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
                    {t("milestone.submit")}
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

export default UpdateMilestone;
