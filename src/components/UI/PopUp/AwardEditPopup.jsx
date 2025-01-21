import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useUpdateAwardMutation } from "../../../redux/rtk/features/award/awardApi";
import BtnEditSvg from "../Button/btnEditSvg";
import { useTranslation } from "react-i18next"; 

const AwardEditPopup = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams("id");
  const [updateAward, { isLoading }] = useUpdateAwardMutation();
  const { t } = useTranslation();

  const onFinish = async (values) => {
    await updateAward({ id, values });
  };

  const initialValues = {
    name: data?.name,
    description: data?.description,
  };

  const onFinishFailed = (errorInfo) => {
    toast.warning(t("pop_up.failed_adding_department"));
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <button onClick={showModal}>
        <BtnEditSvg size={36} />
      </button>
      <Modal
        title={t("pop_up.award_edit")}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          style={{ marginBottom: "100px" }}
          eventKey='department-form'
          initialValues={{ ...initialValues }}
          name='basic'
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 12,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <div>
            <Form.Item
              style={{ marginBottom: "10px" }}
              label={t("pop_up.name")}
              name='name'
              rules={[
                {
                  required: true,
                  message: t("pop_up.please_input_award_name"),
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "20px" }}
              label={t("pop_up.description")}
              name='description'
              rules={[
                {
                  required: true,
                  message: t("pop_up.please_input_award_description"),
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "10px" }}
              wrapperCol={{
                offset: 6,
                span: 12,
              }}
            >
              <Button
                type='primary'
                size='small'
                htmlType='submit'
                block
                loading={isLoading}
              >
                {t("pop_up.update_award")}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default AwardEditPopup;
