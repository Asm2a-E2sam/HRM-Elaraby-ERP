import { useTranslation } from "react-i18next";
import PageTitle from "../page-header/PageHeader";
import AddUser from "./addUser";

const UserList = (props) => {
  const { t } = useTranslation();
  return (
    <div>
      <PageTitle title='Back' />

      <h1 className='m-2 text-center text-2xl font-semibold mt-5 txt-color'>
        {t("add_employee.add_employee")}
      </h1>
      <AddUser />
    </div>
  );
};

export default UserList;
