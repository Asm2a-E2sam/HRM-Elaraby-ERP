import { Card } from "antd";
import dayjs from "dayjs";
import React from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import { useParams } from "react-router-dom";
import { useGetAccountQuery } from "../../redux/rtk/features/account/accountApi";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";
import Loader from "../loader/loader";
import PageTitle from "../page-header/PageHeader";
import UpdateAccount from "./updateAccount";

const DetailAccount = () => {
  const { id } = useParams("id");
  const { data, isLoading } = useGetAccountQuery(id);
  const { t } = useTranslation(); // Use the hook

  if (isLoading) return <Loader />;

  return (
    <>
      <PageTitle title={t("detail_account.back")} />
      <br />
      <UserPrivateComponent permission={"readSingle-account"}>
        <Card>
          <div className=''>
            <div className='flex justify-between mb-4'>
              <h5 className='text-xl'>
                <i>
                  <span className=' ml-2'>{t("detail_account.account_details")}: {data.name}</span>{" "}
                </i>
              </h5>
              <UserPrivateComponent permission={"update-account"}>
                <UpdateAccount data={data} id={id} />
              </UserPrivateComponent>
            </div>
            <div className='flex justify-center'>
              <table className='w-full max-w-full mb-4 bg-transparent detail-account-table'>
                <thead className='text-gray-400 text-xs font-semibold border-gray tracking-wider text-left px-5 py-3 hover:cursor-pointer uppercase border-b-2 border-gray-200'>
                  <tr className='border-b border-gray'>
                    <th
                      scope='col'
                      className='text-white border-b-2 border-t-2 border-gray-200 py-3 px-3 bg-gray-900 text-left text-xs font-semibold uppercase tracking-wider'
                    >
                      {t("detail_account.debit")}
                    </th>
                    <th
                      scope='col'
                      className='text-white border-b-2 border-t-2 border-gray-200 py-3 px-3 bg-gray-900 text-left text-xs font-semibold uppercase tracking-wider'
                    >
                      {t("detail_account.credit")}
                    </th>
                    <th
                      scope='col'
                      className='text-white border-b-2 border-t-2 border-gray-200 py-3 px-3 bg-gray-900 text-left text-xs font-semibold uppercase tracking-wider'
                    >
                      {t("detail_account.particulars")}
                    </th>
                    <th
                      scope='col'
                      className='text-white border-b-2 border-t-2 border-gray-200 py-3 px-3 bg-gray-900 text-left text-xs font-semibold uppercase tracking-wider'
                    >
                      {t("detail_account.date")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data?.debit?.map((item, index) => {
                      return (
                        <tr key={index} className='hover:bg-gray-100 hover:cursor-pointer'>
                          <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                            {item.amount}
                          </td>
                          <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'></td>
                          <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                            {item.particulars}
                          </td>
                          <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                            {dayjs(item.date).format("YYYY-MM-DD")}
                          </td>
                        </tr>
                      );
                    })}
                  {data &&
                    data?.credit?.map((item, index) => {
                      return (
                        <tr key={index} className='hover:bg-gray-100 hover:cursor-pointer'>
                          <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'></td>
                          <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                            {item.amount}
                          </td>
                          <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                            {item.particulars}
                          </td>
                          <td className='py-4 px-6 border-b border-gray-200 text-gray-900 text-sm'>
                            {dayjs(item.date).format("YYYY-MM-DD")}
                          </td>
                        </tr>
                      );
                    })}

                  {data && (
                    <tr className=' text-center hover:bg-gray-100 hover:cursor-pointer'>
                      <td
                        colSpan='2'
                        className=' table-active py-4 px-6 border-b border-gray-200 text-gray-900 text-base'
                      >
                        <strong>{t("detail_account.balance")}</strong>
                      </td>
                      <td>
                        <strong>{data?.balance}</strong>
                      </td>
                      <td></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </UserPrivateComponent>
    </>
  );
};

export default DetailAccount;
