import { Button } from "antd";
import React from "react";

const RecruitmentHeader = () => {
    return (
        <div className="flex items-center content-center justify-between py-8 px-12">
            <div className="z-50">
                <h2 className="text-white text-center mt-2 mb-1 font-bold text-[30px] lg:text-[35px]">
                    HRM
                    <strong
                        style={{
                            color: "#6ECCAF	",
                            fontWeight: "bold",
                        }}
                    >
                        {" "}
                        Elaraby
                    </strong>
                </h2>
            </div>
            <div>
                <a href="/recruitment">
                    {" "}
                    <Button
                        type="default"
                        size={`large`}
                        className="font-semibold bg-green-700 text-white border-none hover:bg-green-600"
                    >
                        HOME
                    </Button>
                </a>
            </div>
        </div>
    );
};

export default RecruitmentHeader;
