import { Button, Form, Select } from "antd";
import React from "react";
import { toast } from "react-toastify";
import { useUpdateJobInterviewStatusMutation } from "../../../redux/rtk/features/recruitment/jobInterview/jobInterviewApi";

const ReviewJobInterview = ({ data }) => {
    const [form] = Form.useForm();
    const id = data?.id;
    const currentStatus = data?.interviewStatus;
    const { Option } = Select;

    const [updateJobInterviewStatus, { isLoading: addLoading }] =
        useUpdateJobInterviewStatusMutation();

    const initialValues = {
        interviewStatus: currentStatus,
    };

    const interviewStatusData = ["PENDING", "INTERVIEWED"];

    const onFinish = async (values) => {
        const modifiedValues = {
            ...values,
            jobApplicationId: data?.jobApplicationId,
        };

        const resp = await updateJobInterviewStatus({ id, modifiedValues });
        if (resp.data && !resp.error) {
            form.resetFields();
        }
    };

    const onFinishFailed = (errorInfo) => {
        toast.warning("Failed at review job Interview");
    };
    return (
        <Form
            style={{ marginBottom: "40px" }}
            form={form}
            eventKey={"jobApplicationReview-form"}
            name="basic"
            className="mx-4"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            initialValues={{ ...initialValues }}
        >
            <div>
                <div className="flex justify-center my-4">
                    <ul className="list-inside list-none w-full">
                        <li className="text-sm text-gray-600 font-semibold py-2 px-4 bg-gray-100 mb-1.5 rounded  flex justify-start">
                            Candidate Name :{" "}
                            <p className="ml-2 text-sm text-gray-900">
                                {data?.jobApplication.name.toUpperCase()}{" "}
                            </p>
                        </li>
                        <li className="text-sm text-gray-600 font-semibold py-2 px-4 bg-gray-100 mb-1.5 rounded  flex justify-start">
                            Applied For :{" "}
                            <p className="ml-2 text-sm text-gray-900">
                                {data?.jobApplication.job.jobTitle.toUpperCase()}{" "}
                            </p>
                        </li>
                    </ul>
                </div>
                <Form.Item
                    style={{ marginBottom: "10px" }}
                    label={"Interview Status"}
                    name={"interviewStatus"}
                    rules={[
                        {
                            required: true,
                            message: "please Select Interview Status",
                        },
                    ]}
                >
                    <Select
                        size="middle"
                        mode="single"
                        allowClear
                        style={{
                            width: "100%",
                        }}
                        placeholder="Please select Interview Status"
                    >
                        {interviewStatusData &&
                            interviewStatusData.map((item) => (
                                <Option key={item} value={item}>
                                    {item}
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
                        review interview
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
};

export default ReviewJobInterview;
