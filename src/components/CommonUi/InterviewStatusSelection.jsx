import { Select } from "antd";
import { useState } from "react";

export default function InterviewStatusSelection({ setPageConfig }) {
    const [interviewStatus, setInterviewStatus] = useState(null);
    const onChange = (value) => {
        setInterviewStatus(value);
        setPageConfig((prev) => {
            const prevData = { ...prev };
            if (prevData.query === "search") {
                delete prevData.query;
                delete prevData.key;
            }
            return { ...prevData, interviewStatus: value };
        });
    };
    return (
        <div>
            <Select
                defaultValue={interviewStatus}
                style={{
                    width: 120,
                }}
                onChange={onChange}
                placeholder="All Interviews"
                options={[
                    {
                        label: (
                            <span className="text-yellow-600 font-semibold">
                                PENDING
                            </span>
                        ),
                        value: "PENDING",
                    },
                    {
                        label: (
                            <span className="text-green-700 font-semibold">
                                INTERVIEWED
                            </span>
                        ),
                        value: "INTERVIEWED",
                    },
                ]}
            />
        </div>
    );
}
