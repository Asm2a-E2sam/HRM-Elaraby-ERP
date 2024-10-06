import { PlusSquareFilled } from "@ant-design/icons";
import { Modal, Tooltip } from "antd";
import { useState } from "react";
import AddJobApplicationStatus from "../recruitment/jobApplicationStatus/AddJobApplicationStatus";
import { useTranslation } from "react-i18next"; 

const AddStatusColumn = () => {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div className="new-card mr-10">
            <Tooltip title={t("add_column")}>
                <button
                    className="flex items-center justify-center w-6 h-6 ml-auto text-violet-500 rounded hover:bg-violet-500 hover:text-indigo-100"
                    type="primary"
                    onClick={showModal}
                >
                    <PlusSquareFilled style={{ fontSize: "35px" }} />
                </button>
            </Tooltip>
            <Modal
                title={t("add_column")}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <AddJobApplicationStatus />
            </Modal>
        </div>
    );
};

export default AddStatusColumn;
