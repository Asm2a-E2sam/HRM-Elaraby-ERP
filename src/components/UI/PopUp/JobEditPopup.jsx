import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Row,
    Select,
} from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import {
    useGetJobQuery,
    useUpdateJobMutation,
} from "../../../redux/rtk/features/recruitment/job/jobApi";
import { useGetJobCategoriesQuery } from "../../../redux/rtk/features/recruitment/jobCategory/jobCategoryApi";
import { useGetJobLocationsQuery } from "../../../redux/rtk/features/recruitment/jobLocation/jobLocationApi";
import { useGetJobSkillsByJobCategoryIdQuery } from "../../../redux/rtk/features/recruitment/jobSkills/jobSkillsApi";
import { useGetJobTypesQuery } from "../../../redux/rtk/features/recruitment/jobType/jobTypeApi";
import { useGetJobWorkExperiencesQuery } from "../../../redux/rtk/features/recruitment/jobWorkExperience/jobWorkExperienceApi";
import { useGetSettingQuery } from "../../../redux/rtk/features/setting/settingApi";
import UserPrivateComponent from "../../PrivateRoutes/UserPrivateComponent";
import PageTitle from "../../page-header/PageHeader";

const JobEditPopup = () => {
    const { id } = useParams();
    const { Option } = Select;

    const [form] = Form.useForm();
    const [rangeValue, setRangeValue] = useState("exactSalary");
    const [jobCategorySelected, setJobCategorySelected] = useState(null);

    const { data: companyData, isLoading: companyLoading } =
        useGetSettingQuery();
    const { data: jobTypeData, isLoading: jobTypeLoading } =
        useGetJobTypesQuery({ query: "all" });
    const { data: jobCategoryData, isLoading: jobCategoryLoading } =
        useGetJobCategoriesQuery({ query: "all" });
    const { data: jobLocationData, isLoading: jobLocationLoading } =
        useGetJobLocationsQuery({ query: "all" });
    const { data: jobSkillsData, isLoading: jobSkillsLoading } =
        useGetJobSkillsByJobCategoryIdQuery(jobCategorySelected);
    const { data: jobWorkExperienceData, isLoading: jobWorkExperienceLoading } =
        useGetJobWorkExperiencesQuery({ query: "all" });

    const { data: jobSingleData, isLoading: jobSingleLoading } =
        useGetJobQuery(id);
    const [updateSingleJob, { isLoading: updateLoading }] =
        useUpdateJobMutation();

    const jobCategoryHandler = (value) => {
        setJobCategorySelected(value);
    };

    const onFinish = async (values) => {
        try {
            // modified data
            values.jobPaySystem = rangeValue;

            // request send for api response
            const result = await updateSingleJob({ id, values });

            if (result.data && !result.error) {
                form.resetFields();
            }
        } catch (error) {}
    };

    const onFinishFailed = () => {};
    const payBy = ["monthly", "hourly", "daily", "yearly"];

    const onChange = (e) => {
        setRangeValue(e.target.value);
    };

    // Quill modules to add features like toolbar, image upload, etc.
    const textEditorModule = {
        toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["bold", "italic", "underline"],
            ["link"],
            [{ color: [] }, { background: [] }],
            ["clean"],
        ],
    };

    // Quill formats to specify allowed styles
    const textEditorFormats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "color",
        "background",
    ];

    const initialValues = {
        companyId: jobSingleData?.companyId,
        jobCategoryId: jobSingleData?.jobCategoryId,
        jobTitle: jobSingleData?.jobTitle,
        jobLocationId: jobSingleData?.jobLocationId,
        startTime: dayjs(jobSingleData?.startTime),
        endTime: dayjs(jobSingleData?.endTime),
        jobWorkExperienceId: jobSingleData?.jobWorkExperienceId,
        jobTypeId: jobSingleData?.jobTypeId,
        jobSkillId: jobSingleData?.jobSkills?.map((item) => item.jobSkillId),
        totalPosition: jobSingleData?.totalPosition,
        jobPayBy: jobSingleData?.jobPayBy,
        jobPaySystem: jobSingleData?.jobPaySystem,
        startingSalary: jobSingleData?.startingSalary,
        maximumSalary: jobSingleData?.maximumSalary,
        exactSalary: jobSingleData?.exactSalary,
        jobRequirement: jobSingleData?.jobRequirement,
        jobDescription: jobSingleData?.jobDescription,
    };

    return (
        <>
            <PageTitle title="back" />
            <UserPrivateComponent permission={"update-job"}>
                {jobSingleData && !jobSingleLoading && (
                    <>
                        <div
                            className="mr-top mt-5 p-5 ant-card "
                            style={{ maxWidth: "100%" }}
                        >
                            <Form
                                size="small"
                                form={form}
                                name="basic"
                                layout="vertical"
                                labelCol={{
                                    span: 7,
                                }}
                                wrapperCol={{
                                    span: 24,
                                }}
                                initialValues={{ ...initialValues }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <h2 className="text-center text-2xl mt-3 mb-3 txt-color font-bold ">
                                    Edit Job Information
                                </h2>
                                <Row
                                    gutter={{
                                        xs: 8,
                                        sm: 16,
                                        md: 24,
                                        lg: 32,
                                    }}
                                >
                                    <Col
                                        span={24}
                                        className="gutter-row form-color"
                                    >
                                        <Form.Item
                                            style={{
                                                marginBottom: "12px",
                                            }}
                                            label="Company"
                                            name="companyId"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Please input Company!",
                                                },
                                            ]}
                                        >
                                            <Select
                                                placeholder="Select Company"
                                                allowClear
                                                loading={companyLoading}
                                                mode="single"
                                                size="middle"
                                                style={{
                                                    width: "100%",
                                                }}
                                            >
                                                {companyData && (
                                                    <Option
                                                        key={companyData?.id}
                                                        value={companyData?.id}
                                                    >
                                                        {
                                                            companyData?.companyName
                                                        }
                                                    </Option>
                                                )}
                                            </Select>
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        span={24}
                                        className="gutter-row form-color"
                                    >
                                        <Form.Item
                                            style={{
                                                marginBottom: "12px",
                                            }}
                                            label="Job Title"
                                            name="jobTitle"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Please input Job Title!",
                                                },
                                            ]}
                                        >
                                            <Input
                                                className="w-"
                                                placeholder="React.js Developer"
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col span={12} className="gutter-row">
                                        <Form.Item
                                            style={{ marginBottom: "12px" }}
                                            label="Start Date"
                                            name="startTime"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Please input Start Date!",
                                                },
                                            ]}
                                        >
                                            <DatePicker className="date-picker hr-staffs-date-picker" />
                                        </Form.Item>

                                        <Form.Item
                                            style={{ marginBottom: "12px" }}
                                            label="End Date"
                                            name="endTime"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Please input End Date!",
                                                },
                                            ]}
                                        >
                                            <DatePicker className="date-picker hr-staffs-date-picker" />
                                        </Form.Item>

                                        <Form.Item
                                            style={{ marginBottom: "12px" }}
                                            label="Job Location"
                                            name="jobLocationId"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Please input Job Location!",
                                                },
                                            ]}
                                        >
                                            <Select
                                                placeholder="Dhaka"
                                                allowClear
                                                loading={jobLocationLoading}
                                                mode="single"
                                                size="middle"
                                                style={{
                                                    width: "100%",
                                                }}
                                            >
                                                {jobLocationData &&
                                                    jobLocationData.map(
                                                        (location) => (
                                                            <Option
                                                                key={
                                                                    location.id
                                                                }
                                                                value={
                                                                    location.id
                                                                }
                                                            >
                                                                {
                                                                    location.jobLocation
                                                                }
                                                                ,{" "}
                                                                {
                                                                    location.countryName
                                                                }
                                                            </Option>
                                                        )
                                                    )}
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            style={{ marginBottom: "12px" }}
                                            label="Experience"
                                            name="jobWorkExperienceId"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Please input Job Work Experience!",
                                                },
                                            ]}
                                        >
                                            <Select
                                                placeholder="1-2 years"
                                                allowClear
                                                loading={
                                                    jobWorkExperienceLoading
                                                }
                                                mode="single"
                                                size="middle"
                                                style={{
                                                    width: "100%",
                                                }}
                                            >
                                                {jobWorkExperienceData &&
                                                    jobWorkExperienceData.map(
                                                        (item) => (
                                                            <Option
                                                                key={item.id}
                                                                value={item.id}
                                                            >
                                                                {
                                                                    item.workExperience
                                                                }
                                                            </Option>
                                                        )
                                                    )}
                                            </Select>
                                        </Form.Item>
                                    </Col>

                                    <Col span={12} className="gutter-row">
                                        <Form.Item
                                            style={{ marginBottom: "12px" }}
                                            label="Job Type"
                                            name="jobTypeId"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Please input Job Type!",
                                                },
                                            ]}
                                        >
                                            <Select
                                                placeholder="Full Time"
                                                allowClear
                                                loading={jobTypeLoading}
                                                mode="single"
                                                size="middle"
                                                style={{
                                                    width: "100%",
                                                }}
                                            >
                                                {jobTypeData &&
                                                    jobTypeData.map((item) => (
                                                        <Option
                                                            key={item.id}
                                                            value={item.id}
                                                        >
                                                            {item.jobTypeName}
                                                        </Option>
                                                    ))}
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            style={{ marginBottom: "12px" }}
                                            label="Job Category"
                                            name="jobCategoryId"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Please input Job Category!",
                                                },
                                            ]}
                                        >
                                            <Select
                                                placeholder="Engineering"
                                                allowClear
                                                onChange={jobCategoryHandler}
                                                loading={jobCategoryLoading}
                                                mode="single"
                                                size="middle"
                                                style={{
                                                    width: "100%",
                                                }}
                                            >
                                                {jobCategoryData &&
                                                    jobCategoryData.map(
                                                        (item) => (
                                                            <Option
                                                                key={item.id}
                                                                value={item.id}
                                                            >
                                                                {
                                                                    item.jobCategoryName
                                                                }
                                                            </Option>
                                                        )
                                                    )}
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            style={{ marginBottom: "12px" }}
                                            label="Job Skill"
                                            name="jobSkillId"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Please input Job Skill!",
                                                },
                                            ]}
                                        >
                                            <Select
                                                mode="multiple"
                                                loading={jobSkillsLoading}
                                                style={{
                                                    width: "100%",
                                                }}
                                                placeholder="select Skills"
                                                optionLabelProp="children"
                                            >
                                                {jobSkillsData &&
                                                    jobSkillsData.map(
                                                        (item) => (
                                                            <Option
                                                                key={item.id}
                                                                value={item.id}
                                                            >
                                                                {
                                                                    item.jobSkillName
                                                                }
                                                            </Option>
                                                        )
                                                    )}
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            style={{ marginBottom: "12px" }}
                                            label="Total Position"
                                            name="totalPosition"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Please input Total Position!",
                                                },
                                            ]}
                                        >
                                            <Input placeholder="please input total position" />
                                        </Form.Item>

                                        <Form.Item
                                            style={{ marginBottom: "12px" }}
                                            label="Pay By"
                                            name="jobPayBy"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Please input Pay By!",
                                                },
                                            ]}
                                        >
                                            <Select
                                                placeholder="Monthly"
                                                allowClear
                                                mode="single"
                                                size="middle"
                                                style={{
                                                    width: "100%",
                                                }}
                                            >
                                                {payBy.map((item) => (
                                                    <Option
                                                        key={item}
                                                        value={item}
                                                    >
                                                        {item}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        span={24}
                                        className="gutter-row form-color"
                                    >
                                        <Radio.Group
                                            onChange={onChange}
                                            value={rangeValue}
                                        >
                                            <Radio value={"exactSalary"}>
                                                Exact Salary
                                            </Radio>
                                            <Radio value={"rangeSalary"}>
                                                Range Salary
                                            </Radio>
                                        </Radio.Group>
                                    </Col>
                                </Row>
                                {rangeValue === "exactSalary" ? (
                                    <>
                                        <Row
                                            gutter={{
                                                xs: 8,
                                                sm: 16,
                                                md: 24,
                                                lg: 32,
                                            }}
                                        >
                                            <Col
                                                span={12}
                                                className="gutter-row mt-6"
                                            >
                                                <Form.Item
                                                    style={{
                                                        marginBottom: "12px",
                                                    }}
                                                    label="Salary"
                                                    name="exactSalary"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                "Please input Exact Salary!",
                                                        },
                                                    ]}
                                                >
                                                    <InputNumber placeholder="00" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </>
                                ) : (
                                    <>
                                        <Row
                                            gutter={{
                                                xs: 8,
                                                sm: 16,
                                                md: 24,
                                                lg: 32,
                                            }}
                                        >
                                            <Col
                                                span={12}
                                                className="gutter-row mt-6"
                                            >
                                                <Form.Item
                                                    style={{
                                                        marginBottom: "12px",
                                                    }}
                                                    label="Minimum"
                                                    name="startingSalary"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                "Please input Minimum Salary!",
                                                        },
                                                    ]}
                                                >
                                                    <InputNumber placeholder="00" />
                                                </Form.Item>
                                            </Col>
                                            <Col
                                                span={12}
                                                className="gutter-row mt-6"
                                            >
                                                <Form.Item
                                                    style={{
                                                        marginBottom: "12px",
                                                    }}
                                                    label="Maximum"
                                                    name="maximumSalary"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                "Please input Maximum Salary!",
                                                        },
                                                    ]}
                                                >
                                                    <InputNumber placeholder="00" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </>
                                )}

                                <Col
                                    span={24}
                                    className="gutter-row form-color"
                                >
                                    <Form.Item
                                        style={{
                                            marginBottom: "25px",
                                        }}
                                        label="Job Requirement"
                                        name="jobRequirement"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input Job Requirement!",
                                            },
                                        ]}
                                    >
                                        <ReactQuill
                                            theme="snow"
                                            modules={textEditorModule}
                                            formats={textEditorFormats}
                                        />
                                    </Form.Item>
                                </Col>

                                <Col
                                    span={24}
                                    className="gutter-row form-color"
                                >
                                    <Form.Item
                                        style={{
                                            marginBottom: "25px",
                                        }}
                                        label="Job Description"
                                        name="jobDescription"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input Job Description!",
                                            },
                                        ]}
                                    >
                                        <ReactQuill
                                            theme="snow"
                                            modules={textEditorModule}
                                            formats={textEditorFormats}
                                        />
                                    </Form.Item>
                                </Col>
                                <Form.Item
                                    style={{
                                        marginBottom: "12px",
                                        marginTop: "12px",
                                    }}
                                    wrapperCol={{
                                        offset: 4,
                                        span: 16,
                                    }}
                                >
                                    <Button
                                        className="mt-5"
                                        size="large"
                                        block
                                        type="primary"
                                        htmlType="submit"
                                        shape="round"
                                        loading={false}
                                    >
                                        Update
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </>
                )}
            </UserPrivateComponent>
        </>
    );
};

export default JobEditPopup;
