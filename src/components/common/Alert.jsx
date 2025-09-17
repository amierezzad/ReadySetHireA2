// src/components/common/Alert.jsx
export const Alert = ({ show, type = "success", message, onClose }) => {
	if (!show) return null;
	const getAlertStyle = () => {
		switch (type) {
			case "success":
				return "alert alert-success";
			case "error":
				return "alert alert-error";
			case "warning":
				return "alert alert-warning";
			default:
				return "alert alert-info";
		}
	};
	const getIcon = () => {
		switch (type) {
			case "success":
				return (
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				);
			case "error":
				return (
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				);
			case "warning":
				return (
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
					/>
				);
			default:
				return null;
		}
	};

	return (
		<div className="w-full max-w-2xl mx-auto px-3 mb-4">
			<div role="alert" className={getAlertStyle()}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6 shrink-0 stroke-current"
					fill="none"
					viewBox="0 0 24 24"
				>
					{getIcon()}
				</svg>
				<span>{message}</span>
				{onClose && (
					<button className="btn btn-sm btn-circle btn-ghost" onClick={onClose}>
						✕
					</button>
				)}
			</div>
		</div>
	);
};

export default Alert;
