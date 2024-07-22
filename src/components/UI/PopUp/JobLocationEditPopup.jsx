import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useUpdateJobLocationMutation } from "../../../redux/rtk/features/recruitment/jobLocation/jobLocationApi";
import BtnEditSvg from "../Button/btnEditSvg";

const JobLocationEditPopup = ({ data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { id } = useParams("id");

    const [updateSingleLocation, { isLoading }] =
        useUpdateJobLocationMutation();

    const onFinish = async (values) => {
        await updateSingleLocation({ id, values });
    };

    const initialValues = {
        countryName: data?.countryName,
        jobLocation: data?.jobLocation,
    };

    const onFinishFailed = (errorInfo) => {
        toast.warning("Failed to update job Location");
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
                title="Job Location Edit"
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
                            label="Country"
                            name="countryName"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input Country Name!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            style={{ marginBottom: "10px" }}
                            label="Location"
                            name="jobLocation"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input Location!",
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
                                Update Job Location
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </>
    );
};

export default JobLocationEditPopup;
