import React from "react";
import "./styles.css";

const Application = ({ application: application, btnLoading, btnId }) => {
    return (
        <div className="task new-column-card" draggable="true">
            <div className="task__tags ">
                <span className="task__tag task__tag--illustration">
                    {application.job.jobTitle}
                </span>
            </div>
            <p className="mt-2 txt-color font-medium">
                {" "}
                Application No: {application.id}
            </p>
            <p className="mt-2 txt-color font-medium">
                {" "}
                Name: {application.name}
            </p>
            <p className="mt-2 txt-color font-medium">
                {" "}
                Email: {application.email}
            </p>
        </div>
    );
};

export default Application;
