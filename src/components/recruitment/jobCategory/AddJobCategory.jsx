import { Button, Form, Input } from "antd";
import React from "react";
import { toast } from "react-toastify";
import { useAddJobCategoryMutation } from "../../../redux/rtk/features/recruitment/jobCategory/jobCategoryApi";
import { useTranslation } from "react-i18next"; 

const AddJobCategory = () => {
    const [form] = Form.useForm();
    const { t } = useTranslation();

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
                    label={t("recruitment.job_category")}
                    name={"jobCategoryName"}
                    rules={[
                        {
                            required: true,
                            message: t("recruitment.job_category_msg"),
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
                        {t("recruitment.add_job_category")}
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
};

export default AddJobCategory;
