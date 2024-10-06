import { Spin } from "antd";
import React from "react";
import { useTranslation } from "react-i18next"; 

function BtnLoader(props) {
	const { t } = useTranslation();

	return (
		<div className='text-center'>
			<div className='loading'>
				<p> {t("loading")} </p>
				<Spin size={"default"} />
			</div>
		</div>
	);
}

export default BtnLoader;
