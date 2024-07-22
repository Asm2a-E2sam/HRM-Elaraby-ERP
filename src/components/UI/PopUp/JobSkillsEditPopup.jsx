import { Button, Form, Input, Modal, Select } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetJobCategoriesQuery } from "../../../redux/rtk/features/recruitment/jobCategory/jobCategoryApi";
import { useUpdateJobSkillsMutation } from "../../../redux/rtk/features/recruitment/jobSkills/jobSkillsApi";
import BtnEditSvg from "../Button/btnEditSvg";

const JobSkillsEditPopup = ({ data }) => {
    const { Option } = Select;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { id } = useParams("id");

    const [updateSingleJobSkill, { isLoading }] = useUpdateJobSkillsMutation();
    const { data: jobCategoryData, isLoading: jobCategoryLoading } =
        useGetJobCategoriesQuery({ query: "all" });

    const onFinish = async (values) => {
        await updateSingleJobSkill({ id, values });
    };

    const initialValues = {
        jobCategoryName: data?.jobCategory.jobCategoryName,
        jobCategoryId: data?.jobCategoryId,
        jobSkillName: data?.jobSkillName,
    };

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
    return (
        <>
            <button onClick={showModal}>
                <BtnEditSvg size={36} />
            </button>
            <Modal
                title="Job Skill Edit"
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
                            label={"Job Category"}
                            name={"jobCategoryId"}
                            rules={[
                                {
                                    required: true,
                                    message: "please Input Job Category!",
                                },
                            ]}
                        >
                            <Select
                                loading={jobCategoryLoading}
                                size="middle"
                                mode="single"
                                allowClear
                                style={{
                                    width: "100%",
                                }}
                                placeholder="Please select Job Category"
                            >
                                {jobCategoryData &&
                                    jobCategoryData.map((jobCategory) => (
                                        <Option
                                            key={jobCategory.id}
                                            value={jobCategory.id}
                                        >
                                            {jobCategory.jobCategoryName}
                                        </Option>
                                    ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            style={{ marginBottom: "10px" }}
                            label={"Job Skill"}
                            name={"jobSkillName"}
                            rules={[
                                {
                                    required: true,
                                    message: "please Input Job Skill",
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
                                Update Job Type
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </>
    );
};

export default JobSkillsEditPopup;
