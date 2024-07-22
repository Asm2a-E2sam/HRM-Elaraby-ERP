import { Card, Col, Row } from "antd";
import React from "react";

import AnnouncementBar from "./AnnouncementBar";
import DemoLine from "./Demoline";
import PublicHolidayBar from "./PublicHolidayBar";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
    const { t } = useTranslation();
    return (
        <>
            <div>
                <div>
                    <div className="mb-3">
                        <Row>
                            <Col span={24}>
                                <DemoLine />
                            </Col>
                        </Row>
                    </div>
                    <div>
                        <Row gutter={[30, 30]}>
                            <Col
                                sm={24}
                                md={24}
                                lg={12}
                                span={24}
                                className="mb-auto"
                            >
                                <Card title={t("dashboard.public_holiday")} className="">
                                    <PublicHolidayBar />
                                </Card>
                            </Col>
                            <Col sm={24} md={24} lg={12} span={24}>
                                <Card title={t("dashboard.announcement")}>
                                    <AnnouncementBar />
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
