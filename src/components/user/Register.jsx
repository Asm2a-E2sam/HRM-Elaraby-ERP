import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Typography,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import { toast } from "react-toastify";
import { useAddUserMutation } from "../../redux/rtk/features/user/userApi";
import { useGetLeavePoliciesQuery } from "../../redux/rtk/features/leavePolicy/leavePolicyApi";
import { useGetWeeklyHolidaysQuery } from "../../redux/rtk/features/weeklyHoliday/weeklyHolidayApi";
import { useGetRolesQuery } from "../../redux/rtk/features/role/roleApi";
import { useGetShiftsQuery } from "../../redux/rtk/features/shift/shiftApi";
import { useGetDepartmentsQuery } from "../../redux/rtk/features/Department/departmentApi";

const Register = () => {
  const { t } = useTranslation(); // Use the hook

  const { data: leavePolicy } = useGetLeavePoliciesQuery({ query: 'all' });
  const { data: weeklyHoliday } = useGetWeeklyHolidaysQuery({ query: 'all' });
  const { data: shift } = useGetShiftsQuery({ query: 'all' });
  const { data: list } = useGetRolesQuery({ query: 'all' });
  const { data: department } = useGetDepartmentsQuery({ query: 'all' });

  const [addUser, { isSuccess, isLoading }] = useAddUserMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await addUser(values);
      toast.success(t("register.user_added_successfully"));
      navigate("/admin/auth/login");
    } catch (error) {
      console.log(error);
      toast.error(t("register.something_went_wrong"));
    }
  };
  

  const onFinishFailed = (errorInfo) => {
    toast.error(t("register.failed_msg"));
  };

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const { Option } = Select;

  return (
    <>
      <Row className="mt-[25px]">
        <Col span={24}>
          <Card
            bordered={false}
            className="w-full max-w-[30rem] mx-auto bg-slate-50 shadow-lg"
          >
            <Typography.Title level={3} className="m-3 text-center">
              {t("register.title")}
            </Typography.Title>
            <Form
              form={form}
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                style={{ marginBottom: "10px" }}
                label={t("register.first_name")}
                name="firstName"
                rules={[{ required: true, message: t("register.input_first_name") }]}
              >
                <Input placeholder="John" />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "10px" }}
                label={t("register.last_name")}
                name="lastName"
                rules={[{ required: true, message: t("register.input_last_name") }]}
              >
                <Input placeholder="Doe" />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "10px" }}
                label={t("register.username")}
                name="username"
                rules={[{ required: true, message: t("register.input_username") }]}
              >
                <Input placeholder="john_doe" />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "10px" }}
                label={t("register.password")}
                name="password"
                rules={[{ required: true, message: t("register.input_password") }]}
              >
                <Input.Password placeholder={t("register.strong_password")} />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "10px" }}
                label={t("register.email")}
                name="email"
                rules={[{ required: true, message: t("register.input_email") }]}
              >
                <Input placeholder="johndoe2@example.com" />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "10px" }}
                label={t("register.phone")}
                name="phone"
                rules={[{ required: true, message: t("register.input_phone") }]}
              >
                <Input placeholder="1234584515" />
              </Form.Item>

              <h2 className="text-center text-xl mt-3 mb-3 txt-color">
                {t("register.address_info")}
              </h2>
              <Form.Item
                style={{ marginBottom: "10px" }}
                label={t("register.street")}
                name="street"
                rules={[{ required: true, message: t("register.input_street") }]}
              >
                <Input placeholder="123 Main Street" />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "10px" }}
                label={t("register.city")}
                name="city"
                rules={[{ required: true, message: t("register.input_city") }]}
              >
                <Input placeholder="Los Angeles" />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "10px" }}
                label={t("register.state")}
                name="state"
                rules={[{ required: true, message: t("register.input_state") }]}
              >
                <Input placeholder="CA" />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "10px" }}
                label={t("register.zip_code")}
                name="zipCode"
                rules={[{ required: true, message: t("register.input_zip_code") }]}
              >
                <Input placeholder="90211" />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "10px" }}
                label={t("register.country")}
                name="country"
                rules={[{ required: true, message: t("register.input_country") }]}
              >
                <Input placeholder="USA" />
              </Form.Item>

              <h2 className="text-center text-xl mt-3 mb-3 txt-color">
                {t("register.employee_info")}
              </h2>
              <Form.Item
                style={{ marginBottom: "10px" }}
                label={t("register.joining_date")}
                name="joinDate"
                rules={[{ required: true, message: t("register.input_joining_date") }]}
              >
                <DatePicker className="date-picker" />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "10px" }}
                label={t("register.leave_date")}
                name="leaveDate"
              >
                <DatePicker className="date-picker" />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "10px" }}
                label={t("register.employee_id")}
                name="employeeId"
                rules={[{ required: true, message: t("register.input_employee_id") }]}
              >
                <Input placeholder="OE-012" />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "10px" }}
                label={t("register.blood_group")}
                name="bloodGroup"
                rules={[{ required: true, message: t("register.input_blood_group") }]}
              >
                <Select placeholder={t("register.select_blood_group")} allowClear>
                  {bloodGroups.map((bloodGroup) => (
                    <Option key={bloodGroup} value={bloodGroup}>
                      {bloodGroup}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label={t("register.profile_image")} name="image">
                <Upload
                  action="/upload" // Change this to your upload endpoint
                  listType="picture"
                  maxCount={1}
                  beforeUpload={() => false} // Prevent auto upload
                >
                  <Button icon={<UploadOutlined />}>{t("register.upload")}</Button>
                </Upload>
              </Form.Item>

              <Form.Item
                name="departmentId"
                style={{ marginBottom: "10px" }}
                label={t("register.department")}
                rules={[{ required: true, message: t("register.select_department") }]}
              >
                <Select placeholder={t("register.select_department")} allowClear size={"middle"}>
                  {department &&
                    department.map((dept) => (
                      <Option key={dept.id} value={dept.id}>
                        {dept.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item
                label={t("register.role")}
                name="roleId"
                style={{ marginBottom: "10px" }}
                rules={[{ required: true, message: t("register.select_role") }]}
              >
                <Select
                  loading={!list}
                  size="middle"
                  mode="single"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder={t("register.select_role")}
                >
                  {list &&
                    list.map((role) => (
                      <Option key={role.id} value={role.id}>
                        {role.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>

              <Form.Item
                label={t("register.shift")}
                name="shiftId"
                style={{ marginBottom: "10px" }}
                rules={[{ required: true, message: t("register.select_shift") }]}
              >
                <Select
                  loading={!shift}
                  size="middle"
                  mode="single"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder={t("register.select_shift")}
                >
                  {shift &&
                    shift.map((shft) => (
                      <Option key={shft.id} value={shft.id}>
                        {shft.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>

              <Form.Item
                label={t("register.leave_policy")}
                name="leavePolicyId"
                style={{ marginBottom: "10px" }}
                rules={[{ required: true, message: t("register.select_leave_policy") }]}
              >
                <Select
                  loading={!leavePolicy}
                  size="middle"
                  mode="single"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder={t("register.select_leave_policy")}
                >
                  {leavePolicy &&
                    leavePolicy.map((policy) => (
                      <Option key={policy.id} value={policy.id}>
                        {policy.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>

              <Form.Item
                label={t("register.weekly_holiday")}
                name="weeklyHolidayId"
                style={{ marginBottom: "10px" }}
                rules={[{ required: true, message: t("register.select_weekly_holiday") }]}
              >
                <Select
                  loading={!weeklyHoliday}
                  size="middle"
                  mode="single"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder={t("register.select_weekly_holiday")}
                >
                  {weeklyHoliday &&
                    weeklyHoliday.map((holiday) => (
                      <Option key={holiday.id} value={holiday.id}>
                        {holiday.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>

              <Form.Item style={{ marginBottom: "10px", marginTop: "10px" }} wrapperCol={{ offset: 4, span: 16 }}>
                <Button className="mt-5" block type="primary" shape="round" htmlType="submit" loading={isLoading}>
                  {t("register.register_employee")}
                </Button>
              </Form.Item>
              <h6 className="text-center mt-2">
                {t("register.already_have_account")}{" "}
                <Link to={"/admin/auth/login"}>{t("register.login_here")}</Link>
              </h6>
            </Form>
          </Card>
        </Col>
      </Row>

    </>
  );
};

export default Register;
