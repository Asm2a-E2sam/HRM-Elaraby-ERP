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
import React from "react";
import { toast } from "react-toastify";

import { useParams } from "react-router-dom";
import { useGetAwardsQuery } from "../../redux/rtk/features/award/awardApi";
import { useAddAwardHistoryMutation } from "../../redux/rtk/features/awardHistory/awardHistoryApi";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import { useTranslation } from "react-i18next"; 

const AddAwardHistory = ({ setLoading }) => {
  const { id } = useParams("id");
  const { data: award } = useGetAwardsQuery({ query: "all" });
  const [addAwardHistory, { isLoading }] = useAddAwardHistoryMutation();
  const { t } = useTranslation();

  const { Title } = Typography;
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    const FormData = {
      ...values,
      userId: parseInt(id),
    };

    const resp = await addAwardHistory(FormData);

    if (resp.data && !resp.error) {
      setLoading(false);
      form.resetFields();
    } else {
      setLoading(false);
    }
  };


  const onFinishFailed = (errorInfo) => {
    toast.warning(t("add_award_history.failed_at_adding_award"));

    setLoading(false);
  };
  return (
    <>
      <UserPrivateComponent permission={"create-awardHistory"}>
        <Row className="mt-[25px]" justify="center">
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={24}
            className="column-design border rounded card-custom"
          >
            <Title level={4} className="m-2 mt-5 mb-5 text-center">
            {t("add_award_history.add_award_history")}
            </Title>
            <Form
              form={form}
              style={{ marginBottom: "50px" }}
              eventKey="department-form"
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
                  label={t("add_award_history.award_name")}
                  name="awardId"
                  rules={[{ required: true }]}
                >
                  <Select placeholder={t("add_award_history.select_award")} loading={!award}>
                    {award &&
                      award.map((award) => (
                        <Select.Option key={award.id} value={award.id}>
                          {award.name}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t("add_award_history.awarded_date")}
                  name="awardedDate"
                  rules={[
                    {
                      required: true,
                      message: t("add_award_history.please_input_your_awarded_date"),
                    },
                  ]}
                >
                  <DatePicker />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "20px" }}
                  label={t("add_award_history.comment")}
                  name="comment"
                >
                  <Input />
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
                    size="small"
                    htmlType="submit"
                    block
                    loading={isLoading}
                  >
                   {t("add_award_history.add_award_history")}
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </Col>
        </Row>
      </UserPrivateComponent>
      <hr />
    </>
  );
};

export default AddAwardHistory;
