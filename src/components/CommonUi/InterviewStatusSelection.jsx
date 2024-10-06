import { Select } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next"; 

export default function InterviewStatusSelection({ setPageConfig }) {
    const [interviewStatus, setInterviewStatus] = useState(null);
    const { t } = useTranslation();

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
                                {t("pending")}
                            </span>
                        ),
                        value: "PENDING",
                    },
                    {
                        label: (
                            <span className="text-green-700 font-semibold">
                                {t("interviewed")}
                            </span>
                        ),
                        value: "INTERVIEWED",
                    },
                ]}
            />
        </div>
    );
}
