import { MinusCircleOutlined } from "@ant-design/icons";
import { DatePicker, Form, Input, Space } from "antd";
import React from "react";
import { useTranslation } from "react-i18next"; 

const EmployeeEducationForm = ({ key, restField, remove, name }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Space
        key={key}
        style={{
          display: "flex",

          justifyContent: "space-between",
          marginBottom: 8,
        }}
        align='baseline'
      >
        <Form.Item
          {...restField}
          name={[name, "degree"]}
          rules={[
            {
              required: true,
              message: "Missing  degree",
            },
          ]}
        >
          <Input placeholder={t("employee_education_form.degree")} />
        </Form.Item>
        <Form.Item
          {...restField}
          name={[name, "institution"]}
          rules={[
            {
              required: true,
              message: "Missing institution",
            },
          ]}
        >
          <Input placeholder={t("employee_education_form.institution")} />
        </Form.Item>
        <Form.Item
          {...restField}
          name={[name, "result"]}
          rules={[{ required: true, message: "Missing result" }]}
        >
          <Input placeholder={t("employee_education_form.result")} />
        </Form.Item>

        <Form.Item
          {...restField}
          name={[name, "studyStartDate"]}
          rules={[{ required: true, message: "Missing studyStartDate" }]}
        >
          <DatePicker placeholder={t("employee_education_form.study_start_date")} />
        </Form.Item>

        <Form.Item
          {...restField}
          name={[name, "studyEndDate"]}
          
        >
          <DatePicker placeholder={t("employee_education_form.study_end_date")}  />
        </Form.Item>

        <Form.Item
          {...restField}
          name={[name, "fieldOfStudy"]}
          rules={[{ required: true, message: "Missing fieldOfStudy" }]}
        >
          <Input placeholder={t("employee_education_form.field")} />
        </Form.Item>
        <MinusCircleOutlined
          className='txt-color'
          style={{ fontSize: "150%" }}
          onClick={() => remove(name)}
        />
      </Space>
    </div>
  );
};

export default EmployeeEducationForm;
