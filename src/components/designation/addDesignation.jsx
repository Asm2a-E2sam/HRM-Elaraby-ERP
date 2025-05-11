import { Button, Form, Input, Typography } from "antd";
import { useAddDesignationMutation } from "../../redux/rtk/features/designation/designationApi";
import { useTranslation } from "react-i18next"; 

const AddDesignation = () => {
  const { Title } = Typography;
  const [addDesignation, { isLoading }] = useAddDesignationMutation();
  const [form] = Form.useForm();
<<<<<<< HEAD
  const adminId = localStorage.getItem("admin_id");
=======
>>>>>>> bedaf815c21ad1eec7599208043754cc6219b2d7
  const { t } = useTranslation();


  const onFinish = async (values) => {
    try {
      const resp = await addDesignation(values);
      if (resp.data && !resp.error) {
        form.resetFields();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      name='basic'
      layout='vertical'
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <Form.Item
        style={{ marginBottom: "20px" }}
        label={t("add_designation.name")}
        name='name'
        rules={[
          {
            required: true,
            message: t("add_designation.please_input_designation_name"),
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        style={{ marginBottom: "20px" }}
        wrapperCol={{
          offset: 6,
          span: 12,
        }}
      >
        <Button
          type='primary'
          block
          htmlType='submit'
          shape='round'
          size='large'
          loading={isLoading}
        >
          {t("detail_department.add_designation")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddDesignation;
