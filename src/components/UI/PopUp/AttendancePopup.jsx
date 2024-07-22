import { Button, Col, Input, Modal, Row } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import {
  useAddAttendanceMutation,
  useGetCurrentUserClockInStatusQuery,
} from "../../../redux/rtk/features/attendance/attendanceApi";
import getUserFromToken from "../../../utils/getUserFromToken";
import publicIp from "react-public-ip";
import { useTranslation } from "react-i18next";

const AttendancePopup = () => {
  const isLogged = localStorage.getItem("isLogged");

  const { TextArea } = Input;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [time, setTime] = useState();
  const [date, setDate] = useState();
  const [ipv4, setIpv4] = useState();
  const [checkInNote, setCheckInNote] = useState("");
  const [inOut, setInOut] = useState("In");
  const id = getUserFromToken();
  const [inTime, setInTime] = useState();

  const { data: clockIn, isLoading: loading } =
    useGetCurrentUserClockInStatusQuery(id);
  const [addClockIn] = useAddAttendanceMutation();

  useEffect(() => {
    if (clockIn) {
      if (clockIn.outTime === null) {
        setInOut("Out");
        const inTime = clockIn.inTime;
        const dateParts = inTime.split(/[\s-:]/);
        const date = new Date(
          Date.UTC(
            dateParts[0],
            dateParts[1] - 1,
            dateParts[2],
            dateParts[3],
            dateParts[4],
            dateParts[5]
          )
        );

        const currentDate = new Date();
        const timeDifference = currentDate.getTime() - date.getTime();
        const minutesDifference = Math.floor(timeDifference / (1000 * 60)) % 60;
        const hoursDifference =
          Math.floor(timeDifference / (1000 * 60 * 60)) % 24;

        setInTime(`${hoursDifference}:${minutesDifference}`);
      } else {
        setInOut("In");
      }
    }
  }, [clockIn]);

  const clockInClick = async () => {
    setLoader(true);
    const ipv4 = (await publicIp.v4()) || "";
    setIpv4(ipv4);
    setLoader(false);
    setIsModalVisible(true);
    setTime(dayjs(new Date()).format("hh:mm A"));
    setDate(dayjs(new Date()).format("DD-MM-YYYY"));
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCheckInNote("");
  };

  const handleOk = async () => {
    const data = {
      userId: parseInt(id),
      comment: checkInNote,
      ip: ipv4,
    };

    try {
      const resp = await addClockIn({ values: data });
      if (resp.outTime === null) {
        setInOut("Out");
      } else {
        setInOut("In");
      }
      setCheckInNote("");
    } catch (error) {
      console.log(error);
    }
    setIsModalVisible(false);
  };

  const { t } = useTranslation();

  return (
    <>
      {isLogged &&
        (inOut === "In" ? (
          <Button
            loading={loading || loader}
            type='primary'
            className='btn-clock-in'
            onClick={() => clockInClick()}
          >
            <span className='btn-clock-in-text'>{t("dashboard.clock_in")}</span>
          </Button>
        ) : (
          <Button
            loading={loading || loader}
            type='danger'
            className='btn-clock-in'
            onClick={() => clockInClick()}
          >
            <span className='btn-clock-in-text'>{t("dashboard.clock_out")} {inTime}</span>
          </Button>
        ))}
      <Modal
        title={t("attendance_popup.title", { inOut })}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row gutter={[12, 0]}>
          <Col span={12}>
            <p className='text-base font-semibold text-color-2'>
              {t("attendance_popup.clock_date_time", { inOut })}
            </p>
            <h1>{t("attendance_popup.today", { date })}</h1>
            <h1>{t("attendance_popup.time", { time })}</h1>
          </Col>
          <Col
            span={24}
            className='font-semibold'
            style={{
              backgroundColor: "#AFFF9C",
              padding: "2%",
              marginTop: "5%",
            }}
          >
            <p className='font-semibold'>
              {t("attendance_popup.your_ip")} <span style={{ color: "#595959" }}>{ipv4}</span>
            </p>
          </Col>
          <Col
            span={24}
            style={{
              marginTop: "2%",
            }}
          >
            <p>{t("attendance_popup.clock_note", { inOut })}</p>
            <TextArea
              onChange={(e) => setCheckInNote(e.target.value)}
              maxLength={28}
              rows={4}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default AttendancePopup;
