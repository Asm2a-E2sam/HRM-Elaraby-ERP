import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetJobsQuery } from "../../../redux/rtk/features/recruitment/job/jobApi";
import JobTitle from "../recruitmentLayout/JobTitle";
import RecruitmentHomeBanner from "../recruitmentLayout/RecruitmentHomeBanner";
import JobCard from "./JobCard";

const RecruitmentHome = () => {
  const [pagConfig, setPageConfig] = useState({
    query: "all",
  });
  const { data, isLoading } = useGetJobsQuery(pagConfig);
  return (
    <>
      <RecruitmentHomeBanner />

      {/* all the job here */}
      <div className='my-12 mx-12'>
        <JobTitle title={"Opening Jobs"} />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {data &&
            !isLoading &&
            data.map((item) => (
              <Link key={item.id} to={`/recruitment/jobDetails/${item?.id}`}>
                <JobCard data={item} />
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};

export default RecruitmentHome;
