import { Button, Form, Input } from "antd";
import React from "react";
import { toast } from "react-toastify";
import { useAddJobApplicationStatusMutation } from "../../../redux/rtk/features/recruitment/jobApplicationStatus/jobApplicationStatusApi";

const AddJobApplicationStatus = () => {
    const [form] = Form.useForm();

    const [AddJobApplicationStatus, { isLoading: addLoading }] =
        useAddJobApplicationStatusMutation();

    const onFinish = async (values) => {
        const resp = await AddJobApplicationStatus(values);

        if (resp.data && !resp.error) {
            form.resetFields();
        }
    };

    const onFinishFailed = (errorInfo) => {
        toast.warning("Failed at adding job Application Status");
    };

    return (
        <Form
            style={{ marginBottom: "40px" }}
            form={form}
            eventKey={"jobApplicationStatus-form"}
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
                    label={"Application Status"}
                    name={"applicationStatus"}
                    rules={[
                        {
                            required: true,
                            message: "please Input Application Status",
                        },
                    ]}
                >
                    <Input placeholder="HIRED" />
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
                        Add Application Status
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
};

export default AddJobApplicationStatus;
