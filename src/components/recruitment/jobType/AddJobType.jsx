import { Button, Form, Input } from "antd";
import React from "react";
import { toast } from "react-toastify";
import { useAddJobTypeMutation } from "../../../redux/rtk/features/recruitment/jobType/jobTypeApi";
import { useTranslation } from "react-i18next"; 

const AddJobType = () => {
    const [form] = Form.useForm();
    const { t } = useTranslation();

    const [addSingleJobType, { isLoading: addLoading }] =
        useAddJobTypeMutation();

    const onFinish = async (values) => {
        const resp = await addSingleJobType(values);

        if (resp.data && !resp.error) {
            form.resetFields();
        }
    };

    const onFinishFailed = (errorInfo) => {
        toast.warning(t("recruitment.warning_msg"));
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
                    label={t("recruitment.job_type")}
                    name={"jobTypeName"}
                    rules={[
                        {
                            required: true,
                            message: t("recruitment.job_type_msg"),
                        },
                    ]}
                >
                    <Input placeholder={t("recruitment.full_time")} />
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
                        {t("recruitment.add_job_type")}
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
};

export default AddJobType;
