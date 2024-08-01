import PageTitle from "../page-header/PageHeader";
import GetAllAnnouncement from "./GetAllAnnouncement";
import { useTranslation } from "react-i18next"; 

const Announcement = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageTitle title={t("announcement.back")} />
      <GetAllAnnouncement />
    </>
  );
};

export default Announcement;
