import { Select } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next"; 

export default function StatusSelectionDropdown({ setPageConfig }) {
    const [status, setStatus] = useState("true");
    const { t } = useTranslation();

    const onChange = (value) => {
        setStatus(value);

        setPageConfig((prev) => {
            const prevData = { ...prev };
            if (prevData.query === "search") {
                delete prevData.query;
                delete prevData.key;
            }

            return { ...prevData, status: value };
        });
    };
    return (
        <div>
            <Select
                defaultValue={status}
                style={{
                    width: 120,
                }}
                onChange={onChange}
                options={[
                    {
                        label: (
                            <span className="text-green-900 font-semibold">
                                {t("active")}
                            </span>
                        ),
                        value: "true",
                    },
                    {
                        label: (
                            <span className="text-red-600 font-semibold">
                                {t("inactive")}
                            </span>
                        ),
                        value: "false",
                    },
                ]}
            />
        </div>
    );
}
