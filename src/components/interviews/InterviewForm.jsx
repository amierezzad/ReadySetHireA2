import { useState } from "react";
import { createInterview } from "../../services/api";
import Alert from "../common/Alert";
import { useAlert } from "../../hooks/useAlert";

const InterviewForm = () => {
	const { alert, showAlert, hideAlert } = useAlert();
	const [formData, setFormData] = useState({
		title: "",
		job_role: "",
		description: "",
		status: "Draft",
	});
	const handleInputChange = (field, value) => {
		setFormData({ ...formData, [field]: value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await createInterview(formData);
			showAlert("Interview Created SuccessFully!", "success");
			setFormData({
				title: "",
				job_role: "",
				description: "",
				status: "Draft",
			});
		} catch (error) {
			showAlert("Failed to create interview", "error");
		}
	};

	return (
		<>
			<Alert
				show={alert.show}
				type={alert.type}
				message={alert.message}
				onClose={hideAlert}
			/>

			<div className="bg-white shadow-sm rounded-2xl max-w-2xl mx-auto">
				{/* Header Section */}
				<div className="p-6 text-center border-b border-gray-100">
					<h2 className="text-xl font-bold text-gray-900 mb-2">
						Create Your Interview
					</h2>
					<p className="text-gray-500">
						Fill in the form below to add new interview
					</p>
				</div>

				{/* Form Section */}
				<div className="p-6">
					<form className="space-y-6" onSubmit={handleSubmit}>
						{/* Title Field */}
						<div>
							<label className="block text-sm font-semibold text-gray-900 mb-2">
								Title *
							</label>
							<input
								type="text"
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
								placeholder="Enter interview title"
								onChange={(e) => handleInputChange("title", e.target.value)}
								value={formData.title}
								required
							/>
						</div>

						{/* Job Role Field */}
						<div>
							<label className="block text-sm font-semibold text-gray-900 mb-2">
								Job Role *
							</label>
							<input
								type="text"
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
								placeholder="Enter job role"
								onChange={(e) => handleInputChange("job_role", e.target.value)}
								value={formData.job_role}
								required
							/>
						</div>

						{/* Description Field */}
						<div>
							<label className="block text-sm font-semibold text-gray-900 mb-2">
								Description *
							</label>
							<textarea
								rows="4"
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
								placeholder="Enter interview description"
								onChange={(e) =>
									handleInputChange("description", e.target.value)
								}
								value={formData.description}
								required
							/>
						</div>

						{/* Status Field */}
						<div>
							<label className="block text-sm font-semibold text-gray-900 mb-2">
								Status *
							</label>
							<select
								className=" select bg-white w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
								value={formData.status}
								onChange={(e) => handleInputChange("status", e.target.value)}
								required
							>
								<option value="Draft">Draft</option>
								<option value="Published">Published</option>
								<option value="Archived">Archived</option>
							</select>
						</div>

						{/* Buttons */}
						<div className="flex gap-4 pt-4">
							<button
								type="submit"
								className="flex-1 bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors"
							>
								Create
							</button>
							<button
								type="button"
								className="flex-1 bg-gray-200 text-gray-900 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default InterviewForm;
