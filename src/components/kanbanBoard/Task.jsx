import { DeleteFilled } from "@ant-design/icons";
import { Tooltip } from "antd";
import dayjs from "dayjs";
import React from "react";
import "./styles.css";
import { useTranslation } from "react-i18next"; 

const Task = ({ taskS: task, btnLoading, btnId, handleDeleteTask }) => {
  const { t } = useTranslation();

  return (
    <div className="task new-column-card" draggable="true">
      <div className="task__tags ">
        <span className="task__tag task__tag--illustration">
          {task.priority.name}
        </span>
        <button className="task__options">
          <Tooltip title={t("delete_task")}>
            <button
              className="text-sm text-red-500 ml-2 float-right"
              onClick={() => handleDeleteTask(task.id)}
            >
              <DeleteFilled
                className={`mr-3 ml-2 ${
                  btnId === task.id ? (btnLoading ? "animate-spin" : "") : ""
                }`}
              />
            </button>
          </Tooltip>
        </button>
      </div>
      <p className="mt-2 txt-color font-semibold">{task.name}</p>
      <div className="m-2 txt-color " style={{ fontSize: "13px" }}>
        {task.description}
      </div>
      <div className="task__stats">
        <span>
          <time>
            <i className="fas fa-flag"></i>
            {dayjs(task.startDate).format("DD/MM/YYYY")} -{" "}
            {dayjs(task.endDate).format("DD/MM/YYYY")}
          </time>
        </span>
        <span>{/* 		<i className='fas fa-comment'></i>4 */}</span>
        <span>{/* <i className='fas fa-paperclip'></i>8 */}</span>
        {/* <span className='task__owner'></span> */}
        <span> {t("time")} : {task.completionTime}{t("hours")}</span>
      </div>
    </div>
  );
};

export default Task;
