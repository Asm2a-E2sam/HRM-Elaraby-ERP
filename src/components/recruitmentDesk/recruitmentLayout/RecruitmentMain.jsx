import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../layouts/Footer";

const RecruitmentMain = () => {
    return (
        <div className="max-w-[1200px] mx-auto bg-zinc-50">
            <div className=" h-screen flex flex-col justify-between">
                <div className="bg-zinc-50">
                    <Outlet />
                </div>

                <div className="bg-zinc-200">
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default RecruitmentMain;
