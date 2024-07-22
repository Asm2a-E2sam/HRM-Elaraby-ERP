import { Select } from "antd";
import { useState } from "react";
import { useGetJobApplicationStatusesQuery } from "../../redux/rtk/features/recruitment/jobApplicationStatus/jobApplicationStatusApi";

export default function ApplicationStatusSelection({ setPageConfig }) {
    const [applicationStatusId, setApplicationStatusId] = useState(null);
    const onChange = (value) => {
        setApplicationStatusId(value);

        setPageConfig((prev) => {
            const prevData = { ...prev };
            if (prevData.query === "search") {
                delete prevData.query;
                delete prevData.key;
            }

            return { ...prevData, applicationStatusId: value };
        });
    };

    const {
        data: jobApplicationStatusData,
        isLoading: jobApplicationStatusLoading,
    } = useGetJobApplicationStatusesQuery({ query: "all" });

    console.log(jobApplicationStatusData);

    return (
        <Select
            defaultValue={applicationStatusId}
            style={{
                width: 120,
            }}
            onChange={onChange}
            placeholder="All Application"
            options={
                jobApplicationStatusData &&
                !jobApplicationStatusLoading &&
                jobApplicationStatusData.map((item) => {
                    return {
                        label: (
                            <span className="text-gray-900 font-semibold">
                                {item.applicationStatus}
                            </span>
                        ),
                        value: item.id,
                    };
                })
            }
        />
    );
}
