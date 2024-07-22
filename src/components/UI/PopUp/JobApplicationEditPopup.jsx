import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Upload } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetJobsQuery } from "../../../redux/rtk/features/recruitment/job/jobApi";
import { useUpdateJobApplicationMutation } from "../../../redux/rtk/features/recruitment/jobApplication/jobApplicationApi";
import fileConfig from "../../../utils/fileConfig";
import BtnEditSvg from "../Button/btnEditSvg";

const JobApplicationEditPopup = ({ data }) => {
    const { Option } = Select;
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fileList, setFileList] = useState([]);
    const { id } = useParams("id");
    const currentStatus = data?.applicationStatus;

    const { data: jobData, isLoading: jobLoading } = useGetJobsQuery({
        query: "all",
    });

    const [updateSingleJobApplication, { isLoading: updateLoading }] =
        useUpdateJobApplicationMutation();

    const onFinish = async (values) => {
        try {
            const formData = new FormData();
            formData.append("jobId", values.jobId);
            formData.append("name", values.name);
            formData.append("address", values.address);
            formData.append("phone", values.phone);
            formData.append("email", values.email);
            formData.append("coverLater", values.coverLater);
            formData.append("_method", "PUT");
            if (fileList.length) {
                if (fileConfig() === "laravel") {
                    formData.append("files[]", fileList[0].originFileObj);
                }
            }

            // request send for api response
            const result = await updateSingleJobApplication({ id, formData });
            if (result.data && !result.error) {
                form.resetFields();
            }
        } catch (error) {}
    };

    const initialValues = {
        jobId: data?.jobId,
        name: data?.name,
        address: data?.address,
        phone: data?.phone,
        email: data?.email,
        coverLater: data?.coverLater,
    };

    const applicationStatusData = ["APPLIED", "REVIEWING", "CANCELED", "HIRED"];

    const onFinishFailed = (errorInfo) => {
        toast.warning("Failed to update job Skill");
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

    const handelImageChange = ({ fileList }) => {
        setFileList(fileList);
    };
    return (
        <>
            <button onClick={showModal}>
                <BtnEditSvg size={36} />
            </button>
            <Modal
                title="Job Application Edit"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    style={{ marginBottom: "40px" }}
                    form={form}
                    eventKey={"jobApplication-form"}
                    name="basic"
                    className="mx-4"
                    layout="vertical"
                    initialValues={{ ...initialValues }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <div>
                        <Form.Item
                            style={{ marginBottom: "10px" }}
                            label={"Job"}
                            name={"jobId"}
                            rules={[
                                {
                                    required: true,
                                    message: "please Select Job",
                                },
                            ]}
                        >
                            <Select
                                loading={jobLoading}
                                size="middle"
                                mode="single"
                                allowClear
                                style={{
                                    width: "100%",
                                }}
                                placeholder="Please select Job"
                            >
                                {jobData &&
                                    jobData.map((job) => (
                                        <Option key={job.id} value={job.id}>
                                            {job.jobTitle}
                                        </Option>
                                    ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            style={{ marginBottom: "10px" }}
                            label={"Candidate Name"}
                            name={"name"}
                            rules={[
                                {
                                    required: true,
                                    message: "please Input Candidate Name",
                                },
                            ]}
                        >
                            <Input placeholder="Mr. XYZ" />
                        </Form.Item>

                        <Form.Item
                            style={{ marginBottom: "10px" }}
                            label={"Email"}
                            name={"email"}
                            rules={[
                                {
                                    required: true,
                                    type: "email",
                                    message: "please Input Email",
                                },
                            ]}
                        >
                            <Input placeholder="example@gmail.com" />
                        </Form.Item>

                        <Form.Item
                            style={{ marginBottom: "10px" }}
                            label={"Phone"}
                            name={"phone"}
                            rules={[
                                {
                                    required: true,
                                    message: "please Input Phone",
                                },
                            ]}
                        >
                            <Input placeholder="018*******9" />
                        </Form.Item>

                        <Form.Item
                            style={{ marginBottom: "10px" }}
                            label={"Address"}
                            name={"address"}
                            rules={[
                                {
                                    required: true,
                                    message: "please Input Address",
                                },
                            ]}
                        >
                            <Input placeholder="Dhaka, Bangladesh" />
                        </Form.Item>

                        <Form.Item
                            label="Upload CV or Resume"
                            valuePropName="fileList"
                            rules={[
                                {
                                    required: true,
                                    message: "upload your cv or resume",
                                },
                            ]}
                        >
                            <Upload
                                accept=".pdf"
                                listType="picture-card"
                                beforeUpload={() => false}
                                name="files[]"
                                fileList={fileList}
                                maxCount={1}
                                onChange={handelImageChange}
                            >
                                <div>
                                    <UploadOutlined />
                                    <div
                                        style={{
                                            marginTop: 8,
                                        }}
                                    >
                                        Upload
                                    </div>
                                </div>
                            </Upload>
                        </Form.Item>

                        <Form.Item
                            style={{ marginBottom: "10px" }}
                            label={"Cover Letter"}
                            name={"coverLater"}
                        >
                            <Input />
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
                                loading={updateLoading}
                            >
                                Update Job Application
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </>
    );
};

export default JobApplicationEditPopup;
