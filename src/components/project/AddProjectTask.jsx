import { Button, Col, Form, Row, Select, Typography } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addSingleProjectTeam } from "../../redux/rtk/features/projectManagement/project/projectTeam/projectTeam";
import getUserFromToken from "../../utils/getUserFromToken";
import { useTranslation } from "react-i18next"; 

const AddProjectTeam = ({ drawer }) => {
const { t } = useTranslation();
const [loader, setLoader] = useState(false);
  const [userList, setuserList] = useState([
    {
      id: 1,
      firstName: "omega",
      lastName: "solution",
    },
    {
      id: 2,
      firstName: "rakib",
      lastName: "hasan",
    },
  ]);
  // const list = useSelector((state) => state.users.list);

  //get id from JWT token in localstorage and decode it

  const id = getUserFromToken();

  const dispatch = useDispatch();

  const { Title } = Typography;
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const singleProjectTeam = {
      ...values,
      projectId: id,
    };

    setLoader(true);
    const resp = await dispatch(addSingleProjectTeam(singleProjectTeam));

    if (resp.payload.message === "success") {
      setLoader(false);
      form.resetFields();
    } else {
      setLoader(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    toast.warning(t("add_project_team.failed_adding_Project_Team"));
    setLoader(false);
  };
  return (
    <>
      {/* <UserPrivateComponent permission={"create-leaveApplication"}> */}
      <Row className="mt-[25px]" justify={drawer ? "center" : "center"}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={drawer ? 22 : 16}
          xl={drawer ? 22 : 12}
          className="column-design border rounded card-custom"
        >
          <Title level={4} className="m-2 mt-5 mb-5 text-center">
            {t("add_project_team.add_project_team")}
          </Title>
          <Form
            form={form}
            style={{ marginBottom: "40px" }}
            eventKey="shift-form"
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
              <Form.Item
                style={{ marginBottom: "10px" }}
                label={t("add_project_team.user")}
                name="userId"
                rules={[
                  {
                    required: true,
                    message: t("add_project_team.select_user"),
                  },
                ]}
              >
                <Select
                  mode="single"
                  placeholder={t("add_project_team.select_user")}
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
                wrapperCol={{
                  offset: 6,
                  span: 12,
                }}
              >
                <Button
                  onClick={() => setLoader(true)}
                  type="primary"
                  size="large"
                  htmlType="submit"
                  block
                  loading={loader}
                >
                  {t("add_project_team.submit")}
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

export default AddProjectTeam;
