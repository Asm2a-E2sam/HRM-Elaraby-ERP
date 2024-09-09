import { Affix, Drawer, Layout } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidenav from "../Sidenav/Sidenav";
import Footer from "./Footer";
import Header from "./Header";
import QuickLinks from "./QuickLinks";
import { useSelector } from "react-redux";

const { Header: AntHeader, Content, Sider } = Layout;

function Main({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const [sideNavOpenKeys, setSideNavOpenKeys] = useState("");

    const sideNavOpenKeysHandler = (val) => {
        setSideNavOpenKeys(val);
    };

    const handleCollapsed = (val) => {
        setCollapsed(val);
    };

    const [visible, setVisible] = useState(false);
    const [placement, setPlacement] = useState("right");
    const [sidenavColor, setSidenavColor] = useState("#1890ff");
    const [fixed, setFixed] = useState(false);

    const openDrawer = () => setVisible(!visible);

    const handleSidenavColor = (color) => setSidenavColor(color);
    const handleFixedNavbar = (type) => setFixed(type);

    let { pathname } = useLocation();
    pathname = pathname.replace("/", " ");

    const pathArr = pathname.split("/");
    const language = useSelector((state) => state.language.language);
  
    useEffect(() => {
        if (pathname === "rtl") {
            setPlacement("left");
        } else {
            setPlacement("right");
        }
    }, [pathname]);

    
    const isLogged = Boolean(localStorage.getItem("isLogged"));


    if (pathArr[0].trim() === "admin") {

        return (
            <Layout className="min-h-screen">
                {isLogged && (
                    <Drawer
                        title={false}
                        placement={placement === "right" ? "left" : "right"}
                        closable={false}
                        onClose={() => setVisible(false)}
                        open={visible}
                        key={placement === "right" ? "left" : "right"}
                        width={220}
                    >
                        <Layout>
                            <Sider
                                trigger={null}
                                width={220}
                                theme="light"
                                rootClassName="pt-[16px] min-h-screen"
                            >
                                <Sidenav
                                    color={sidenavColor}
                                    sideNavOpenKeys={sideNavOpenKeys}
                                />
                            </Sider>
                        </Layout>
                    </Drawer>
                )}
                {isLogged && (
                    <Sider
                        breakpoint="lg"
                        trigger={null}
                        collapsible
                        collapsed={collapsed}
                        width={220}
                        theme="light"
                        className={`hidden md:block pt-[1rem] fixed top-0 ${language == "en"? "left-0":"right-0" }  min-h-screen z-10 max-h-screen overflow-y-scroll scrollbar-hide`}
                    >
                        {collapsed ? (
                            ""
                        ) : (
                            <div className="px-5 py-4">
                                {/* <img src="/by2.png" alt="" /> */}
                                {/* <h2
                                    className="text-white text-center mt-2 mb-1 "
                                    style={{ fontSize: "25px" }}
                                >
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
                                </h2> */}
                            </div>
                        )}
                        {isLogged && (
                            <Sidenav
                                color={sidenavColor}
                                sideNavOpenKeys={sideNavOpenKeys}
                            />
                        )}
                    </Sider>
                )}
                <Layout
                    className = {
                        isLogged
                          ? language === "en"
                            ? collapsed
                              ? "ml-[15px] md:ml-[100px] mr-[15px]"
                              : "ml-[15px] md:ml-[240px] mr-[15px]"
                            : collapsed
                              ? "mr-[15px] md:mr-[100px] ml-[15px]"
                              : "mr-[15px] md:mr-[240px] ml-[15px]"
                          : "ml-0"
                      }
                >
                    {fixed ? (
                        <Affix>
                            <AntHeader>
                                <Header
                                    onPress={openDrawer}
                                    name={pathname}
                                    subName={pathname}
                                    handleSidenavColor={handleSidenavColor}
                                    handleFixedNavbar={handleFixedNavbar}
                                    collapsed={collapsed}
                                    handleCollapsed={handleCollapsed}
                                    isLogged={isLogged}
                                />
                            </AntHeader>
                        </Affix>
                    ) : (
                        <AntHeader>
                            <Header
                                onPress={openDrawer}
                                name={pathname}
                                subName={pathname}
                                handleSidenavColor={handleSidenavColor}
                                handleFixedNavbar={handleFixedNavbar}
                                collapsed={collapsed}
                                handleCollapsed={handleCollapsed}
                            />
                        </AntHeader>
                    )}
                    {isLogged &&
                        (pathname.trim() === "dashboard" ||
                            pathname.trim() === "") && (
                            <QuickLinks
                                sideNavOpenKeys={sideNavOpenKeys}
                                sideNavOpenKeysHandler={sideNavOpenKeysHandler}
                            />
                        )}

                    <Content>{children}</Content>
                    <Footer />
                </Layout>
            </Layout>
        );
    }

    return <>{children}</>;
}

export default Main;
