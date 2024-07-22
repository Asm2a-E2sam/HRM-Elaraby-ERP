import { UploadOutlined } from "@ant-design/icons";
import {
    Button,
    Card,
    Col,
    Form,
    Input,
    Row,
    Select,
    Typography,
    Upload,
} from "antd";
import { useEffect, useState } from "react";
import {
    useGetSettingQuery,
    useUpdateSettingMutation,
} from "../../redux/rtk/features/setting/settingApi";
import fileConfig from "../../utils/fileConfig";
import { toastHandler } from "../../utils/functions";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import Loader from "../loader/loader";
import { useTranslation } from "react-i18next";
const AddDetails = () => {
    const { Title } = Typography;
    const [form] = Form.useForm();
    const { data } = useGetSettingQuery();

    const [updateSetting, { isLoading }] = useUpdateSettingMutation();

    const [initValues, setInitValues] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [timezoneList, setTimezoneList] = useState([]);

    const { t } = useTranslation();
    
    const onFinish = async (values) => {
        try {
            const formData = new FormData();
            formData.append("companyName", values.companyName);
            formData.append("tagLine", values.tagLine);
            formData.append("address", values.address);
            formData.append("phone", values.phone);
            formData.append("email", values.email);
            formData.append("website", values.website);
            formData.append("footer", values.footer);
            formData.append("timezone", values.timezone);
            formData.append("_method", "PUT");
            if (fileList.length) {
                if (fileConfig() === "laravel") {
                    formData.append("files[]", fileList[0].originFileObj);
                }
            }

            const resp = await updateSetting(formData);
            if (resp.data && !resp.error) {
                toastHandler("Invoice Setting Updated Successfully", "success");
                window.location.reload();
            }
        } catch (error) {}
    };

    const onFinishFailed = () => {};

    useEffect(() => {
        if (data) {
            setInitValues(data);
        }
    }, [data]);
    const handelImageChange = ({ fileList }) => {
        setFileList(fileList);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "https://raw.githubusercontent.com/leon-do/Timezones/main/timezone.json"
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setTimezoneList(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // const timezoneList = ["UTC", "Asia/Dhaka"];

    return (
        <>
            <UserPrivateComponent permission={"create-setting"}>
                <Row className="mt-[25px]" justify="center">
                    <Col
                        xs={24}
                        sm={24}
                        md={24}
                        lg={11}
                        xl={11}
                        className="border rounded column-design"
                    >
                        <Card bordered={false}>
                            <Title level={4} className="m-2 mb-4 text-center">
                                Company Setting
                            </Title>
                            {initValues ? (
                                <Form
                                initialValues={{
                                  ...initValues,
                                }}
                                form={form}
                                name="basic"
                                labelCol={{
                                  span: 6,
                                }}
                                labelWrap
                                wrapperCol={{
                                  span: 16,
                                }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                              >
                                <Form.Item
                                  style={{ marginBottom: "10px" }}
                                  label={t('add_details.company_name')}
                                  name="companyName"
                                  rules={[
                                    {
                                      required: true,
                                      message: t('add_details.field_required'),
                                    },
                                  ]}
                                >
                                  <Input />
                                </Form.Item>
                                <Form.Item
                                  style={{ marginBottom: "10px" }}
                                  label={t('add_details.tagline')}
                                  name="tagLine"
                                  rules={[
                                    {
                                      required: true,
                                      message: t('add_details.field_required'),
                                    },
                                  ]}
                                >
                                  <Input />
                                </Form.Item>
                  
                                <Form.Item
                                  style={{ marginBottom: "10px" }}
                                  label={t('add_details.address')}
                                  name="address"
                                  rules={[
                                    {
                                      required: true,
                                      message: t('add_details.field_required'),
                                    },
                                  ]}
                                >
                                  <Input />
                                </Form.Item>
                  
                                <Form.Item
                                  style={{ marginBottom: "10px" }}
                                  label={t('add_details.phone_number')}
                                  name="phone"
                                  rules={[
                                    {
                                      required: true,
                                      message: t('add_details.field_required'),
                                    },
                                  ]}
                                >
                                  <Input />
                                </Form.Item>
                  
                                <Form.Item
                                  style={{ marginBottom: "10px" }}
                                  label={t('add_details.email_address')}
                                  name="email"
                                  rules={[
                                    {
                                      required: true,
                                      message: t('add_details.field_required'),
                                    },
                                  ]}
                                >
                                  <Input />
                                </Form.Item>
                  
                                <Form.Item
                                  style={{ marginBottom: "10px" }}
                                  label={t('add_details.website')}
                                  name="website"
                                  rules={[
                                    {
                                      required: true,
                                      message: t('add_details.field_required'),
                                    },
                                  ]}
                                >
                                  <Input />
                                </Form.Item>
                  
                                <Form.Item
                                  style={{ marginBottom: "10px" }}
                                  label={t('add_details.footer')}
                                  name="footer"
                                  rules={[
                                    {
                                      required: true,
                                      message: t('add_details.field_required'),
                                    },
                                  ]}
                                >
                                  <Input />
                                </Form.Item>
                  
                                <Form.Item
                                  style={{ marginBottom: "10px" }}
                                  label={t('add_details.timezone')}
                                  name="timezone"
                                  rules={[
                                    {
                                      required: true,
                                      message: t('add_details.field_required'),
                                    },
                                  ]}
                                >
                                  <Select
                                    mode="single"
                                    placeholder={t('add_details.select_timezone')}
                                    optionFilterProp="children"
                                  >
                                    {timezoneList
                                      ? timezoneList.map((item, index) => {
                                          return (
                                            <Select.Option value={item} key={index}>
                                              {item}
                                            </Select.Option>
                                          );
                                        })
                                      : ""}
                                  </Select>
                                </Form.Item>
                                <Form.Item label={t('add_details.warning')}>
                                  <p className="font-semibold text-rose-500">
                                    {t('add_details.warning')}
                                  </p>
                                </Form.Item>
                  
                                <Form.Item label={t('add_details.upload_logo')} valuePropName="fileList">
                                  <Upload
                                    listType="picture-card"
                                    beforeUpload={() => false}
                                    name="image"
                                    fileList={fileList}
                                    maxCount={1}
                                    onChange={handelImageChange}
                                  >
                                    <div>
                                      <UploadOutlined />
                                      <div
                                        style={{
                                          marginTop: 8,
                                        }}
                                      >
                                        {t('add_details.upload_button')}
                                      </div>
                                    </div>
                                  </Upload>
                                </Form.Item>
                  
                                <Form.Item
                                  style={{ marginBottom: "10px" }}
                                  className="flex justify-center mt-[24px]"
                                >
                                  <Button
                                    type="primary"
                                    htmlType="submit"
                                    shape="round"
                                    size="large"
                                    loading={isLoading}
                                  >
                                    {t('add_details.register_button')}
                                  </Button>
                                </Form.Item>
                                  <h6 className="text-center mt-2">
                                  {t('add_details.already_have_account')}{" "}
                                  <Link to={"/admin/auth/login"}>{t('add_details.login_here')}</Link>
                                </h6>
                              </Form>
                            ) : (
                                <Loader />
                            )}
                        </Card>
                    </Col>
                </Row>
            </UserPrivateComponent>
        </>
    );
};

export default AddDetails;
