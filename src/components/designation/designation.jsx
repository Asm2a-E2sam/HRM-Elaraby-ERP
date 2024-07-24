import PageTitle from "../page-header/PageHeader";
import GetAllDesignation from "./getAllDesignation";
import { useTranslation } from "react-i18next"; 

const Designation = () => {
  const { t } = useTranslation();

  return (
    <div>
      <PageTitle title={t("user_list.back")} />
      <GetAllDesignation />
    </div>
  );
};

export default Designation;
