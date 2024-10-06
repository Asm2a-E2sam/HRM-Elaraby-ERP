/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { MinusOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import ReactApexChart from "react-apexcharts";
import lineChart from "./configs/lineChart";
import { useTranslation } from "react-i18next"; 

function LineChart() {
  const { Title, Paragraph } = Typography;
  const { t } = useTranslation();

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>{t("chart.active_users")}</Title>
          <Paragraph className="lastweek">
          {t("chart.than_last_week")} <span className="bnb2">+30%</span>
          </Paragraph>
        </div>
        <div className="sales">
          <ul>
            <li>{<MinusOutlined />} {t("chart.traffic")}</li>
            <li>{<MinusOutlined />} {t("chart.sales")}</li>
          </ul>
        </div>
      </div>

      <ReactApexChart
        className="full-width"
        options={lineChart.options}
        series={lineChart.series}
        type="area"
        height={350}
        width={"100%"}
      />
    </>
  );
}

export default LineChart;
