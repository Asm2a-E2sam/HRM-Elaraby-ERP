import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useUpdateJobCategoryMutation } from "../../../redux/rtk/features/recruitment/jobCategory/jobCategoryApi";
import BtnEditSvg from "../Button/btnEditSvg";

const JobCategoryEditPopup = ({ data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { id } = useParams("id");

    const [updateSingleJobCategory, { isLoading }] =
        useUpdateJobCategoryMutation();

    const onFinish = async (values) => {
        await updateSingleJobCategory({ id, values });
    };

    const initialValues = {
        jobCategoryName: data?.jobCategoryName,
    };

    const onFinishFailed = (errorInfo) => {
        toast.warning("Failed to update job Category");
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <button onClick={showModal}>
                <BtnEditSvg size={36} />
            </button>
            <Modal
                title="Job Category Edit"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    style={{ marginBottom: "50px" }}
                    initialValues={{ ...initialValues }}
                    name="basic"
                    labelCol={{
                        span: 7,
                    }}
                    wrapperCol={{
                        span: 12,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <div>
                        <Form.Item
                            style={{ marginBottom: "10px" }}
                            label="Job Category"
                            name="jobCategoryName"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input Job Category Name!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            style={{ marginBottom: "10px" }}
                            wrapperCol={{
                                offset: 7,
                                span: 12,
                            }}
                        >
                            <Button
                                type="primary"
                                size="small"
                                htmlType="submit"
                                block
                                loading={isLoading}
                            >
                                Update Job Category
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </>
    );
};

export default JobCategoryEditPopup;
