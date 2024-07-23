// AddUser.js
import React from 'react';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Select,
  Row,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useGetDepartmentsQuery } from '../../redux/rtk/features/Department/departmentApi';
import { useGetDesignationsQuery } from '../../redux/rtk/features/designation/designationApi';
import { useGetEmploymentStatusesQuery } from '../../redux/rtk/features/employemntStatus/employmentStatusApi';
import { useGetLeavePoliciesQuery } from '../../redux/rtk/features/leavePolicy/leavePolicyApi';
import { useGetRolesQuery } from '../../redux/rtk/features/role/roleApi';
import { useGetShiftsQuery } from '../../redux/rtk/features/shift/shiftApi';
import { useAddUserMutation } from '../../redux/rtk/features/user/userApi';
import { useGetWeeklyHolidaysQuery } from '../../redux/rtk/features/weeklyHoliday/weeklyHolidayApi';
import UserPrivateComponent from '../PrivateRoutes/UserPrivateComponent';
import EmployeeEducationForm from './EmployeeEducationForm';
import { useTranslation } from 'react-i18next';

const AddUser = () => {
  const { Option } = Select;
  const { t } = useTranslation();
  const { data: list } = useGetRolesQuery({ query: 'all' });
  const { data: department } = useGetDepartmentsQuery({ query: 'all' });
  const [addStaff, { isLoading }] = useAddUserMutation();

  // to get designations from redux
  const { data: designation } = useGetDesignationsQuery({ query: 'all' });
  const { data: employmentStatus } = useGetEmploymentStatusesQuery({ query: 'all' });
  const { data: shift } = useGetShiftsQuery({ query: 'all' });
  const { data: weeklyHoliday } = useGetWeeklyHolidaysQuery({ query: 'all' });
  const { data: leavePolicy } = useGetLeavePoliciesQuery({ query: 'all' });

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
    <>
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
                  {t('add_employee.user_information')}
                </h2>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t('add_employee.first_name')}
                  name='firstName'
                  rules={[{ required: true, message: t('add_employee.please_input_first_name') }]}
                >
                  <Input placeholder={t('add_employee.enter_first_name')} />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t('add_employee.last_name')}
                  name='lastName'
                  rules={[{ required: true, message: t('add_employee.please_input_last_name') }]}
                >
                  <Input placeholder={t('add_employee.enter_last_name')} />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t('add_employee.user_name')}
                  name='username'
                  rules={[{ required: true, message: t('add_employee.please_input_user_name') }]}
                >
                  <Input placeholder={t('add_employee.enter_user_name')} />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t('add_employee.password')}
                  name='password'
                  rules={[{ required: true, message: t('add_employee.please_input_password') }]}
                >
                  <Input placeholder={t('add_employee.enter_password')} />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t('add_employee.email')}
                  name='email'
                  rules={[{ required: true, message: t('add_employee.please_input_email') }]}
                >
                  <Input placeholder={t('add_employee.enter_email')} />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t('add_employee.phone')}
                  name='phone'
                  rules={[{ required: true, message: t('add_employee.please_enter_phone_number') }]}
                >
                  <Input placeholder={t('add_employee.enter_phone_number')} />
                </Form.Item>
              </Col>
              <Col span={12} className='gutter-row'>
                <h2 className='text-center text-xl mt-3 mb-3 txt-color'>
                  {t('add_employee.address_information')}
                </h2>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t('add_employee.street')}
                  name='street'
                  rules={[{ required: true, message: t('add_employee.please_input_street') }]}
                >
                  <Input placeholder={t('add_employee.enter_street')} style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t('add_employee.city')}
                  name='city'
                  rules={[{ required: true, message: t('add_employee.please_input_city') }]}
                >
                  <Input placeholder={t('add_employee.enter_city')} />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t('add_employee.state')}
                  name='state'
                  rules={[{ required: true, message: t('add_employee.please_input_state') }]}
                >
                  <Input placeholder={t('add_employee.enter_state')} />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t('add_employee.zip_code')}
                  name='zipCode'
                  rules={[{ required: true, message: t('add_employee.please_input_zip_code') }]}
                >
                  <Input placeholder={t('add_employee.enter_zip_code')} />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t('add_employee.country')}
                  name='country'
                  rules={[{ required: true, message: t('add_employee.please_input_country') }]}
                >
                  <Input placeholder={t('add_employee.enter_country')} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col span={12} className='gutter-row'>
                <h2 className='text-center text-xl mt-3 mb-3 txt-color'>
                  {t('add_employee.employee_information')}
                </h2>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t('add_employee.joining_date')}
                  name='joinDate'
                  rules={[{ required: true, message: t('add_employee.please_input_joining_date') }]}
                >
                  <DatePicker className='date-picker hr-staffs-date-picker' />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t('add_employee.leave_date')}
                  name='leaveDate'
                >
                  <DatePicker className='date-picker hr-staffs-date-picker' />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t('add_employee.employee_id')}
                  name='employeeId'
                  rules={[{ required: true, message: t('add_employee.please_input_employee_id') }]}
                >
                  <Input placeholder={t('add_employee.enter_employee_id')} />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t('add_employee.blood_group')}
                  name='bloodGroup'
                  rules={[{ required: true, message: t('add_employee.please_input_blood_group') }]}
                >
                  <Select placeholder={t('add_employee.select_blood_group')}>
                    {bloodGroups.map((bg) => (
                      <Option key={bg} value={bg}>
                        {bg}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t('add_employee.employee_status')}
                  name='employeeStatus'
                  rules={[{ required: true, message: t('add_employee.please_input_employment_status') }]}
                >
                  <Select placeholder={t('add_employee.select_status')}>
                    {employmentStatus?.map(({ id, name }) => (
                      <Option key={id} value={id}>
                        {name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t('add_employee.department')}
                  name='department'
                  rules={[{ required: true, message: t('add_employee.please_input_department') }]}
                >
                  <Select placeholder={t('add_employee.select_department')}>
                    {department?.map(({ id, name }) => (
                      <Option key={id} value={id}>
                        {name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t('add_employee.designation')}
                  name='designation'
                >
                  <Select placeholder={t('add_employee.select_designation')}>
                    {designation?.map(({ id, name }) => (
                      <Option key={id} value={id}>
                        {name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t('add_employee.shift')}
                  name='shift'
                >
                  <Select placeholder={t('add_employee.select_shift')}>
                    {shift?.map(({ id, name }) => (
                      <Option key={id} value={id}>
                        {name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t('add_employee.leave_policy')}
                  name='leavePolicy'
                >
                  <Select placeholder={t('add_employee.select_leave_policy')}>
                    {leavePolicy?.map(({ id, name }) => (
                      <Option key={id} value={id}>
                        {name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label={t('add_employee.weekly_holiday')}
                  name='weeklyHoliday'
                >
                  <Select placeholder={t('add_employee.select_weekly_holiday')}>
                    {weeklyHoliday?.map(({ id, name }) => (
                      <Option key={id} value={id}>
                        {name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col span={24}>
                <EmployeeEducationForm />
              </Col>
            </Row>

            <Form.Item
              wrapperCol={{ offset: 0, span: 24 }}
            >
              <Button
                htmlType='submit'
                icon={<PlusOutlined />}
                loading={isLoading}
                style={{ width: "100%" }}
                className="btn-darkblue"
              >
                {t('add_employee.add_new_staff')}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </UserPrivateComponent>
    </>
  );
};

export default AddUser;
