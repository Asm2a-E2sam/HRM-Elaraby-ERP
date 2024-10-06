import {
  AppstoreAddOutlined, BranchesOutlined,
  SaveOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
import { Link, NavLink } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
import { useTranslation } from "react-i18next"; 

function HomeLayout ({ children }) {
  const { t } = useTranslation();

  return (
  <Layout>
    <Sider
      breakpoint='lg'
      collapsedWidth='0'
      onBreakpoint={(broken) => {}}
      onCollapse={(collapsed, type) => {}}
    >
      <div className='logo '>
        <Link to='/admin'>
          <h3 className='text-white my-[2px] mx-[10px]'>{t("chart.smart_erp_v1")}</h3>
        </Link>
      </div>

      <br />
      <br />
      <Menu
        theme='dark'
        mode='inline'
        items={[
          {
            key: 1,
            label: <NavLink to={"/admin/supplier"}>{t("chart.suppliers")}</NavLink>,
            icon: <BranchesOutlined />,
          },
          {
            key: 2,
            label: <NavLink to={"/admin/product"}>{t("chart.products")}</NavLink>,
            icon: <SaveOutlined />,
          },
          {
            key: 3,
            label: <NavLink to={"/admin/purchase"}>{t("chart.purchase_new")}</NavLink>,
            icon: <AppstoreAddOutlined />,
          },
          {
            key: 4,
            label: <NavLink to={"/admin/users"}>{t("chart.user_list")}</NavLink>,
            icon: <AppstoreAddOutlined />,
          },
        ]}
      />
    </Sider>
    <Layout>
      <Header
        className='site-layout-sub-header-background'
        style={{
          padding: 0,
        }}
      />
      <Content
        style={{
          margin: "24px 16px 0",
        }}
      >
        <div
          className='site-layout-background'
          style={{
            padding: 24,
            minHeight: 360,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        {t("chart.copy_right")}
      </Footer>
    </Layout>
  </Layout>
);
}

export default HomeLayout;
