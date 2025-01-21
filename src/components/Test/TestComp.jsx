import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ordered, restocked } from "../../redux/rtk/features/cart/cartSlice";
import { useTranslation } from "react-i18next"; 

export default function TestComp() {
  const { t } = useTranslation();
  const numOfCakes = useSelector((state) => state.account.numOfCakes);
  const dispatch = useDispatch();
  return (
    <div style={{ marginTop: "10rem", marginLeft: "10rem", fontSize: "2rem" }}>
      {t("test_comp.hi_there")}
      <h2>{t("test_comp.number_cakes")} - {numOfCakes}</h2>
      <button onClick={() => dispatch(ordered())}>{t("test_comp.order_cake")}</button>
      <button onClick={() => dispatch(restocked(5))} >{t("test_comp.restock_cakes")}</button>
    </div>
  );
}
