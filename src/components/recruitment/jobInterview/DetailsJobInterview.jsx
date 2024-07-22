import dayjs from "dayjs";
import React from "react";
import { useParams } from "react-router-dom";
import {
    jobInterviewApi,
    useGetJobInterviewQuery,
} from "../../../redux/rtk/features/recruitment/jobInterview/jobInterviewApi";
import CommonDelete from "../../CommonUi/CommonDelete";
import CreateDrawer from "../../CommonUi/CreateDrawer";
import JobInterviewEditPopup from "../../UI/PopUp/JobInterviewEditPopup";
import PageTitle from "../../page-header/PageHeader";
import ShowJobApplicationCV from "../jobApplication/ShowJobApplicationCV";
import ReviewJobInterview from "./ReviewJobInterview";

const DetailsJobInterview = () => {
    const { id } = useParams();
    const { data: jobInterviewData, isLoading } = useGetJobInterviewQuery(id);
    console.log(jobInterviewData);

    return (
        <>
            <PageTitle title="back" />

            {jobInterviewData && !isLoading && (
                <section>
                    <div className=" ant-card rounded h-auto p-4 my-2 ">
                        <div className="border-zinc-200 border-2 ">
                            <div className="flex justify-between text-start txt-color-2 text-xl font-bold p-4">
                                <div>
                                    Job Interview - (No: {jobInterviewData.id})
                                </div>
                                <div className="flex gap-2">
                                    <JobInterviewEditPopup
                                        data={jobInterviewData}
                                    />
                                    <CommonDelete
                                        permission={"delete-jobInterview"}
                                        deleteThunk={
                                            jobInterviewApi.endpoints
                                                .deleteJobInterview.initiate
                                        }
                                        id={id}
                                        navigatePath={-1}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 ">
                                <div className=" w-full mx-auto mb-4 p-4 rounded-sm">
                                    <hr className="mt-3 mb-3 new-hr" />
                                    <div className="space-y-1">
                                        <div className="bg-zinc-100/75 p-2 rounded-sm">
                                            <p className="text-gray-900 font-semibold">
                                                Interview Date:{" "}
                                            </p>
                                            <p className="text-gray-600 font-medium bg-zinc-50">
                                                {jobInterviewData?.scheduleDate}
                                            </p>
                                        </div>
                                        <div className="bg-zinc-100/75 p-2 rounded-sm">
                                            <p className="text-gray-900 font-semibold">
                                                Interview Time:{" "}
                                            </p>
                                            <p className="text-gray-600 font-medium bg-zinc-50">
                                                {dayjs(
                                                    `1970-01-01 ${jobInterviewData?.scheduleTime}`,
                                                    {
                                                        customParseFormat:
                                                            "HH:mm:ss",
                                                    }
                                                ).format("h:mm A")}
                                            </p>
                                        </div>
                                        <div className="bg-zinc-100/75 p-2 rounded-sm">
                                            <p className="text-gray-900 font-semibold">
                                                Applied For:{" "}
                                            </p>
                                            <p className="text-gray-600 font-medium bg-zinc-50">
                                                {
                                                    jobInterviewData
                                                        ?.jobApplication?.job
                                                        .jobTitle
                                                }
                                            </p>
                                        </div>
                                        <div className="bg-zinc-100/50 p-2 rounded-sm">
                                            <p className="text-gray-900 font-semibold">
                                                Interview Status:{" "}
                                            </p>
                                            <p className="text-gray-600 font-medium bg-zinc-50">
                                                <span
                                                    className={`${
                                                        jobInterviewData?.interviewStatus ===
                                                        "PENDING"
                                                            ? `text-yellow-700 bg-yellow-100`
                                                            : `text-green-700 bg-green-100 `
                                                    } font-bold`}
                                                >
                                                    {
                                                        jobInterviewData?.interviewStatus
                                                    }
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full mx-auto mb-4 p-4 rounded-sm">
                                    <hr className="mt-3 mb-3 new-hr" />
                                    <div className="space-y-1">
                                        <div className="bg-zinc-100/75 p-2 rounded-sm">
                                            <p className="text-gray-900 font-semibold">
                                                Candidate Name:{" "}
                                            </p>
                                            <p className="text-gray-600 font-medium bg-zinc-50">
                                                {
                                                    jobInterviewData
                                                        ?.jobApplication.name
                                                }
                                            </p>
                                        </div>
                                        <div className="bg-zinc-100/75 p-2 rounded-sm">
                                            <p className="text-gray-900 font-semibold">
                                                Applied Date:{" "}
                                            </p>
                                            <p className="text-gray-600 font-medium bg-zinc-50">
                                                {dayjs(
                                                    jobInterviewData.createdAt
                                                ).format("DD/MM/YYYY")}
                                            </p>
                                        </div>
                                        <div className="bg-zinc-100/75 p-2 rounded-sm">
                                            <p className="text-gray-900 font-semibold">
                                                Email:{" "}
                                            </p>
                                            <p className="text-gray-600 font-medium bg-zinc-50">
                                                {
                                                    jobInterviewData
                                                        ?.jobApplication.email
                                                }
                                            </p>
                                        </div>
                                        <div className="bg-zinc-100/75 p-2 rounded-sm">
                                            <p className="text-gray-900 font-semibold">
                                                Phone:{" "}
                                            </p>
                                            <p className="text-gray-600 font-medium bg-zinc-50">
                                                {
                                                    jobInterviewData
                                                        ?.jobApplication.phone
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full mx-auto mb-4 p-4 rounded-sm">
                                    <div className="flex justify-between text-start txt-color-2 text-xl font-bold">
                                        <div>
                                            Assigned Member for taking Interview
                                        </div>
                                    </div>
                                    <hr className="mt-3 mb-3 new-hr" />
                                    <div className="space-y-1">
                                        <div className="bg-zinc-100/75 p-2 rounded-sm">
                                            <p className="text-gray-900 font-semibold">
                                                Member List:{" "}
                                            </p>
                                            {jobInterviewData?.jobInterviewMember.map(
                                                (item) => {
                                                    return (
                                                        <p
                                                            key={item.id}
                                                            className="text-gray-600 font-medium bg-zinc-50"
                                                        >
                                                            <span className="bg-green-200 font-bold uppercase text-black">
                                                                {
                                                                    item.user
                                                                        .username
                                                                }
                                                            </span>
                                                            ,{" "}
                                                        </p>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-2 rounded-sm py-8 flex gap-1">
                                <CreateDrawer
                                    permission={"readSingle-jobInterview"}
                                    title={"Review Interview"}
                                    width={40}
                                    update={true}
                                    color="bg-green-800 text-white"
                                >
                                    <ReviewJobInterview
                                        data={jobInterviewData}
                                    />
                                </CreateDrawer>
                                <CreateDrawer
                                    permission={"readSingle-jobApplication"}
                                    title={"Applicant CV or Resume"}
                                    width={82}
                                    show={true}
                                >
                                    <ShowJobApplicationCV
                                        cvUrl={
                                            jobInterviewData?.jobApplication
                                                .cvUrl
                                        }
                                    />
                                </CreateDrawer>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default DetailsJobInterview;
