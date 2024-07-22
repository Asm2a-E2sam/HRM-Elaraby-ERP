import { Card } from "antd";
import dayjs from "dayjs";
import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import {
    jobSkillsApi,
    useGetJobSkillQuery,
} from "../../../redux/rtk/features/recruitment/jobSkills/jobSkillsApi";
import CommonDelete from "../../CommonUi/CommonDelete";
import UserPrivateComponent from "../../PrivateRoutes/UserPrivateComponent";
import JobSkillsEditPopup from "../../UI/PopUp/JobSkillsEditPopup";
import BtnLoader from "../../loader/BtnLoader";
import Loader from "../../loader/loader";
import PageTitle from "../../page-header/PageHeader";

const DetailsJobSkills = () => {
    const { id } = useParams();
    const { data: jobSkill, isLoading } = useGetJobSkillQuery(id);
    return (
        <div>
            <PageTitle title="back" />
            <UserPrivateComponent permission={"readSingle-jobSkills"}>
                <Card className="mr-top mt-5">
                    {jobSkill ? (
                        <Fragment key={jobSkill.id}>
                            <div>
                                <div className="flex justify-between ">
                                    <h3 className={"text-xl"}>
                                        ID : {jobSkill?.id} |{" "}
                                        {jobSkill?.jobSkillName}
                                    </h3>
                                </div>
                                <div className="flex justify-center mt-5 mb-4 ">
                                    <Card
                                        style={{ width: 500 }}
                                        title="Details of Job Skill"
                                        extra={
                                            <div className="flex justify-end items-center">
                                                <JobSkillsEditPopup
                                                    data={jobSkill}
                                                />
                                                {!isLoading ? (
                                                    <CommonDelete
                                                        permission={
                                                            "delete-jobType"
                                                        }
                                                        deleteThunk={
                                                            jobSkillsApi
                                                                .endpoints
                                                                .deleteJobSkills
                                                                .initiate
                                                        }
                                                        id={id}
                                                        navigatePath={-1}
                                                    />
                                                ) : (
                                                    <BtnLoader />
                                                )}
                                            </div>
                                        }
                                    >
                                        <div className="flex justify-center">
                                            <ul className="list-inside list-none ">
                                                <li className="text-sm text-gray-600 font-semibold py-2 px-4 bg-gray-100 mb-1.5 rounded w-96 flex justify-start">
                                                    Job Category :{" "}
                                                    <p className="ml-2 text-sm text-gray-900">
                                                        {jobSkill?.jobCategory?.jobCategoryName.toUpperCase()}{" "}
                                                    </p>
                                                </li>

                                                <li className="text-sm text-gray-600 font-semibold py-2 px-4 bg-gray-100 mb-1.5 rounded w-96 flex justify-start">
                                                    Skill :{" "}
                                                    <p className="ml-2 text-sm text-gray-900">
                                                        {jobSkill?.jobSkillName.toUpperCase()}{" "}
                                                    </p>
                                                </li>

                                                <li className="text-sm text-gray-600 font-semibold py-2 px-4 bg-gray-100 mb-1.5 rounded w-96 flex justify-start">
                                                    Created At :{" "}
                                                    <p className="ml-2 text-sm text-gray-900">
                                                        {dayjs(
                                                            jobSkill?.createdAt
                                                        ).format("DD/MM/YYYY")}
                                                    </p>
                                                </li>

                                                <li className="text-sm text-gray-600 font-semibold py-2 px-4 bg-gray-100 mb-1.5 rounded w-96 flex justify-start">
                                                    Updated At :{" "}
                                                    <p className="ml-2 text-sm text-gray-900">
                                                        {dayjs(
                                                            jobSkill?.updatedAt
                                                        ).format("DD/MM/YYYY")}
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </Fragment>
                    ) : (
                        <Loader />
                    )}
                </Card>
            </UserPrivateComponent>
        </div>
    );
};

export default DetailsJobSkills;
