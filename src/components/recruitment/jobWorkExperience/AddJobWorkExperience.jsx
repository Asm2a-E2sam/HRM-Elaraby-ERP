import { Button, Form, Input } from "antd";
import React from "react";
import { toast } from "react-toastify";
import { useAddJobWorkExperienceMutation } from "../../../redux/rtk/features/recruitment/jobWorkExperience/jobWorkExperienceApi";

const AddJobWorkExperience = () => {
    const [form] = Form.useForm();

    const [addSingleJobWorkExperience, { isLoading: addLoading }] =
        useAddJobWorkExperienceMutation();

    const onFinish = async (values) => {
        const resp = await addSingleJobWorkExperience(values);

        if (resp.data && !resp.error) {
            form.resetFields();
        }
    };

    const onFinishFailed = (errorInfo) => {
        toast.warning("Failed at adding Job Work Experience");
    };
    return (
        <Form
            style={{ marginBottom: "40px" }}
            form={form}
            eventKey={"jobWorkExperience-form"}
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
                    label={"Work Experience"}
                    name={"workExperience"}
                    rules={[
                        {
                            required: true,
                            message: "please Input Job Work Experience",
                        },
                    ]}
                >
                    <Input placeholder="1-2 years" />
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
                        Add Job Work Experience
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
};

export default AddJobWorkExperience;
