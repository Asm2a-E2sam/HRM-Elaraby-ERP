import { Button, Form, Input } from "antd";
import React from "react";
import { toast } from "react-toastify";
import { useAddJobCategoryMutation } from "../../../redux/rtk/features/recruitment/jobCategory/jobCategoryApi";

const AddJobCategory = () => {
    const [form] = Form.useForm();

    const [addSingleJobCategory, { isLoading: addLoading }] =
        useAddJobCategoryMutation();

    const onFinish = async (values) => {
        const resp = await addSingleJobCategory(values);

        if (resp.data && !resp.error) {
            form.resetFields();
        }
    };

    const onFinishFailed = (errorInfo) => {
        toast.warning("Failed at adding job category");
    };

    return (
        <Form
            style={{ marginBottom: "40px" }}
            form={form}
            eventKey={"jobCategory-form"}
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
                    label={"Job Category"}
                    name={"jobCategoryName"}
                    rules={[
                        {
                            required: true,
                            message: "please Input Job Category Name",
                        },
                    ]}
                >
                    <Input placeholder="Engineering" />
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
                        Add Job Category
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
};

export default AddJobCategory;
