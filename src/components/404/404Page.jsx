import React from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const Page404 = () => {
  const { t } = useTranslation(); // Use the hook

  return (
    <center>
      <section className="py-[40px] px-[0px] bg-white font-serif">
        <div>
          <div>
            <div>
              <div className=" text-center">
                <div className=" bg-center  bg-[url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')] h-[400px] bg-no-repeat">
                  <h1 className="text-center text-[80px]">{t('page404.title')}</h1>
                </div>

                <div className="mt-[-50px]">
                  <h3 className="text-[20px]">{t('page404.subtitle')}</h3>

                  <p className="text-[16px]">{t('page404.description')}</p>

                  <a
                    href="/admin/dashboard"
                    className="text-white py-[10px] px-[20px] bg-[#39ac31] my-[20px] mx-0 inline-block"
                  >
                    {t('page404.go_to_dashboard')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </center>
  );
};

export default Page404;
