import React from "react";
import "./styles.css";
import { useTranslation } from "react-i18next"; 

const Application = ({ application: application, btnLoading, btnId }) => {
    const { t } = useTranslation();
    return (
        <div className="task new-column-card" draggable="true">
            <div className="task__tags ">
                <span className="task__tag task__tag--illustration">
                    {application.job.jobTitle}
                </span>
            </div>
            <p className="mt-2 txt-color font-medium">
                {" "}
                {t("application.application_no")}: {application.id}
            </p>
            <p className="mt-2 txt-color font-medium">
                {" "}
                {t("application.name")}: {application.name}
            </p>
            <p className="mt-2 txt-color font-medium">
                {" "}
                {t("application.email")}: {application.email}
            </p>
        </div>
    );
};

export default Application;
