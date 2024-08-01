import PageTitle from "../page-header/PageHeader";

import GetAllAccount from "./getAllAccount";
import { useTranslation } from "react-i18next"; 

const Account = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageTitle title={t("account.back")} />
      <GetAllAccount />
    </>
  );
};

export default Account;
