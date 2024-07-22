import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Upload } from "antd";
import React, { useState } from "react";
import { useGetJobsQuery } from "../../../redux/rtk/features/recruitment/job/jobApi";
import { useAddJobApplicationMutation } from "../../../redux/rtk/features/recruitment/jobApplication/jobApplicationApi";
import fileConfig from "../../../utils/fileConfig";

const AddJobApplication = () => {
    const { Option } = Select;
    const [fileList, setFileList] = useState([]);
    const [form] = Form.useForm();

    const { data: jobData, isLoading: jobLoading } = useGetJobsQuery({
        query: "all",
    });

    const [addSingleJobApplication, { isLoading: addLoading }] =
        useAddJobApplicationMutation();

    const onFinish = async (values) => {
        try {
            const formData = new FormData();
            formData.append("jobId", values.jobId);
            formData.append("name", values.name);
            formData.append("address", values.address);
            formData.append("phone", values.phone);
            formData.append("email", values.email);
            formData.append("coverLater", values.coverLater);
            if (fileList.length) {
                if (fileConfig() === "laravel") {
                    formData.append("files[]", fileList[0].originFileObj);
                }
            }

            // request send for api response
            const result = await addSingleJobApplication(formData);
            if (result.data && !result.error) {
                form.resetFields();
            }
        } catch (error) {}
    };

    const onFinishFailed = () => {};

    const handelImageChange = ({ fileList }) => {
        setFileList(fileList);
    };

    return (
        <Form
            style={{ marginBottom: "40px" }}
            form={form}
            eventKey={"jobApplication-form"}
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
                        loading={addLoading}
                    >
                        Add Job Application
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
};

export default AddJobApplication;
