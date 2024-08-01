import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";

import { useState } from "react";
import {
  accountApi,
  useGetAccountsQuery,
} from "../../redux/rtk/features/account/accountApi";
import ViewBtn from "../Buttons/ViewBtn";
import CardCustom from "../CommonUi/CardCustom";
import CommonDelete from "../CommonUi/CommonDelete";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TablePagination from "../CommonUi/TablePagination";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import AddAccount from "./AddAccount";
import { useTranslation } from "react-i18next"; 

const GetAllAccount = () => {
  const { t } = useTranslation();
  const [pageConfig, setPageConfig] = useState({query: 'sa', page: 1, count: 10});
  const { data, isLoading } = useGetAccountsQuery(pageConfig);
  const columns = [
    {
      id: 1,
      title: t("account.id"),
      dataIndex: "id",
      key: "id",
      render: (id) => <Link to={`/admin/account/${id}`}>{id}</Link>,
    },

    {
      id: 2,
      title: t("account.account"),
      dataIndex: "name",
      key: "name",
    },

    {
      id: 3,
      title: t("account.account_type"),
      dataIndex: "account",
      key: "account",
      render: (account) => account?.name,
      responsive: ["md"],
    },
    {
      id: 4,
      title: t("account.create_account"),
      key: "action",
      render: ({ id }) => (
        <div className='flex justify-start align-middle'>
          <UserPrivateComponent permission={"readSingle-account"}>
            <ViewBtn path={`/admin/account/${id}`} />
          </UserPrivateComponent>
          <CommonDelete
            permission={"delete-account"}
            deleteThunk={accountApi.endpoints.deleteAccount.initiate}
            id={id}
          />
        </div>
      ),
    },
  ];
  return (
    <CardCustom
      title={t("account.accounts_list")}
      extra={
        <>
          <CreateDrawer
            permission={"create-account"}
            title={t("account.create_account")}
            width={30}
          >
            <AddAccount />
          </CreateDrawer>
        </>
      }
    >
      <TablePagination
        list={data?.getAllSubAccount}
        total={data?.totalSubAccount}
        setPageConfig={setPageConfig}
        loading={isLoading}
        permission={"readAll-account"}
        columns={columns}
        csvFileName={"accounts"}
      />
    </CardCustom>
  );
};

export default GetAllAccount;
