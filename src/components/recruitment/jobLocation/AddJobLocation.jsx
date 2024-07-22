import { Button, Form, Input } from "antd";
import React from "react";
import { toast } from "react-toastify";
import { useAddJobLocationMutation } from "../../../redux/rtk/features/recruitment/jobLocation/jobLocationApi";

const AddJobLocation = () => {
    const [form] = Form.useForm();

    const [addSingleJobLocation, { isLoading: addLoading }] =
        useAddJobLocationMutation();

    const onFinish = async (values) => {
        const resp = await addSingleJobLocation(values);

        if (resp.data && !resp.error) {
            form.resetFields();
        }
    };

    const onFinishFailed = (errorInfo) => {
        toast.warning("Failed at adding Job Location");
    };

    return (
        <Form
            style={{ marginBottom: "40px" }}
            form={form}
            eventKey={"jobLocation-form"}
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
                    label={"Country"}
                    name={"countryName"}
                    rules={[
                        {
                            required: true,
                            message: "please Input Country Name",
                        },
                    ]}
                >
                    <Input placeholder="Bangladesh" />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: "10px" }}
                    label={"Location"}
                    name={"jobLocation"}
                    rules={[
                        {
                            required: true,
                            message: "please Input Location",
                        },
                    ]}
                >
                    <Input placeholder="Dhaka" />
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
                        Add Job Location
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
};

export default AddJobLocation;
