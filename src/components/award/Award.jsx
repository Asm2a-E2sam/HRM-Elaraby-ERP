import PageTitle from "../page-header/PageHeader";
import { useTranslation } from "react-i18next"; 

import AddAward from "./AddAward";

const Award = () => {
  const { t } = useTranslation();

  return (
    <div>
      <PageTitle title={t("back")} />
      <AddAward />
    </div>
  );
};

export default Award;
