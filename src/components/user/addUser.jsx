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
  const { t } = useTranslation();

  //  to get designations from redux
  const { data: designation } = useGetDesignationsQuery({ query: "all" });
  const { data: employmentStatus } = useGetEmploymentStatusesQuery({query: 'all'});
  const { data: shift } = useGetShiftsQuery({query: 'all'});
  const { data: weeklyHoliday } = useGetWeeklyHolidaysQuery({query: 'all'});
  const { data: leavePolicy } = useGetLeavePoliciesQuery({query: 'all'});
  const adminId = localStorage.getItem("admin_id");
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const FormData = {
      ...values,
      admin_id:adminId,
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

  console.log(designation);
  return (
    <>
      <UserPrivateComponent permission={"create-user"}>
        <div className='mr-top mt-5 p-5 ant-card ' style={{ maxWidth: "100%" }}>
          <Form
            size='small'
            form={form}
            name='basic'
            labelCol={{
              span: 7,
            }}
            wrapperCol={{
              span: 22,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
          >
            <Row
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}
            >
              <Col span={12} className='gutter-row form-color'>
                <h2 className='text-center text-xl mt-3 mb-3 txt-color'>
                  {t("add_user.user_information")}
                </h2>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t("add_user.first_name")}
                  name='firstName'
                  rules={[
                    {
                      required: true,
                      message: t("add_user.please_input_first_name"),
                    },
                  ]}
                >
                  <Input placeholder={t("add_user.please_input_first_name")}/>
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t("add_user.last_name")}
                  name='lastName'
                  rules={[
                    {
                      required: true,
                      message: t("add_user.please_input_last_name"),
                    },
                  ]}
                >
                  <Input placeholder={t("add_user.please_input_last_name")}/>
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t("add_user.user_name")}
                  name='username'
                  rules={[
                    {
                      required: true,
                      message: t("add_user.please_input_user_name"),
                    },
                  ]}
                >
                  <Input placeholder={t("add_user.please_input_user_name")} />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t("add_user.password")}
                  name='password'
                  rules={[
                    {
                      required: true,
                      message: t("add_user.please_input_password"),
                    },
                  ]}
                >
                  <Input placeholder={ t("add_user.please_input_password")} />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t("add_user.email")}
                  name='email'
                  rules={[
                    {
                      required: true,
                      message: t("add_user.please_input_email"),
                    },
                  ]}
                >
                  <Input placeholder={t("add_user.please_input_email")}/>
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t("add_user.phone")}
                  name='phone'
                  rules={[
                    {
                      required: true,
                      message: t("add_user.please_input_phone"),
                    },
                  ]}
                >
                  <Input placeholder='015000000000' />
                </Form.Item>
              </Col>
              <Col span={12} className='gutter-row'>
                <h2 className='text-center text-xl mt-3 mb-3 txt-color'>
                {t("add_user.address_information")}
                </h2>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t("add_user.street")}
                  name='street'
                  rules={[
                    {
                      required: true,
                      message: t("add_user.please_input_street"),
                    },
                  ]}
                >
                  <Input
                    placeholder={t("add_user.please_input_street")}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={ t("add_user.city")}
                  name='city'
                  rules={[{ required: true, message: t("add_user.please_input_city")}]}
                >
                  <Input placeholder={t("add_user.please_input_city")}/>
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t("add_user.state")}
                  name='state'
                  rules={[{ required: true, message: t("add_user.please_input_state") }]}
                >
                  <Input placeholder={t("add_user.please_input_state")} />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t("add_user.zip_code")}
                  name='zipCode'
                  rules={[
                    { required: true, message: t("add_user.please_input_zip_code")},
                  ]}
                >
                  <Input placeholder='90211' />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t("add_user.country")}
                  name='country'
                  rules={[{ required: true, message: t("add_user.please_input_country") }]}
                >
                  <Input placeholder={t("add_user.please_input_country")} />
                </Form.Item>
              </Col>
            </Row>

            <Row
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}
            >
              <Col span={12} className='gutter-row'>
                <h2 className='text-center text-xl mt-3 mb-3 txt-color'>
                  {" "}
                  {t("add_user.employee_information")}{" "}
                </h2>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t("add_user.joining_date")}
                  name='joinDate'
                  rules={[
                    {
                      required: true,
                      message: t("add_user.please_input_joining_date"),
                    },
                  ]}
                >
                  <DatePicker className='date-picker hr-staffs-date-picker' />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t("add_user.leave_date")}
                  name='leaveDate'
                >
                  <DatePicker className='date-picker hr-staffs-date-picker' />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t("add_user.employee_id")}
                  name='employeeId'
                  rules={[
                    {
                      required: true,
                      message: t("add_user.please_input_employee_id"),
                    },
                  ]}
                >
                  <Input placeholder='OE-012' />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t("add_user.blood_group")}
                  name='bloodGroup'
                  rules={[
                    {
                      required: true,
                      message: t("add_user.please_input_blood_group"),
                    },
                  ]}
                >
                  <Select
                    placeholder={t("add_user.please_input_blood_group")}
                    allowClear
                    mode='single'
                    size='middle'
                    style={{
                      width: "100%",
                    }}
                  >
                    {bloodGroups.map((bloodGroup) => (
                      <Option key={bloodGroup} value={bloodGroup}>
                        {bloodGroup}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                {/* TODO: Add a Upload Seciton for Image */}
                <Form.Item
                  name={"employmentStatusId"}
                  style={{ marginBottom: "10px" }}
                  rules={[
                    {
                      required: true,
                      message: t("add_user.please_input_employment_status"),
                    },
                  ]}
                  label={t("add_user.employment_status")}
                >
                  <Select
                    placeholder={t("add_user.please_input_employment_status")}
                    allowClear
                    size={"middle"}
                  >
                    {employmentStatus &&
                      employmentStatus.map((employmentStatus) => (
                        <Option
                          key={employmentStatus.id}
                          value={employmentStatus.id}
                        >
                          {employmentStatus.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name={"departmentId"}
                  style={{ marginBottom: "10px" }}
                  label={t("add_user.department")}
                  rules={[
                    { required: true, message: t("add_user.please_input_department")},
                  ]}
                >
                  <Select
                    loading={!department}
                    placeholder={t("add_user.please_input_department")}
                    allowClear
                    size={"middle"}
                  >
                    {department &&
                      department.map((department) => (
                        <Option key={department.id} value={department.id}>
                          {department.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  rules={[
                    { required: true, message: t("add_user.please_input_role") },
                  ]}
                  label={t("add_user.role")}
                  name={"roleId"}
                  style={{ marginBottom: "10px" }}
                >
                  <Select
                    loading={!list}
                    size='middle'
                    mode='single'
                    allowClear
                    style={{
                      width: "100%",
                    }}
                    placeholder={t("add_user.please_input_role")}
                  >
                    {list &&
                      list.map((role) => (
                        <Option key={role.id} value={role.id}>
                          {role.name}
                        </Option>
                      ))}
                  </Select>
                  {/*<BigDrawer
										title={"new Role"}
										btnTitle={"Role"}
										children={<AddRole drawer={true} />}
											/> */}
                </Form.Item>

                <Form.Item
                  rules={[
                    { required: true, message: t("add_user.please_input_shift") },
                  ]}
                  label={t("add_user.shift")}
                  name={"shiftId"}
                  style={{ marginBottom: "10px" }}
                >
                  <Select
                    loading={!shift}
                    size='middle'
                    mode='single'
                    allowClear
                    style={{
                      width: "100%",
                    }}
                    placeholder={t("add_user.please_input_shift")}
                  >
                    {shift &&
                      shift.map((shift) => (
                        <Option key={shift.id} value={shift.id}>
                          {shift.name}
                        </Option>
                      ))}
                  </Select>
                  {/*<BigDrawer
										title={"new Role"}
										btnTitle={"Role"}
										children={<AddRole drawer={true} />}
											/> */}
                </Form.Item>

                <Form.Item
                  rules={[
                    { required: true, message:t("add_user.please_input_leave_policy") },
                  ]}
                  label={t("add_user.leave_policy")}
                  name={"leavePolicyId"}
                  style={{ marginBottom: "10px" }}
                >
                  <Select
                    loading={!leavePolicy}
                    size='middle'
                    mode='single'
                    allowClear
                    style={{
                      width: "100%",
                    }}
                    placeholder={t("add_user.please_input_leave_policy")}
                  >
                    {leavePolicy &&
                      leavePolicy.map((leavePolicy) => (
                        <Option key={leavePolicy.id} value={leavePolicy.id}>
                          {leavePolicy.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  rules={[
                    { required: true, message:t("add_user.please_input_weekly_holiday") },
                  ]}
                  label={t("add_user.weekly_holiday")}
                  name={"weeklyHolidayId"}
                  style={{ marginBottom: "10px" }}
                >
                  <Select
                    loading={!weeklyHoliday}
                    size='middle'
                    mode='single'
                    allowClear
                    style={{
                      width: "100%",
                    }}
                    placeholder={t("add_user.please_input_weekly_holiday")}
                  >
                    {weeklyHoliday &&
                      weeklyHoliday.map((weeklyHoliday) => (
                        <Option key={weeklyHoliday.id} value={weeklyHoliday.id}>
                          {weeklyHoliday.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12} className='gutter-row'>
                <h2 className='text-center text-xl mt-3 mb-3 txt-color'>
                  {t("add_user.designation_salary_information")}
                </h2>

                <Form.Item
                  rules={[
                    { required: true, message: t("add_user.please_input_designation") },
                  ]}
                  label={t("add_user.designation")}
                  name={"designationId"}
                  style={{ marginBottom: "10px" }}
                >
                  <Select
                    loading={!shift}
                    size='middle'
                    mode='single'
                    allowClear
                    style={{
                      width: "100%",
                    }}
                    placeholder={t("add_user.please_input_designation")}
                  >
                    {designation &&
                      designation.map((designation) => (
                        <Option key={designation.id} value={designation.id}>
                          {designation.name}
                        </Option>
                      ))}
                  </Select>
                  {/*<BigDrawer
									title={"new Role"}
									btnTitle={"Role"}
									children={<AddRole drawer={true} />}
										/> */}
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t("add_user.designation_start_date")}
                  rules={[{ required: true, message: t("add_user.please_input_designation_start_date") }]}
                  name={'designationStartDate'}
                >
                  <DatePicker className='date-picker hr-staffs-date-picker' />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t("add_user.designation_end_date")}
                  name='designationEndDate'
                >
                  <DatePicker className='date-picker hr-staffs-date-picker' />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t("add_user.salary")}
                  name='salary'
                  rules={[
                    {
                      required: true,
                      message:t("add_user.please_input_salary"),
                    },
                  ]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                  label={t("add_user.salary_start_date")}
                  name='salaryStartDate'
                  style={{ marginBottom: "10px" }}
                  rules={[
                    {
                      required: true,
                      message: t("add_user.please_input_salary_start_date"),
                    },
                  ]}
                >
                  <DatePicker className='date-picker hr-staffs-date-picker' />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t("add_user.salary_end_date")}
                  name='salaryEndDate'
                >
                  <DatePicker className='date-picker hr-staffs-date-picker' />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t("add_user.salary_comment")}
                  name='salaryComment'
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <h2 className='text-center text-xl mt-3 mb-5 txt-color'>
            {t("add_user.education_information")}
            </h2>

            <div className='text-center'>
              <p className='text-red-500 text-base mb-4'>
              {t("add_user.please_add_education_information")}
              </p>
            </div>

            <Form.List name='education'>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <EmployeeEducationForm
                      key={key}
                      name={name}
                      remove={remove}
                      restField={restField}
                    />
                  ))}
                  <Form.Item
                    style={{ marginBottom: "10px" }}
                    wrapperCol={{
                      offset: 4,
                      span: 16,
                    }}
                  >
                    <Button
                      type='dashed'
                      size='middle'
                      style={{ color: "#fff", backgroundColor: "#2c3e50" }}
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      {t("add_user.add_education_information")}
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Form.Item
              style={{ marginBottom: "10px", marginTop: "10px" }}
              wrapperCol={{
                offset: 4,
                span: 16,
              }}
            >
              <Button
                className='mt-5'
                size='large'
                block
                type='primary'
                htmlType='submit'
                shape='round'
                loading={isLoading}
              >
                {t("add_user.add_new_staff")}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </UserPrivateComponent>
    </>
  );
};

export default AddUser;
