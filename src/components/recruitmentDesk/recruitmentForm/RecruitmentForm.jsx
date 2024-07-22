import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAddJobApplicationMutation } from "../../../redux/rtk/features/recruitment/jobApplication/jobApplicationApi";
import fileConfig from "../../../utils/fileConfig";
import JobTitle from "../recruitmentLayout/JobTitle";
import RecruitmentCommonBanner from "../recruitmentLayout/RecruitmentCommonBanner";

const RecruitmentForm = () => {
    const { jobId } = useParams();

    const [fileList, setFileList] = useState([]);
    const [form] = Form.useForm();

    const [addSingleJobApplication, { isLoading: addLoading }] =
        useAddJobApplicationMutation();

    const onFinish = async (values) => {
        try {
            const formData = new FormData();
            formData.append("jobId", jobId);
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
        <>
            {" "}
            <RecruitmentCommonBanner title={"Application Form"} />
            <div className="my-12 mx-12">
                <JobTitle title={"Apply Now"} />

                <div className="w-2/3 mx-auto">
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
                                <TextArea rows={4} />
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
                                    Apply
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default RecruitmentForm;
