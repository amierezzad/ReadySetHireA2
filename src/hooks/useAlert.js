// src/hooks/useAlert.js
import { useState, useEffect } from "react";

export const useAlert = () => {
	const [alert, setAlert] = useState({
		show: false,
		type: "success",
		message: "",
	});

	const showAlert = (message, type = "success", duration = 300000) => {
		setAlert({ show: true, type, message });

		if (duration > 0) {
			setTimeout(() => {
				setAlert({ show: false, type: "", message: "" });
			}, duration);
		}
	};

	const hideAlert = () => {
		setAlert({ show: false, type: "", message: "" });
	};

	return {
		alert,
		showAlert,
		hideAlert,
	};
};
