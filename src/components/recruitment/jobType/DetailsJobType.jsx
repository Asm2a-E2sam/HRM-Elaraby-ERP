import { Card } from "antd";
import dayjs from "dayjs";
import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import {
    jobTypeApi,
    useGetJobTypeQuery,
} from "../../../redux/rtk/features/recruitment/jobType/jobTypeApi";
import CommonDelete from "../../CommonUi/CommonDelete";
import UserPrivateComponent from "../../PrivateRoutes/UserPrivateComponent";
import JobTypeEditPopup from "../../UI/PopUp/JobTypeEditPopup";
import BtnLoader from "../../loader/BtnLoader";
import Loader from "../../loader/loader";
import PageTitle from "../../page-header/PageHeader";

const DetailsJobType = () => {
    const { id } = useParams();
    const { data: jobType, isLoading } = useGetJobTypeQuery(id);
    return (
        <div>
            <PageTitle title="back" />
            <UserPrivateComponent permission={"readSingle-jobType"}>
                <Card className="mr-top mt-5">
                    {jobType ? (
                        <Fragment key={jobType.id}>
                            <div>
                                <div className="flex justify-between ">
                                    <h3 className={"text-xl"}>
                                        ID : {jobType?.id} |{" "}
                                        {jobType?.jobTypeName}
                                    </h3>
                                </div>
                                <div className="flex justify-center mt-5 mb-4 ">
                                    <Card
                                        style={{ width: 500 }}
                                        title="Details of Job Type"
                                        extra={
                                            <div className="flex justify-end items-center">
                                                <JobTypeEditPopup
                                                    data={jobType}
                                                />
                                                {!isLoading ? (
                                                    <CommonDelete
                                                        permission={
                                                            "delete-jobType"
                                                        }
                                                        deleteThunk={
                                                            jobTypeApi.endpoints
                                                                .deleteJobType
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
                                                    Name :{" "}
                                                    <p className="ml-2 text-sm text-gray-900">
                                                        {jobType?.jobTypeName.toUpperCase()}{" "}
                                                    </p>
                                                </li>

                                                <li className="text-sm text-gray-600 font-semibold py-2 px-4 bg-gray-100 mb-1.5 rounded w-96 flex justify-start">
                                                    Created At :{" "}
                                                    <p className="ml-2 text-sm text-gray-900">
                                                        {dayjs(
                                                            jobType?.createdAt
                                                        ).format("DD/MM/YYYY")}
                                                    </p>
                                                </li>

                                                <li className="text-sm text-gray-600 font-semibold py-2 px-4 bg-gray-100 mb-1.5 rounded w-96 flex justify-start">
                                                    Updated At :{" "}
                                                    <p className="ml-2 text-sm text-gray-900">
                                                        {dayjs(
                                                            jobType?.updatedAt
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

export default DetailsJobType;
