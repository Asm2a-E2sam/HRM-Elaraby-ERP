import { Button, Form, Input } from "antd";
import React from "react";
import { toast } from "react-toastify";
import { useAddJobTypeMutation } from "../../../redux/rtk/features/recruitment/jobType/jobTypeApi";

const AddJobType = () => {
    const [form] = Form.useForm();

    const [addSingleJobType, { isLoading: addLoading }] =
        useAddJobTypeMutation();

    const onFinish = async (values) => {
        const resp = await addSingleJobType(values);

        if (resp.data && !resp.error) {
            form.resetFields();
        }
    };

    const onFinishFailed = (errorInfo) => {
        toast.warning("Failed at adding Job Type");
    };
    return (
        <Form
            style={{ marginBottom: "40px" }}
            form={form}
            eventKey={"jobType-form"}
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
                    label={"Job Type"}
                    name={"jobTypeName"}
                    rules={[
                        {
                            required: true,
                            message: "please Input Job Type Name",
                        },
                    ]}
                >
                    <Input placeholder="Full Time" />
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
                        Add Job Type
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
};

export default AddJobType;
