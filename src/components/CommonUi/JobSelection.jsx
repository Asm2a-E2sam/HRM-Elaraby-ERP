import { Select } from "antd";
import { useState } from "react";
import { useGetJobsQuery } from "../../redux/rtk/features/recruitment/job/jobApi";

export default function JobSelection({ setPageConfig }) {
    const [jobId, setJobId] = useState(null);

    const { data: jobData, isLoading: jobLoading } = useGetJobsQuery({
        query: "all",
    });

    const onChange = (value) => {
        setJobId(value);

        setPageConfig((prev) => {
            const prevData = { ...prev };
            if (prevData.query === "search") {
                delete prevData.query;
                delete prevData.key;
            }

            return { ...prevData, jobId: value };
        });
    };

    return (
        <div>
            <Select
                defaultValue={jobId}
                style={{
                    width: 120,
                }}
                onChange={onChange}
                placeholder="All Jobs"
                options={
                    jobData &&
                    !jobLoading &&
                    jobData.map((item) => {
                        return {
                            label: (
                                <span className="text-green-900 font-semibold">
                                    {item.jobTitle}
                                </span>
                            ),
                            value: `${item?.id}`,
                        };
                    })
                }
            />
        </div>
    );
}
