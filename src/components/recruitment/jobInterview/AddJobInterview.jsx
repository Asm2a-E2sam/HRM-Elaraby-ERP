import { Button, DatePicker, Form, Input, Select, TimePicker } from "antd";
import dayjs from "dayjs";
import React from "react";
import { toast } from "react-toastify";
import { useGetJobApplicationsQuery } from "../../../redux/rtk/features/recruitment/jobApplication/jobApplicationApi";
import { useAddJobInterviewMutation } from "../../../redux/rtk/features/recruitment/jobInterview/jobInterviewApi";
import { useGetUsersQuery } from "../../../redux/rtk/features/user/userApi";

const AddJobInterview = () => {
    const { Option } = Select;
    const [form] = Form.useForm();

    const [addSingleJobInterview, { isLoading: addLoading }] =
        useAddJobInterviewMutation();
    const { data: jobApplicationData, isLoading: jobApplicationLoading } =
        useGetJobApplicationsQuery({ query: "all" });

    const { data: usersData, isLoading: usersLoading } = useGetUsersQuery({
        query: "all",
    });

    const onFinish = async (values) => {
        values.scheduleDate = dayjs(values.scheduleDate).format(
            "YYYY-MM-DD HH:mm:ss"
        );
        values.scheduleTime = dayjs(values.scheduleTime).format("HH:mm:ss");

        const resp = await addSingleJobInterview(values);
        if (resp.data && !resp.error) {
            form.resetFields();
        }
    };

    const onFinishFailed = (errorInfo) => {
        toast.warning("Failed at adding Job Interview");
    };
    return (
        <Form
            style={{ marginBottom: "40px" }}
            form={form}
            eventKey={"jobInterview-form"}
            name="basic"
            className="mx-4"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <div>
                <Form.Item
                    style={{ marginBottom: "10px" }}
                    label={"Job Applicant"}
                    name={"jobApplicationId"}
                    rules={[
                        {
                            required: true,
                            message: "please Input Job Applicant!",
                        },
                    ]}
                >
                    <Select
                        loading={jobApplicationLoading}
                        size="middle"
                        mode="single"
                        allowClear
                        style={{
                            width: "100%",
                        }}
                        placeholder="Please select Job Applicant"
                    >
                        {jobApplicationData &&
                            jobApplicationData.map((item) => (
                                <Option key={item.id} value={item.id}>
                                    {item.name}- {item.id}
                                </Option>
                            ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: "10px" }}
                    label={"Schedule Date"}
                    name={"scheduleDate"}
                    rules={[
                        {
                            required: true,
                            message: "please Input Job Interview Schedule Date",
                        },
                    ]}
                >
                    <DatePicker format={"YYYY-MM-DD"} />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: "10px" }}
                    label={"Schedule Time"}
                    name={"scheduleTime"}
                    rules={[
                        {
                            required: true,
                            message: "please Input Job Interview Schedule Time",
                        },
                    ]}
                >
                    <TimePicker format={"HH:mm:s"} />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: "10px" }}
                    label={"Comment"}
                    name={"comment"}
                    rules={[
                        {
                            required: true,
                            message: "please Input Job Interview comment",
                        },
                    ]}
                >
                    <Input placeholder="please input comment here" />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: "12px" }}
                    label="Assign Member"
                    name="assignedMembers"
                    rules={[
                        {
                            required: true,
                            message: "Please input Assign member!",
                        },
                    ]}
                >
                    <Select
                        mode="multiple"
                        loading={usersLoading}
                        style={{
                            width: "100%",
                        }}
                        placeholder="select member"
                        optionLabelProp="children"
                    >
                        {usersData &&
                            usersData.map((user) => (
                                <Option key={user.id} value={user.id}>
                                    {user.username}
                                </Option>
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
                        type="primary"
                        size="large"
                        htmlType="submit"
                        block
                        loading={addLoading}
                    >
                        Add Job Interview
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
};

export default AddJobInterview;
