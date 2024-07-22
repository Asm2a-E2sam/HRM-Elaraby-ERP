import React from "react";
import { useParams } from "react-router-dom";
import { useGetJobQuery } from "../../../redux/rtk/features/recruitment/job/jobApi";
import JobTitle from "../recruitmentLayout/JobTitle";
import RecruitmentCommonBanner from "../recruitmentLayout/RecruitmentCommonBanner";
import LeftCard from "./LeftCard";
import RightCard from "./RightCard";

const RecruitmentJobDetails = () => {
    const { id } = useParams();
    const { data: jobData, isLoading } = useGetJobQuery(id);

    return (
        <>
            <RecruitmentCommonBanner title={"Career opportunity"} />
            <div className="my-12 mx-12">
                <JobTitle title={"Job Information"} />
                <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-8">
                    {jobData && !isLoading && (
                        <>
                            <LeftCard data={jobData} />
                            <RightCard data={jobData} />
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default RecruitmentJobDetails;
