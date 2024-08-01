
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import ViewBtn from "../Buttons/ViewBtn";
import CardCustom from "../CommonUi/CardCustom";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TablePagination from "../CommonUi/TablePagination";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import { useGetConfigEmailQuery } from "../../redux/rtk/features/emailConfig/emailConfigApi";
import dayjs from "dayjs";
import UpdateEmailConfig from "./UpdateEmailConfig";
import { useTranslation } from "react-i18next"; 

const GetAllEmailConfig = () => {
  const { t } = useTranslation();
  const [pageConfig, setPageConfig] = useState({status: 'true', page:1, count: 10})
  const { data, isLoading: loading } = useGetConfigEmailQuery();
  const columns = [
    {
      id: 1,
      title: t("mail_config.name"),
      dataIndex: "emailConfigName",
      key: "emailConfigName",
    },
    {
      id: 2,
      title: t("mail_config.host"),
      dataIndex: "emailHost",
      key: "emailHost",
    },
    {
      id: 3,
      title: t("mail_config.port"),
      dataIndex: "emailPort",
      key: "emailPort",
    },
    {
      id: 4,
      title: t("mail_config.email_user"),
      dataIndex: "emailUser",
      key: "emailUser",
    },
    {
      id: 5,
      title: t("mail_config.create_date"),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => dayjs(createdAt).format("YYYY-MM-DD"),
    },

  ];
  return (
    <CardCustom
      title={t("mail_config.email_Config_List")}
      extra={
        <>
          <CreateDrawer
            permission={"update-emailConfig"}
            title={t("mail_config.update_email_Config")}
            width={30}
          >
            <UpdateEmailConfig data={data} />
          </CreateDrawer>
        </>
      }
    >
      <TablePagination
        columns={columns}
        list={data}
        total={null}
        setPageConfig={setPageConfig}
        loading={loading}
        csvFileName={"Email Config List"}
        permission={"readAll-emailConfig"}
      />
    </CardCustom>
  );
};

export default GetAllEmailConfig;
