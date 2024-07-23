import { SolutionOutlined, UserDeleteOutlined } from "@ant-design/icons";
import { Segmented } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next"; 

export default function StatusSelection({ setPageConfig }) {
    const [status, setStatus] = useState("true");
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
    const { t } = useTranslation();

    return (
        <Segmented
            className="text-center rounded text-red-500 "
            size="middle"
            options={[
                {
                    label: (
                        <span>
                            <SolutionOutlined />{t("user_list.active")}
                        </span>
                    ),
                    value: "true",
                },
                {
                    label: (
                        <span>
                            <UserDeleteOutlined /> {t("user_list.inactive")}
                        </span>
                    ),
                    value: "false",
                },
            ]}
            value={status}
            onChange={onChange}
        />
    );
}
