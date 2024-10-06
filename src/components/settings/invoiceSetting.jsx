import PageTitle from "../page-header/PageHeader";
import AddDetails from "./addDetails";
import { useTranslation } from "react-i18next"; 

const InvoiceSetting = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageTitle title={t("back")} />
      <AddDetails />
    </>
  );
};

export default InvoiceSetting;
