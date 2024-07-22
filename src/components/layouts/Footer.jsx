import { Col, Layout, Row } from "antd";
import { useTranslation } from "react-i18next";

function Footer() {
  const { Footer: AntFooter } = Layout;
  const year = 2024;
  const { t } = useTranslation();
  return (
    <AntFooter className='w-full max-w-[640px] mx-auto'>
      <Row className="flex flex-col items-center lg:flex lg:flex-row lg:justify-between">
        <Col xs={24} md={24} lg={24} className="flex justify-center">
          <p className="m-0">
          © {year}{" "}
            <a
              href="https://elaraby-erp.net"
              className="font-weight-bold text-blue-500 hover:text-blue-900"
              target="_blank"
              rel="noreferrer"
            >
              {t("footer.elaraby")}
            </a>{" "}
            {t("footer.footer_text")}
          </p>
        </Col>
      </Row>
    </AntFooter>
  );
}

export default Footer;
