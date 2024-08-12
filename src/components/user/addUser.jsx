import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";

import { PlusOutlined } from "@ant-design/icons";
import { useGetDepartmentsQuery } from "../../redux/rtk/features/Department/departmentApi";
import { useGetDesignationsQuery } from "../../redux/rtk/features/designation/designationApi";
import { useGetEmploymentStatusesQuery } from "../../redux/rtk/features/employemntStatus/employmentStatusApi";
import { useGetLeavePoliciesQuery } from "../../redux/rtk/features/leavePolicy/leavePolicyApi";
import { useGetRolesQuery } from "../../redux/rtk/features/role/roleApi";
import { useGetShiftsQuery } from "../../redux/rtk/features/shift/shiftApi";
import { useAddUserMutation } from "../../redux/rtk/features/user/userApi";
import { useGetWeeklyHolidaysQuery } from "../../redux/rtk/features/weeklyHoliday/weeklyHolidayApi";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import EmployeeEducationForm from "./EmployeeEducationForm";
import { useTranslation } from "react-i18next"; 

const AddUser = () => {
  const { Option } = Select;
  const { data: list } = useGetRolesQuery({query: 'all'});
  const { data: department } = useGetDepartmentsQuery({query: 'all'});
  const [addStaff, { isLoading }] = useAddUserMutation();

  //  to get designations from redux
  const { data: designation } = useGetDesignationsQuery({ query: "all" });
  const { data: employmentStatus } = useGetEmploymentStatusesQuery({query: 'all'});
  const { data: shift } = useGetShiftsQuery({query: 'all'});
  const { data: weeklyHoliday } = useGetWeeklyHolidaysQuery({query: 'all'});
  const { data: leavePolicy } = useGetLeavePoliciesQuery({query: 'all'});
  const { t } = useTranslation();

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const FormData = {
      ...values,
      education: values.education || [],
    };
    try {
      const res = await addStaff(FormData);
      if (!res.error && res.data) {
        form.resetFields();
      }
    } catch (error) {}
  };

  const onFinishFailed = () => {};

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]; // blood groups

  return (
    <UserPrivateComponent permission={"create-user"}>
    <div className='mr-top mt-5 p-5 ant-card ' style={{ maxWidth: "100%" }}>
      <Form
        size='small'
        form={form}
        name='basic'
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 22 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={12} className='gutter-row form-color'>
            <h2 className='text-center text-xl mt-3 mb-3 txt-color'>
            {t("addUser.userInformation")}
            </h2>
            <Form.Item
              style={{ marginBottom: "10px" }}
              label={t("addUser.firstName")}
              name='firstName'
              rules={[{ required: true, message: t("addUser.pleaseInputFirstName") }]}
            >
              <Input placeholder='John' />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "10px" }}
              label={t("addUser.lastName")}
              name='lastName'
              rules={[{ required: true, message: t("addUser.pleaseInputLastName") }]}
            >
              <Input placeholder='Doe' />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "10px" }}
              label={t("addUser.userName")}
              name='username'
              rules={[{ required: true, message: t("addUser.pleaseInputUserName") }]}
            >
              <Input placeholder='john_doe' />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "10px" }}
              label={t("addUser.password")}
              name='password'
              rules={[{ required: true, message: t("addUser.pleaseInputPassword") }]}
            >
              <Input placeholder='Strong Password' />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "10px" }}
              label={t("addUser.email")}
              name='email'
              rules={[{ required: true, message: t("addUser.pleaseInputEmail") }]}
            >
              <Input placeholder='johndoe2@example.com' />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "10px" }}
              label={t("addUser.phone")}
              name='phone'
              rules={[{ required: true, message: t("addUser.pleaseInputPhone") }]}
            >
              <Input placeholder='015000000000' />
            </Form.Item>
          </Col>
          <Col span={12} className='gutter-row'>
            <h2 className='text-center text-xl mt-3 mb-3 txt-color'>
              {t("addUser.addressInformation")}
            </h2>
            <Form.Item
              style={{ marginBottom: "10px" }}
              label={t("addUser.street")}
              name='street'
              rules={[{ required: true, message: t("addUser.pleaseInputStreet") }]}
            >
              <Input placeholder='123 Main Street' style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "10px" }}
              label={t("addUser.city")}
              name='city'
              rules={[{ required: true, message: t("addUser.pleaseInputCity") }]}
            >
              <Input placeholder='City' style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "10px" }}
              label={t("addUser.state")}
              name='state'
              rules={[{ required: true, message: t("addUser.pleaseInputState") }]}
            >
              <Input placeholder='State' style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "10px" }}
              label={t("addUser.zipCode")}
              name='zipCode'
              rules={[{ required: true, message: t("addUser.pleaseInputZipCode") }]}
            >
              <Input placeholder='12345' style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "10px" }}
              label={t("addUser.country")}
              name='country'
              rules={[{ required: true, message: t("addUser.pleaseInputCountry") }]}
            >
              <Input placeholder='Country' style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={12} className='gutter-row'>
            <h2 className='text-center text-xl mt-3 mb-3 txt-color'>
              {t("addUser.employeeInformation")}
            </h2>
            <Form.Item
              style={{ marginBottom: "10px" }}
              label={t("addUser.joiningDate")}
              name='joiningDate'
              rules={[{ required: true, message: t("addUser.pleaseInputJoiningDate") }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item style={{ marginBottom: "10px" }} label={t("addUser.leaveDate")} name='leaveDate'>
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "10px" }}
              label={t("addUser.employeeID")}
              name='employeeId'
              rules={[{ required: true, message: t("addUser.pleaseInputEmployeeID") }]}
            >
              <Input placeholder='015000000000' style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "10px" }}
              label={t("addUser.bloodGroup")}
              name='bloodGroup'
              rules={[{ required: true, message: t("addUser.pleaseInputBloodGroup") }]}
            >
              <Select style={{ width: "100%" }}>
                {bloodGroups.map((group, index) => (
                  <Option key={index} value={group}>
                    {group}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "10px" }}
              label={t("addUser.employmentStatus")}
              name='employmentStatusId'
              rules={[{ required: true, message: t("addUser.pleaseInputEmploymentStatus") }]}
            >
              <Select style={{ width: "100%" }}>
                {employmentStatus?.data?.map((status) => (
                  <Option key={status.id} value={status.id}>
                    {status.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "10px" }}
              label={t("addUser.department")}
              name='departmentId'
              rules={[{ required: true, message: t("addUser.pleaseInputDepartment") }]}
            >
              <Select style={{ width: "100%" }}>
                {department?.data?.map((dept) => (
                  <Option key={dept.id} value={dept.id}>
                    {dept.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "10px" }}
              label={t("addUser.role")}
              name='roleId'
              rules={[{ required: true, message: t("addUser.pleaseInputRole") }]}
            >
              <Select style={{ width: "100%" }}>
                {list?.data?.map((role) => (
                  <Option key={role.id} value={role.id}>
                    {role.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "10px" }}
              label={t("addUser.shift")}
              name='shiftId'
              rules={[{ required: true, message: t("addUser.pleaseInputShift") }]}
            >
              <Select style={{ width: "100%" }}>
                {shift?.data?.map((s) => (
                  <Option key={s.id} value={s.id}>
                    {s.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "10px" }}
              label={t("addUser.leavePolicy")}
              name='leavePolicyId'
              rules={[{ required: true, message: t("addUser.pleaseInputLeavePolicy") }]}
            >
              <Select style={{ width: "100%" }}>
                {leavePolicy?.data?.map((policy) => (
                  <Option key={policy.id} value={policy.id}>
                    {policy.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "10px" }}
              label={t("addUser.weeklyHoliday")}
              name='weeklyHolidayId'
              rules={[{ required: true, message: t("addUser.pleaseInputWeeklyHoliday") }]}
            >
              <Select style={{ width: "100%" }}>
                {weeklyHoliday?.data?.map((holiday) => (
                  <Option key={holiday.id} value={holiday.id}>
                    {holiday.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12} className='gutter-row'>
            <h2 className='text-center text-xl mt-3 mb-3 txt-color'>
              {t("addUser.designation")}
            </h2>
            <Form.Item
              style={{ marginBottom: "10px" }}
              label={t("addUser.designation")}
              name='designationId'
              rules={[{ required: true, message: t("addUser.pleaseInputDesignation") }]}
            >
              <Select style={{ width: "100%" }}>
                {designation?.data?.map((des) => (
                  <Option key={des.id} value={des.id}>
                    {des.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "10px" }}
              label={t("addUser.designationStartDate")}
              name='designationStartDate'
              rules={[{ required: true, message: t("addUser.pleaseInputDesignationStartDate") }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "10px" }}
              label={t("addUser.designationEndDate")}
              name='designationEndDate'
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <h2 className='text-center text-xl mt-3 mb-3 txt-color'>
              {t("addUser.salary")}
            </h2>
            <Form.Item
              style={{ marginBottom: "10px" }}
              label={t("addUser.salary")}
              name='salary'
              rules={[{ required: true, message: t("addUser.pleaseInputSalary") }]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "10px" }}
              label={t("addUser.salaryStartDate")}
              name='salaryStartDate'
              rules={[{ required: true, message: t("addUser.pleaseInputSalaryStartDate") }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "10px" }}
              label={t("addUser.salaryEndDate")}
              name='salaryEndDate'
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item style={{ marginBottom: "10px" }} label={t("addUser.salaryComment")} name='comment'>
              <Input placeholder={t("addUser.salaryComment")} style={{ width: "100%" }} />
            </Form.Item>
            <h2 className='text-center text-xl mt-3 mb-3 txt-color'>
              {t("addUser.educationInformation")}
            </h2>
            <Form.Item style={{ marginBottom: "10px" }}>
              <EmployeeEducationForm />
            </Form.Item>
            <Form.Item
              wrapperCol={{ offset: 8, span: 16 }}
              style={{ marginBottom: "10px" }}
            >
              <Button type='primary' htmlType='submit' loading={isLoading}>
                {t("addUser.addNewStaff")}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  </UserPrivateComponent>
);
};

export default AddUser;
