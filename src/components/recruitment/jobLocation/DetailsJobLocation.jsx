import { Card } from "antd";
import dayjs from "dayjs";
import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import {
    jobLocationApi,
    useGetJobLocationQuery,
} from "../../../redux/rtk/features/recruitment/jobLocation/jobLocationApi";
import CommonDelete from "../../CommonUi/CommonDelete";
import UserPrivateComponent from "../../PrivateRoutes/UserPrivateComponent";
import JobLocationEditPopup from "../../UI/PopUp/JobLocationEditPopup";
import BtnLoader from "../../loader/BtnLoader";
import Loader from "../../loader/loader";
import PageTitle from "../../page-header/PageHeader";

const DetailsJobLocation = () => {
    const { id } = useParams();
    const { data: jobLocation, isLoading } = useGetJobLocationQuery(id);
    return (
        <div>
            <PageTitle title="back" />
            <UserPrivateComponent permission={"readSingle-jobLocation"}>
                <Card className="mr-top mt-5">
                    {jobLocation ? (
                        <Fragment key={jobLocation.id}>
                            <div>
                                <div className="flex justify-between ">
                                    <h3 className={"text-xl"}>
                                        ID : {jobLocation?.id} |{" "}
                                        {jobLocation?.jobLocation}
                                    </h3>
                                </div>
                                <div className="flex justify-center mt-5 mb-4 ">
                                    <Card
                                        style={{ width: 500 }}
                                        title="Details of Job Location"
                                        extra={
                                            <div className="flex justify-end items-center">
                                                <JobLocationEditPopup
                                                    data={jobLocation}
                                                />
                                                {!isLoading ? (
                                                    <CommonDelete
                                                        permission={
                                                            "delete-jobLocation"
                                                        }
                                                        deleteThunk={
                                                            jobLocationApi
                                                                .endpoints
                                                                .deleteJobLocation
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
                                                    Country :{" "}
                                                    <p className="ml-2 text-sm text-gray-900">
                                                        {jobLocation?.countryName.toUpperCase()}{" "}
                                                    </p>
                                                </li>

                                                <li className="text-sm text-gray-600 font-semibold py-2 px-4 bg-gray-100 mb-1.5 rounded w-96 flex justify-start">
                                                    Location :{" "}
                                                    <p className="ml-2 text-sm text-gray-900">
                                                        {jobLocation?.jobLocation.toUpperCase()}{" "}
                                                    </p>
                                                </li>

                                                <li className="text-sm text-gray-600 font-semibold py-2 px-4 bg-gray-100 mb-1.5 rounded w-96 flex justify-start">
                                                    Created At :{" "}
                                                    <p className="ml-2 text-sm text-gray-900">
                                                        {dayjs(
                                                            jobLocation?.createdAt
                                                        ).format("DD/MM/YYYY")}
                                                    </p>
                                                </li>

                                                <li className="text-sm text-gray-600 font-semibold py-2 px-4 bg-gray-100 mb-1.5 rounded w-96 flex justify-start">
                                                    Updated At :{" "}
                                                    <p className="ml-2 text-sm text-gray-900">
                                                        {dayjs(
                                                            jobLocation?.updatedAt
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

export default DetailsJobLocation;
