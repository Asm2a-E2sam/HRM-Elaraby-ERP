import { Navigate } from "react-router-dom";
import PageTitle from "../page-header/PageHeader";
import { useTranslation } from "react-i18next"; 

import AddLeave from "./AddLeave";

const Leave = (props) => {
	const { t } = useTranslation();

	return (
		<div>
			<PageTitle title={t("leave.back")} />
			<AddLeave />
		</div>
	);
};

export default Leave;
