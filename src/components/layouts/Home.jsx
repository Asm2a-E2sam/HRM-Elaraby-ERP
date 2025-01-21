import Main from "./Main";
import { useTranslation } from "react-i18next"; 

function Home() {
  const { t } = useTranslation();

  return (
    <Main>
      <h2 className='dashboard'>{t("chart.dashboard")}</h2>
    </Main>
  );
}

export default Home;
