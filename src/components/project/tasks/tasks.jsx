import { Table } from "antd";
import { useEffect, useState } from "react";
import PageTitle from "../../page-header/PageHeader";
// import AddTask from "./Addtask";
import { useGetProjectTasksQuery } from "../../../redux/rtk/features/projectManagement/project/projectTask/projectTaskApi";
import UpdateBtn from "../../Buttons/UpdateBtn";
import { useTranslation } from "react-i18next"; 

const Task = () => {
    const { t } = useTranslation();

    const columns = [
        {
            id: 1,
            title: t("task_status.id"),
            dataIndex: "id",
            key: "id",
        },
        {
            id: 2,
            title: t("task_status.name"),
            key: "name",
            render: ({ name }) => name.toUpperCase(),
        },
        {
            id: 3,
            title:  t("task_status.action"),
            dataIndex: "id",
            key: "action",
            render: (id) => (
                <div className="flex justify-start">
                    <UpdateBtn path={`/admin/task/update/${id}`} />
                </div>
            ),
        },
    ];
    const { isLoading: loading, data: list } = useGetProjectTasksQuery();
    const [columnsToShow, setColumnsToShow] = useState([]);

    useEffect(() => {
        setColumnsToShow(columns);
    }, []);

    return (
        <div>
            <PageTitle title={ t("task_status.back")} />
            {/* <AddTask list={list} loading={loading} /> */}
            <Table
                scroll={{ x: true }}
                loading={loading}
                pagination={{
                    defaultPageSize: 20,
                }}
                columns={columnsToShow}
                dataSource={list}
            />
        </div>
    );
};

export default Task;
