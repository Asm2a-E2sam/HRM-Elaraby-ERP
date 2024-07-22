import dayjs from "dayjs";
import React from "react";
import { useParams } from "react-router-dom";
import {
    jobApplicationApi,
    useGetJobApplicationQuery,
} from "../../../redux/rtk/features/recruitment/jobApplication/jobApplicationApi";
import CommonDelete from "../../CommonUi/CommonDelete";
import CreateDrawer from "../../CommonUi/CreateDrawer";
import JobApplicationEditPopup from "../../UI/PopUp/JobApplicationEditPopup";
import PageTitle from "../../page-header/PageHeader";
import ReviewJobApplication from "./ReviewJobApplication";
import ShowJobApplicationCV from "./ShowJobApplicationCV";

const DetailsJobApplication = () => {
    const { id } = useParams();
    const { data: jobApplicationData, isLoading } =
        useGetJobApplicationQuery(id);

    let statusClass = "";
    let applicationStatus =
        jobApplicationData?.jobApplicationStatus.applicationStatus;

    if (applicationStatus === "APPLIED") {
        statusClass = "text-gray-700 bg-gray-100";
    } else if (applicationStatus === "REVIEWING") {
        statusClass = "text-yellow-600 bg-yellow-100";
    } else if (applicationStatus === "SELECTED FOR INTERVIEW") {
        statusClass = "text-green-600 bg-green-100";
    } else if (applicationStatus === "INTERVIEWING") {
        statusClass = "text-yellow-600 bg-yellow-100";
    } else if (applicationStatus === "INTERVIEWED") {
        statusClass = "text-orange-700 bg-orange-100";
    } else if (applicationStatus === "HIRED") {
        statusClass = "text-green-700 bg-green-100";
    } else {
        statusClass = "text-red-600 bg-red-100";
    }

    return (
        <>
            <PageTitle title="back" />

            {jobApplicationData && !isLoading && (
                <section>
                    <div className=" ant-card rounded h-auto p-4 my-2 ">
                        <div className="border-zinc-200 border-2 w-1/2 mx-auto my-4 p-4 rounded-sm">
                            <div className="flex justify-between text-start txt-color-2 text-xl mt-5 font-bold">
                                <div>
                                    Job Application - {jobApplicationData.id}
                                </div>
                                <div className="flex gap-2">
                                    <JobApplicationEditPopup
                                        data={jobApplicationData}
                                    />
                                    <CommonDelete
                                        permission={"delete-jobApplication"}
                                        deleteThunk={
                                            jobApplicationApi.endpoints
                                                .deleteJobApplication.initiate
                                        }
                                        id={id}
                                        navigatePath={-1}
                                    />
                                </div>
                            </div>
                            <hr className="mt-3 mb-3 new-hr" />
                            <div className="space-y-1">
                                <div className="bg-zinc-100/75 p-2 rounded-sm">
                                    <p className="text-gray-900 font-semibold">
                                        Candidate Name:{" "}
                                    </p>
                                    <p className="text-gray-600 font-medium bg-zinc-50">
                                        {jobApplicationData.name}
                                    </p>
                                </div>
                                <div className="bg-zinc-100/75 p-2 rounded-sm">
                                    <p className="text-gray-900 font-semibold">
                                        Applied For:{" "}
                                    </p>
                                    <p className="text-gray-600 font-medium bg-zinc-50">
                                        {jobApplicationData.job.jobTitle}
                                    </p>
                                </div>
                                <div className="bg-zinc-100/75 p-2 rounded-sm">
                                    <p className="text-gray-900 font-semibold">
                                        Applied Date:{" "}
                                    </p>
                                    <p className="text-gray-600 font-medium bg-zinc-50">
                                        {dayjs(
                                            jobApplicationData.createdAt
                                        ).format("DD/MM/YYYY")}
                                    </p>
                                </div>
                                <div className="bg-zinc-100/75 p-2 rounded-sm">
                                    <p className="text-gray-900 font-semibold">
                                        Email:{" "}
                                    </p>
                                    <p className="text-gray-600 font-medium bg-zinc-50">
                                        {jobApplicationData.email}
                                    </p>
                                </div>
                                <div className="bg-zinc-100/75 p-2 rounded-sm">
                                    <p className="text-gray-900 font-semibold">
                                        Phone:{" "}
                                    </p>
                                    <p className="text-gray-600 font-medium bg-zinc-50">
                                        {jobApplicationData.phone}
                                    </p>
                                </div>
                                <div className="bg-zinc-100/50 p-2 rounded-sm">
                                    <p className="text-gray-900 font-semibold">
                                        Cover Letter:{" "}
                                    </p>
                                    <p className="text-gray-600 font-medium bg-zinc-50">
                                        {jobApplicationData.coverLater}
                                    </p>
                                </div>
                                <div className="bg-zinc-100/50 p-2 rounded-sm">
                                    <p className="text-gray-900 font-semibold">
                                        Application Status:{" "}
                                    </p>
                                    <p className="text-gray-600 font-medium bg-zinc-50">
                                        <span
                                            className={` ${statusClass} font-bold`}
                                        >
                                            {applicationStatus}
                                        </span>
                                    </p>
                                </div>
                                <div className="p-2 rounded-sm py-8 flex gap-1">
                                    <CreateDrawer
                                        permission={"readSingle-jobApplication"}
                                        title={"Review Application"}
                                        width={40}
                                        update={true}
                                        color="bg-green-800 text-white"
                                    >
                                        <ReviewJobApplication
                                            data={jobApplicationData}
                                        />
                                    </CreateDrawer>
                                    <CreateDrawer
                                        permission={"readSingle-jobApplication"}
                                        title={"Applicant CV or Resume"}
                                        width={82}
                                        show={true}
                                    >
                                        <ShowJobApplicationCV
                                            cvUrl={jobApplicationData.cvUrl}
                                        />
                                    </CreateDrawer>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default DetailsJobApplication;
