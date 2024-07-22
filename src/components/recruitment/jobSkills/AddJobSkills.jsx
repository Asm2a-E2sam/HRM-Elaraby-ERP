import { Button, Form, Input, Select } from "antd";
import React from "react";
import { toast } from "react-toastify";
import { useGetJobCategoriesQuery } from "../../../redux/rtk/features/recruitment/jobCategory/jobCategoryApi";
import { useAddJobSkillsMutation } from "../../../redux/rtk/features/recruitment/jobSkills/jobSkillsApi";

const AddJobSkills = () => {
    const { Option } = Select;
    const [form] = Form.useForm();

    const [addSingleJobSkills, { isLoading: addLoading }] =
        useAddJobSkillsMutation();
    const { data: jobCategoryData, isLoading: jobCategoryLoading } =
        useGetJobCategoriesQuery({ query: "all" });

    const onFinish = async (values) => {
        const resp = await addSingleJobSkills(values);

        if (resp.data && !resp.error) {
            form.resetFields();
        }
    };

    const onFinishFailed = (errorInfo) => {
        toast.warning("Failed at adding Job Skill");
    };
    return (
        <Form
            style={{ marginBottom: "40px" }}
            form={form}
            eventKey={"jobSkills-form"}
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
                    <Input placeholder="React.js" />
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
                        Add Job Type
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
};

export default AddJobSkills;
