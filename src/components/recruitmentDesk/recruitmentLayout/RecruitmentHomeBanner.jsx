import { Header } from "antd/es/layout/layout";
import React from "react";
import bannerImage from "./../../../assets/images/recruitmentBanner.jpg";
import RecruitmentHeader from "./RecruitmentHeader";

const RecruitmentHomeBanner = () => {
    return (
        <>
            <div
                className="relative overflow-hidden bg-blend-overlay h-[250px] sm:h-[400px] md:h-[520px] lg:h-[600px] bg-cover bg-center bg-no-repeat object-fill object-center"
                style={{ backgroundImage: `url(${bannerImage})` }}
            >
                <div className="absolute overflow-hidden inset-0 bg-black bg-opacity-30"></div>
                <Header>
                    <RecruitmentHeader />
                </Header>
            </div>
        </>
    );
};

export default RecruitmentHomeBanner;
