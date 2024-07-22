import { Col, Row } from "antd";
import dayjs from "dayjs";
import parse from "html-react-parser";
import React from "react";
import { useParams } from "react-router-dom";
import { useGetJobQuery } from "../../../redux/rtk/features/recruitment/job/jobApi";
import PageTitle from "../../page-header/PageHeader";

const DetailsJob = () => {
    const { id } = useParams();
    const { data: jobData, isLoading } = useGetJobQuery(id);
    return (
        <>
            <PageTitle title="back" />

            {jobData && !isLoading && (
                <>
                    <Row
                        className="w-full"
                        gutter={{
                            xs: 8,
                            sm: 16,
                            md: 24,
                            lg: 32,
                            xl: 32,
                        }}
                    >
                        <Col
                            xs={24}
                            sm={24}
                            md={24}
                            lg={24}
                            xl={24}
                            className="new-card rounded h-auto m-4"
                        >
                            <div className="text-start txt-color-2 text-xl mt-5 font-bold">
                                Job Information
                            </div>

                            <hr className="mt-3 mb-3 new-hr" />

                            <div className="m-5">
                                <table className="space-y-8">
                                    <tr>
                                        <td>
                                            <span className="txt-color-2 font-medium">
                                                Company
                                            </span>
                                        </td>
                                        <td className="px-4">:</td>
                                        <td>
                                            <p className="txt-color-secondary ml-2">
                                                {jobData.company.companyName}
                                            </p>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <span className="txt-color-2 font-medium">
                                                Job Title
                                            </span>
                                        </td>
                                        <td className="px-4">:</td>
                                        <td>
                                            <p className="txt-color-secondary ml-2">
                                                {jobData.jobTitle}
                                            </p>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <span className="txt-color-2 font-medium">
                                                Job Category
                                            </span>
                                        </td>
                                        <td className="px-4">:</td>
                                        <td>
                                            <p className="txt-color-secondary ml-2">
                                                {
                                                    jobData.jobCategory
                                                        .jobCategoryName
                                                }
                                            </p>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <span className="txt-color-2 font-medium">
                                                Job Location
                                            </span>
                                        </td>
                                        <td className="px-4">:</td>
                                        <td>
                                            <p className="txt-color-secondary ml-2">
                                                {
                                                    jobData.jobLocation
                                                        .jobLocation
                                                }
                                                ,{" "}
                                                {
                                                    jobData.jobLocation
                                                        .countryName
                                                }
                                            </p>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <span className="txt-color-2 font-medium">
                                                Job Skills
                                            </span>
                                        </td>
                                        <td className="px-4">:</td>
                                        <td>
                                            <p className="txt-color-secondary ml-2">
                                                {jobData.jobSkills.map(
                                                    (item) =>
                                                        `${item.jobSkills.jobSkillName}, `
                                                )}
                                            </p>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <span className="txt-color-2 font-medium">
                                                Total Position:
                                            </span>
                                        </td>
                                        <td className="px-4">:</td>
                                        <td>
                                            <p className="txt-color-secondary ml-2">
                                                {jobData.totalPosition}
                                            </p>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <span className="txt-color-2 font-medium">
                                                Start Time
                                            </span>
                                        </td>
                                        <td className="px-4">:</td>
                                        <td>
                                            <p className="txt-color-secondary ml-2">
                                                {dayjs(
                                                    jobData.startTime
                                                ).format("DD/MM/YYYY")}
                                            </p>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <span className="txt-color-2 font-medium">
                                                End Time
                                            </span>
                                        </td>
                                        <td className="px-4">:</td>
                                        <td>
                                            <p className="txt-color-secondary ml-2">
                                                {dayjs(jobData.endTime).format(
                                                    "DD/MM/YYYY"
                                                )}
                                            </p>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <span className="txt-color-2 font-medium">
                                                Job Type
                                            </span>
                                        </td>
                                        <td className="px-4">:</td>
                                        <td>
                                            <p className="txt-color-secondary ml-2">
                                                {jobData.jobType.jobTypeName}
                                            </p>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <span className="txt-color-2 font-medium">
                                                Experience Need
                                            </span>
                                        </td>
                                        <td className="px-4">:</td>
                                        <td>
                                            <p className="txt-color-secondary ml-2">
                                                {
                                                    jobData.jobWorkExperience
                                                        .workExperience
                                                }
                                            </p>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <span className="txt-color-2 font-medium">
                                                Salary
                                            </span>
                                        </td>
                                        <td className="px-4">:</td>
                                        <td>
                                            <p className="txt-color-secondary ml-2">
                                                {jobData.jobPaySystem ===
                                                "exactSalary" ? (
                                                    <>{jobData.exactSalary}</>
                                                ) : (
                                                    <>
                                                        {jobData.startingSalary}{" "}
                                                        -{" "}
                                                        {jobData.maximumSalary}
                                                    </>
                                                )}
                                            </p>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <span className="txt-color-2 font-medium">
                                                Pay By
                                            </span>
                                        </td>
                                        <td className="px-4">:</td>
                                        <td>
                                            <p className="txt-color-secondary ml-2">
                                                {jobData.jobPayBy}
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </Col>
                    </Row>

                    <section>
                        <div className=" ant-card rounded h-auto p-4 my-2">
                            <div className="text-start txt-color-2 text-xl mt-5 font-bold">
                                Job Requirements
                            </div>
                            <hr className="mt-3 mb-3 new-hr" />

                            <div>{parse(jobData?.jobRequirement)}</div>
                        </div>
                    </section>
                    <section>
                        <div className=" ant-card rounded h-auto p-4 my-2">
                            <div className="text-start txt-color-2 text-xl mt-5 font-bold">
                                Job Description
                            </div>
                            <hr className="mt-3 mb-3 new-hr" />
                            <div>{parse(jobData?.jobDescription)}</div>
                        </div>
                    </section>
                </>
            )}
        </>
    );
};

export default DetailsJob;
