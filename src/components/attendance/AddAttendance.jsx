import { useState } from "react";
import { useTranslation } from "react-i18next"; 

import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  TimePicker,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useAddManualAttendanceMutation } from "../../redux/rtk/features/attendance/attendanceApi";
import { useGetUsersQuery } from "../../redux/rtk/features/user/userApi";

const AddAttendance = ({ drawer }) => {
  const { data: users } = useGetUsersQuery({ query: "all" });
  const [addManualAttendance, { isLoading }] = useAddManualAttendanceMutation();
  const { t } = useTranslation();

  const { Title } = Typography;
  const [form] = Form.useForm();

  const [inTimeDate, setInTimeDate] = useState({
    time: null,
    date: null,
  });
  const [outTimeDate, setOutTimeDate] = useState({
    time: null,
    date: null,
  });

  // make a new date variable from inTimeDate state which will contain date and time
  const inTimeDateNew = new Date(inTimeDate.date + " " + inTimeDate.time);

  const outTimeDateNew = new Date(outTimeDate.date + " " + outTimeDate.time);

  const onFinish = async (values) => {
    const FormData = {
      ip: values.ip,
      userId: values.userId,
      comment: values.comment,
      inTime:
        inTimeDateNew !== t("add_attendance.invalid_date")
          ? dayjs(inTimeDateNew).format("YYYY-MM-DD HH:mm:ss")
          : null,
      outTime:
        outTimeDateNew !== t("add_attendance.invalid_date")
          ? dayjs(outTimeDateNew).format("YYYY-MM-DD HH:mm:ss")
          : null,
    };

    const resp = await addManualAttendance(FormData);
    if (resp.data && !resp.error) {
      form.resetFields();
      setInTimeDate("");
      setOutTimeDate("");
    }
  };
  const onFinishFailed = () => {
    toast.warning(t("add_attendance.failed_at_adding_shift"));
  };

  return (
    <>
      <Title level={4} className='m-2 mt-5 mb-5 text-center'>
        {t("add_attendance.add_manual_attendance")}
      </Title>
      {inTimeDate.time === null ||
      inTimeDate.date === null ||
      outTimeDate.time === null ||
      outTimeDate.date === null ? (
        <p className='text-center text-rose-500 text-sm font-medium mb-4'>
          {" "}
          {t("add_attendance.please_fill_Date_and_time")}
        </p>
      ) : (
        ""
      )}
      <Form
        form={form}
        style={{ marginBottom: "40px" }}
        eventKey='shift-form'
        name='basic'
        layout='vertical'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        className='mx-4'
      >
        <div>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label={t("add_attendance.user")}
            name='userId'
            rules={[
              {
                required: true,
                message: t("add_attendance.please_input_your_user"),
              },
            ]}
          >
            <Select placeholder={t("add_attendance.select_user")}>
              {users?.map((user) => (
                <Select.Option key={user.id} value={user.id}>
                  {user.username}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label={t("add_attendance.start_time")}
            name='inTime'
          >
            <div className='flex justify-between'>
              <DatePicker
                format={"YYYY-MM-DD"}
                onChange={(date, dateString) =>
                  setInTimeDate({ ...inTimeDate, date: dateString })
                }
              />
              <TimePicker
                className='ml-4'
                format={"HH:mm:s"}
                onChange={(time, timeString) =>
                  setInTimeDate({ ...inTimeDate, time: timeString })
                }
              />
            </div>
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label={t("add_attendance.end_time")}
            name='outTime'
          >
            <div className='flex justify-between'>
              <DatePicker
                format={"YYYY-MM-DD"}
                onChange={(date, dateString) =>
                  setOutTimeDate({ ...outTimeDate, date: dateString })
                }
              />
              <TimePicker
                className='ml-4'
                format={"HH:mm:s"}
                onChange={(time, timeString) =>
                  setOutTimeDate({ ...outTimeDate, time: timeString })
                }
              />
            </div>
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label={t("add_attendance.comment")}
            name='comment'
          >
            <Input placeholder={t("add_attendance.comment")} />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label={t("add_attendance.ip_address")}
            name='ip'
          >
            <Input placeholder='127.0.0.1' />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            wrapperCol={{
              offset: 6,
              span: 12,
            }}
          >
            <Button
              type='primary'
              size='large'
              disabled={
                inTimeDate.time === null ||
                inTimeDate.date === null ||
                outTimeDate.time === null ||
                outTimeDate.date === null
              }
              htmlType='submit'
              block
              loading={isLoading}
            >
              {t("add_attendance.add_attendance")}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default AddAttendance;
