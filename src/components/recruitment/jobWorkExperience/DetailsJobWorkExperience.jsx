import { Card } from "antd";
import dayjs from "dayjs";
import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import {
    jobWorkExperienceApi,
    useGetJobWorkExperienceQuery,
} from "../../../redux/rtk/features/recruitment/jobWorkExperience/jobWorkExperienceApi";
import CommonDelete from "../../CommonUi/CommonDelete";
import UserPrivateComponent from "../../PrivateRoutes/UserPrivateComponent";
import JobWorkExperienceEditPopup from "../../UI/PopUp/JobWorkExperienceEditPopup";
import BtnLoader from "../../loader/BtnLoader";
import Loader from "../../loader/loader";
import PageTitle from "../../page-header/PageHeader";

const DetailsJobWorkExperience = () => {
    const { id } = useParams();
    const { data: jobWorkExperience, isLoading } =
        useGetJobWorkExperienceQuery(id);
    return (
        <div>
            <PageTitle title="back" />
            <UserPrivateComponent permission={"readSingle-jobWorkExperience"}>
                <Card className="mr-top mt-5">
                    {jobWorkExperience ? (
                        <Fragment key={jobWorkExperience.id}>
                            <div>
                                <div className="flex justify-between ">
                                    <h3 className={"text-xl"}>
                                        ID : {jobWorkExperience?.id} |{" "}
                                        {jobWorkExperience?.workExperience}
                                    </h3>
                                </div>
                                <div className="flex justify-center mt-5 mb-4 ">
                                    <Card
                                        style={{ width: 500 }}
                                        title="Details of Job Work Experience"
                                        extra={
                                            <div className="flex justify-end items-center">
                                                <JobWorkExperienceEditPopup
                                                    data={jobWorkExperience}
                                                />
                                                {!isLoading ? (
                                                    <CommonDelete
                                                        permission={
                                                            "delete-jobWorkExperience"
                                                        }
                                                        deleteThunk={
                                                            jobWorkExperienceApi
                                                                .endpoints
                                                                .deleteJobWorkExperience
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
                                                    Work Experience :{" "}
                                                    <p className="ml-2 text-sm text-gray-900">
                                                        {jobWorkExperience?.workExperience.toUpperCase()}{" "}
                                                    </p>
                                                </li>

                                                <li className="text-sm text-gray-600 font-semibold py-2 px-4 bg-gray-100 mb-1.5 rounded w-96 flex justify-start">
                                                    Created At :{" "}
                                                    <p className="ml-2 text-sm text-gray-900">
                                                        {dayjs(
                                                            jobWorkExperience?.createdAt
                                                        ).format("DD/MM/YYYY")}
                                                    </p>
                                                </li>

                                                <li className="text-sm text-gray-600 font-semibold py-2 px-4 bg-gray-100 mb-1.5 rounded w-96 flex justify-start">
                                                    Updated At :{" "}
                                                    <p className="ml-2 text-sm text-gray-900">
                                                        {dayjs(
                                                            jobWorkExperience?.updatedAt
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

export default DetailsJobWorkExperience;
