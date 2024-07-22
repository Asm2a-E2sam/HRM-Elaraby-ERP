import { Select } from "antd";
import { useState } from "react";
import { useGetJobCategoriesQuery } from "../../redux/rtk/features/recruitment/jobCategory/jobCategoryApi";

export default function JobCategorySelection({ setPageConfig }) {
    const [jobCategoryId, setJobCategoryId] = useState(null);

    const { data: jobCategoryData, isLoading: jobCategoryLoading } =
        useGetJobCategoriesQuery({
            query: "all",
        });

    const onChange = (value) => {
        setJobCategoryId(value);
        setPageConfig((prev) => {
            const prevData = { ...prev };
            if (prevData.query === "search") {
                delete prevData.query;
                delete prevData.key;
            }
            return { ...prevData, jobCategoryId: value };
        });
    };

    return (
        <div>
            <Select
                defaultValue={jobCategoryId}
                style={{
                    width: 120,
                }}
                onChange={onChange}
                placeholder="All Category"
                options={
                    jobCategoryData &&
                    !jobCategoryLoading &&
                    jobCategoryData.map((item) => {
                        return {
                            label: (
                                <span className="text-green-900 font-semibold">
                                    {item.jobCategoryName}
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
