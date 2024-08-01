import PageTitle from "../page-header/PageHeader";

import GetAllTransaction from "./getAllTransaction";
import { useTranslation } from "react-i18next"; 

const Transaction = () => {
  const { t } = useTranslation();
  return (
    <div>
      <PageTitle title={t("transaction.back")} />
      <GetAllTransaction />
    </div>
  );
};

export default Transaction;
