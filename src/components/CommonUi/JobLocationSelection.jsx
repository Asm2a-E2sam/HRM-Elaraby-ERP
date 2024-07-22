import { Select } from "antd";
import { useState } from "react";
import { useGetJobLocationsQuery } from "../../redux/rtk/features/recruitment/jobLocation/jobLocationApi";

export default function JobLocationSelection({ setPageConfig }) {
    const [jobLocationId, setJobLocationId] = useState(null);

    const { data: jobLocationData, isLoading: jobLocationLoading } =
        useGetJobLocationsQuery({
            query: "all",
        });

    const onChange = (value) => {
        setJobLocationId(value);
        setPageConfig((prev) => {
            const prevData = { ...prev };
            if (prevData.query === "search") {
                delete prevData.query;
                delete prevData.key;
            }

            return { ...prevData, jobLocationId: value };
        });
    };

    return (
        <div>
            <Select
                defaultValue={jobLocationId}
                style={{
                    width: 120,
                }}
                onChange={onChange}
                placeholder="All Location"
                options={
                    jobLocationData &&
                    !jobLocationLoading &&
                    jobLocationData.map((item) => {
                        return {
                            label: (
                                <span className="text-green-900 font-semibold">
                                    {item.jobLocation}, {item.countryName}
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
