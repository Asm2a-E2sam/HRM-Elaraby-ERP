import { Card } from "antd";
import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next"; 

import Loader from "../loader/loader";
import PageTitle from "../page-header/PageHeader";

import { useGetEmploymentStatusQuery } from "../../redux/rtk/features/employemntStatus/employmentStatusApi";

const DetailAnnouncement = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const { data: employmentStatus } = useGetEmploymentStatusQuery(id);

  return (
    <div>
      <PageTitle title={t("detail_announcement.back")} />

      <Card className='mt-[25px]'>
        {employmentStatus ? (
          <Fragment key={employmentStatus.id}>
            <div>
              <div className='flex justify-between '>
                <h3 className={"text-xl"}>
                  ID : {employmentStatus.id} | {employmentStatus.name}
                </h3>
                <div className='flex justify-end'>
                  <h2 className='mr-5'>{t("detail_announcement.status")}</h2>
                </div>
              </div>
            </div>
          </Fragment>
        ) : (
          <Loader />
        )}
      </Card>
    </div>
  );
};

export default DetailAnnouncement;
