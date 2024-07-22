import { Button, Form, Select } from "antd";
import React from "react";
import { toast } from "react-toastify";
import { useUpdateJobApplicationStatusMutation } from "../../../redux/rtk/features/recruitment/jobApplication/jobApplicationApi";
import { useGetJobApplicationStatusesQuery } from "../../../redux/rtk/features/recruitment/jobApplicationStatus/jobApplicationStatusApi";

const ReviewJobApplication = ({ data }) => {
    const [form] = Form.useForm();
    const id = data?.id;
    const currentStatus = data?.applicationStatus;
    const { Option } = Select;

    const {
        data: jobApplicationStatusData,
        isLoading: jobApplicationStatusLoading,
    } = useGetJobApplicationStatusesQuery({ query: "all" });

    const [updateApplicationStatus, { isLoading: addLoading }] =
        useUpdateJobApplicationStatusMutation();

    const initialValues = {
        applicationStatus: currentStatus,
    };

    const onFinish = async (values) => {
        const resp = await updateApplicationStatus({ id, values });
        if (resp.data && !resp.error) {
            form.resetFields();
        }
    };

    const onFinishFailed = (errorInfo) => {
        toast.warning("Failed at review job application");
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
                                {data?.name.toUpperCase()}{" "}
                            </p>
                        </li>
                        <li className="text-sm text-gray-600 font-semibold py-2 px-4 bg-gray-100 mb-1.5 rounded  flex justify-start">
                            Applied For :{" "}
                            <p className="ml-2 text-sm text-gray-900">
                                {data?.job.jobTitle.toUpperCase()}{" "}
                            </p>
                        </li>
                    </ul>
                </div>
                <Form.Item
                    style={{ marginBottom: "10px" }}
                    label={"Application Status"}
                    name={"applicationStatusId"}
                    rules={[
                        {
                            required: true,
                            message: "please Select Application Status",
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
                        placeholder="Please select Application Status"
                    >
                        {jobApplicationStatusData &&
                            jobApplicationStatusData.map((item) => (
                                <Option key={item.id} value={item.id}>
                                    {item.applicationStatus}
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
                        review
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
};

export default ReviewJobApplication;
