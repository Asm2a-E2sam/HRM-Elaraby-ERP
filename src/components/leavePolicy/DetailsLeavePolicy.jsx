import { Card, Table } from "antd";
import { Fragment, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useParams } from "react-router-dom";
import ViewBtn from "../Buttons/ViewBtn";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";
import Loader from "../loader/loader";
import PageTitle from "../page-header/PageHeader";

import {
  leavePolicyApi,
  useGetLeavePolicyQuery,
} from "../../redux/rtk/features/leavePolicy/leavePolicyApi";
import CommonDelete from "../CommonUi/CommonDelete";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import LeavePolicyEdit from "../UI/PopUp/LeavePolicyEditPopup";
import CardCustom from "../CommonUi/CardCustom";
import TableNoPagination from "../CommonUi/TableNoPagination";
import { useTranslation } from "react-i18next"; 

//PopUp



const DetailLeavePolicy = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data: leavePolicy ,isLoading:loading} = useGetLeavePolicyQuery(id);
   const columns = [
     {
       id: 1,
       title: t("policy.id"),
       dataIndex: "id",
       key: "id",
     },

     {
       id: 2,
       title: t("policy.name"),
       key: "name",

       render: ({ firstName, lastName }) => firstName + " " + lastName,
     },

     {
       id: 6,
       title:  t("policy.paid_leave"),
       key: "paidLeaveCount",
       render: () => leavePolicy?.paidLeaveCount,
     },

     {
       id: 6,
       title:  t("policy.unpaid_leave"),
       key: "unpaidLeaveCount",
       render: () => leavePolicy?.unpaidLeaveCount,
     },

     {
       id: 4,
       title:  t("policy.action"),
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
      <PageTitle title={ t("policy.back")} />
      <UserPrivateComponent permission={"readSingle-leavePolicy"}>
        <CardCustom
          title={
            <h3>
              { t("policy.id")} : {leavePolicy?.id} | {leavePolicy?.name}
            </h3>
          }
          extra={
            <div className="flex justify-end items-center">
              <UserPrivateComponent permission={"update-leavePolicy"}>
                <LeavePolicyEdit data={leavePolicy} />
              </UserPrivateComponent>

              <CommonDelete
                permission={"delete-leavePolicy"}
                id={id}
                deleteThunk={
                  leavePolicyApi.endpoints.deleteLeavePolicy.initiate
                }
                navigatePath={"/admin/leave-policy"}
              />
            </div>
          }
        >
          <TableNoPagination
            leftElement={
              <h1 className="p-2 font-semibold text-lg text-center">
                { t("policy.employee_list")}
              </h1>
            }
            list={leavePolicy?.user}
            loading={loading}
            columns={columns}
            permission={"readSingle-leavePolicy"}
            csvFileName={"Employee leave policy list "}
          />
        </CardCustom>
      </UserPrivateComponent>
    </div>
  );
};

export default DetailLeavePolicy;
