import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useUpdateJobWorkExperienceMutation } from "../../../redux/rtk/features/recruitment/jobWorkExperience/jobWorkExperienceApi";
import BtnEditSvg from "../Button/btnEditSvg";

const JobWorkExperienceEditPopup = ({ data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { id } = useParams("id");

    const [updateSingleJobWorkExperience, { isLoading }] =
        useUpdateJobWorkExperienceMutation();

    const onFinish = async (values) => {
        await updateSingleJobWorkExperience({ id, values });
    };

    const initialValues = {
        workExperience: data?.workExperience,
    };

    const onFinishFailed = (errorInfo) => {
        toast.warning("Failed to update job Work Experience");
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
                title="Job Work Experience Edit"
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
                            label="Work Experience"
                            name="workExperience"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please input Job Work Experience!",
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
                                Update Work Experience
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </>
    );
};

export default JobWorkExperienceEditPopup;
