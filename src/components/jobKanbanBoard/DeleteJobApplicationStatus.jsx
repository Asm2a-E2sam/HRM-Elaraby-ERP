import { Button, Popover } from "antd";
import { useDeleteJobApplicationStatusMutation } from "../../redux/rtk/features/recruitment/jobApplicationStatus/jobApplicationStatusApi";
import "./styles.css";
import { useTranslation } from "react-i18next"; 

const DeleteJobApplicationStatus = ({ id }) => {
    const [deleteJobApplicationStatus] =
        useDeleteJobApplicationStatusMutation();
    const { t } = useTranslation();

    const onDelete = async () => {
        await deleteJobApplicationStatus(id);
    };

    const content = (
        <div>
            <Button className="text-sm text-red-500 ml-2" onClick={onDelete}>
                {t("delete")}
            </Button>
        </div>
    );

    return (
        <Popover
            content={content}
            title="Options"
            placement="left"
            trigger={"click"}
        >
            <button
                type="primary"
                className=" px-2 mb-1 text-indigo-500 rounded hover:text-indigo-300"
            >
                <i
                    className="bi bi-three-dots-vertical"
                    style={{ fontSize: "19px" }}
                ></i>
            </button>
        </Popover>
    );
};

export default DeleteJobApplicationStatus;
