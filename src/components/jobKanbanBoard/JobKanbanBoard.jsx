import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Loader from "../loader/loader";

import { useDeleteProjectTaskMutation } from "../../redux/rtk/features/projectManagement/project/projectTask/projectTaskApi";

import {
  useGetJobApplicationStatusesQuery,
  useUpdateJobApplicationStatusMutation,
} from "../../redux/rtk/features/recruitment/jobApplicationStatus/jobApplicationStatusApi";
import AddStatusColumn from "./AddStatusColumn";
import Application from "./Application";
import DeleteJobApplicationStatus from "./DeleteJobApplicationStatus";

function JobKanbanBoard() {
  const [data, setData] = useState([]);
  // const [newColumnTitle, setNewColumnTitle] = useState("");

  const { data: list, loading } = useGetJobApplicationStatusesQuery({
    query: "all",
  });
  const [updateJobApplicationStatus] = useUpdateJobApplicationStatusMutation();
  const [deleteProjectTasks, { isLoading }] = useDeleteProjectTaskMutation();

  const [btnId, setBtnId] = useState(null);

  useEffect(() => {
    if (list) {
      setData(list);
    }
  }, [list]);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    console.log(result);
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (type === "column") {
    } else {
      const sourceColumn = data.find(
        (column) => "column" + column.id === source.droppableId
      );
      const destinationColumn = data.find(
        (column) => "column" + column.id === destination.droppableId
      );

      if (sourceColumn === destinationColumn) {
        const newJobApplication = Array.from(sourceColumn.jobApplication);
        sourceColumn.jobApplication.map((application) => {
          if ("jobApplication" + application.id === draggableId) {
            newJobApplication.splice(source.index, 1);
            newJobApplication.splice(destination.index, 0, application);
          }
        });
        const newColumn = {
          ...sourceColumn,
          jobApplication: newJobApplication,
        };
        const newColumns = data.map((column) => {
          if (column.id === newColumn.id) {
            return newColumn;
          }
          return column;
        });
        setData(newColumns);
      } else {
        const sourceJobApplication = Array.from(sourceColumn.jobApplication);
        sourceJobApplication.splice(source.index, 1);

        const newSourceColumn = {
          ...sourceColumn,
          jobApplication: sourceJobApplication,
        };

        const destinationJobApplication = Array.from(
          destinationColumn.jobApplication
        );
        sourceColumn.jobApplication.map((application) => {
          if ("jobApplication" + application.id === draggableId) {
            destinationJobApplication.splice(destination.index, 0, application);
          }
        });

        const newDestinationColumn = {
          ...destinationColumn,
          jobApplication: destinationJobApplication,
        };

        const newColumns = data.map((column) => {
          if (column.id === newSourceColumn.id) {
            return newSourceColumn;
          } else if (column.id === newDestinationColumn.id) {
            return newDestinationColumn;
          } else {
            return column;
          }
        });

        setData(newColumns);
      }

      const jobApplicationId = draggableId.split("jobApplication")[1];
      const applicationStatusId = destination.droppableId.split("column")[1];
      // make json data
      const sendData = {
        applicationStatusId: applicationStatusId,
      };
      updateJobApplicationStatus({
        id: jobApplicationId,
        values: sendData,
      });
    }
  };

  return (
    <div style={{ height: "97%" }}>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold antialiased txt-color-2">
          JOB BOARD{" "}
        </h1>
        <AddStatusColumn />
      </div>
      {list?.length > 0 ? (
        <div className="flex overflow-x-scroll" style={{ height: "100%" }}>
          <DragDropContext onDragEnd={handleDragEnd}>
            {data.map((column, columnIndex) => (
              <div
                key={column.id}
                className="p-4 "
                style={{ minWidth: "400px", height: "40vw" }}
              >
                <div
                  className="new-card shadow-sm p-4 overflow-y-auto scrollbar-hide"
                  style={{ height: "100%" }}
                >
                  <Droppable
                    droppableId={"column" + column.id}
                    key={"column" + column.id}
                  >
                    {(provided, snapshot) => (
                      <ul
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="space-y-2 "
                        style={{ height: "100%" }}
                      >
                        <div className="flex justify-between items-center mb-4">
                          <h2 className="text-xl font-semibold txt-color-2 capitalize">
                            {column.applicationStatus}
                          </h2>
                          <div className="flex justify-end">
                            <DeleteJobApplicationStatus id={column.id} />
                          </div>
                        </div>
                        {column?.jobApplication?.map((application, index) => (
                          <Draggable
                            key={"jobApplication" + application.id}
                            draggableId={"jobApplication" + application.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="rounded-lg px-1 py-1 cursor-move flex justify-between items-center"
                              >
                                <Application
                                  application={application}
                                  btnLoading={isLoading}
                                  btnId={btnId}
                                />
                              </li>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </div>
              </div>
            ))}
          </DragDropContext>
        </div>
      ) : loading ? (
        <div className="flex justify-center items-center h-96">
          <Loader />
        </div>
      ) : (
        <div className="flex justify-center items-center h-96">
          <div>
            <h1 className="text-3xl font-semibold text-gray-600">
              No Job Application Found
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobKanbanBoard;
