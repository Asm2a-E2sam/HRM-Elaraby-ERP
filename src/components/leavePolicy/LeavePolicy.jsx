import { useState } from "react";
import { useGetLeavePoliciesQuery } from "../../redux/rtk/features/leavePolicy/leavePolicyApi";
import ViewBtn from "../Buttons/ViewBtn";
import CardCustom from "../CommonUi/CardCustom";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TablePagination from "../CommonUi/TablePagination";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import PageTitle from "../page-header/PageHeader";
import AddLeavePolicy from "./AddLeavePolicy";
import { useTranslation } from "react-i18next"; 


const LeavePolicy = () => {
    const { t } = useTranslation();
    const [pagConfig, setPageConfig] = useState({
        status: "true",
        page: 1,
        count: 10,
    });
    const { data, isLoading } = useGetLeavePoliciesQuery(pagConfig);
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
            dataIndex: "name",
            key: "name",
        },

        {
            id: 3,
            title: t("policy.total_paid_leave"),
            dataIndex: "paidLeaveCount",
            key: "paidLeaveCount",
        },

        {
            id: 3,
            title: t("policy.total_unpaid_leave"),
            dataIndex: "unpaidLeaveCount",
            key: "unpaidLeaveCount",
        },
        {
            id: 4,
            title: t("policy.action"),
            dataIndex: "id",
            key: "action",
            render: (id) => (
                <UserPrivateComponent permission={"readSingle-leavePolicy"}>
                    <ViewBtn path={`/admin/leave-policy/${id}/`} />
                </UserPrivateComponent>
            ),
        },
    ];
    return (
        <>
            <PageTitle title={t("policy.back")} />
            <CardCustom
                title={t("policy.leave_policies")}
                extra={
                    <>
                        <CreateDrawer
                            permission={"create-leavePolicy"}
                            title={t("policy.create_leave_policy")}
                            width={35}
                        >
                            <AddLeavePolicy />
                        </CreateDrawer>
                    </>
                }
            >
                <TablePagination
                    columns={columns}
                    csvFileName={"Leave Policies"}
                    list={data?.getAllLeavePolicy}
                    total={data?.totalLeavePolicy}
                    setPageConfig={setPageConfig}
                    loading={isLoading}
                    permission={"readAll-leavePolicy"}
                />
            </CardCustom>
        </>
    );
};

export default LeavePolicy;
