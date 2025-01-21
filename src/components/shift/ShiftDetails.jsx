import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import {
    shiftApi,
    useGetShiftQuery,
} from "../../redux/rtk/features/shift/shiftApi";
import ViewBtn from "../Buttons/ViewBtn";
import CardCustom from "../CommonUi/CardCustom";
import CommonDelete from "../CommonUi/CommonDelete";
import TableNoPagination from "../CommonUi/TableNoPagination";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import ShiftEditPopup from "../UI/PopUp/ShiftEditPopup";
import PageTitle from "../page-header/PageHeader";
import { useTranslation } from "react-i18next"; 

//PopUp


const DetailShift = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const { data: shift ,isLoading:loading} = useGetShiftQuery(id);
   const columns = [
     {
       id: 1,
       title: t("shift.id"),
       dataIndex: "id",
       key: "id",
     },

     {
       id: 2,
       title: t("shift.name"),
       key: "firstName",
       render: ({ firstName, lastName }) => firstName + " " + lastName,
     },

     {
       id: 6,
       title: t("shift.username"),
       dataIndex: "username",
       key: "username",
     },
     {
       id: 7,
       title: t("shift.start_time"),
       dataIndex: "startTime",
       key: "startTime",
       render: (startTime) => dayjs(startTime).format("hh:mm A"),
     },
     {
       id: 8,
       title: t("shift.end_time"),
       dataIndex: "endTime",
       key: "endTime",
       render: (endTime) => dayjs(endTime).format("hh:mm A"),
     },
     {
       id: 4,
       title: t("shift.action"),
       dataIndex: "id",
       key: "action",
       render: (id) => (
         <UserPrivateComponent permission={"readSingle-user"}>
           <ViewBtn path={`/admin/hr/staffs/${id}/`} />
         </UserPrivateComponent>
       ),
     },
   ];
  return (
    <div>
      <PageTitle title={t("shift.back")} />

      <UserPrivateComponent permission={"readSingle-shift"}>
        <CardCustom
          title={
            <h3>
              {t("shift.id")} : {shift?.id} | {shift?.name}
            </h3>
          }
          extra={
            <div className="flex justify-end items-center">
              <UserPrivateComponent permission={"update-shift"}>
                <ShiftEditPopup data={shift} />
              </UserPrivateComponent>

              <CommonDelete
                id={id}
                navigatePath={"/admin/shift"}
                permission={"delete-shift"}
                deleteThunk={shiftApi.endpoints.deleteShift.initiate}
              />
            </div>
          }
        >
          <TableNoPagination
            leftElement={
              <h1 className="p-2 font-semibold text-lg text-center">
                {t("shift.employee_list")}
              </h1>
            }
            list={shift?.user}
            columns={columns}
            loading={loading}
            csvFileName={"Shift employee List"}
            permission={"readSingle-shift"}
          />
        </CardCustom>
      </UserPrivateComponent>
    </div>
  );
};

export default DetailShift;
