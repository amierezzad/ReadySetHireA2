import { useState, useEffect } from "react";
import {
	createInterview,
	getInterview,
	updateInterview,
} from "../../services/api";

const InterviewForm = ({
	interviewId,
	onSuccess,
	onCancel,
	showAlert,
	isModal = false,
}) => {
	// Check if in edit mode
	const isEdit = interviewId ? true : false;

	const [formData, setFormData] = useState({
		title: "",
		job_role: "",
		description: "",
		status: "Draft",
	});

	const [isLoading, setIsLoading] = useState(false);

	// Load interview data if in edit mode
	useEffect(() => {
		if (isEdit && interviewId) {
			const fetchInterview = async () => {
				try {
					setIsLoading(true);
					const interviewData = await getInterview(interviewId);
					if (interviewData && interviewData[0]) {
						setFormData({
							title: interviewData[0].title,
							job_role: interviewData[0].job_role,
							description: interviewData[0].description,
							status: interviewData[0].status,
						});
					}
				} catch (error) {
					showAlert("Failed to load interview data", "error");
					console.error("Failed to load interview data:", error);
				} finally {
					setIsLoading(false);
				}
			};
			fetchInterview();
		}
	}, [interviewId, isEdit]);

	const handleInputChange = (field, value) => {
		setFormData({ ...formData, [field]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setIsLoading(true);

			if (isEdit) {
				await updateInterview(interviewId, formData);
				showAlert("Interview Updated Successfully!", "info");
				console.log("Interview updated successfully");
			} else {
				await createInterview(formData);
				showAlert("Interview Created Successfully!", "success");
				console.log("Interview created successfully");
			}

			// Reset form
			setFormData({
				title: "",
				job_role: "",
				description: "",
				status: "Draft",
			});

			// Call success callback
			if (onSuccess) {
				onSuccess();
			}
		} catch (error) {
			showAlert(
				isEdit ? "Failed to update interview" : "Failed to create interview",
				"error"
			);
			console.error(
				`Failed to ${isEdit ? "update" : "create"} interview:`,
				error
			);
		} finally {
			setIsLoading(false);
		}
	};

	const handleCancel = () => {
		// Reset form
		setFormData({
			title: "",
			job_role: "",
			description: "",
			status: "Draft",
		});

		// Call cancel callback
		if (onCancel) {
			onCancel();
		}
	};

	if (isLoading && isEdit) {
		return (
			<div className="p-6">
				<p className="text-center text-gray-500">Loading interview...</p>
			</div>
		);
	}

	// If it's not a modal, render with the original layout
	if (!isModal) {
		return (
			<div className="bg-white shadow-sm rounded-2xl max-w-2xl mx-auto">
				{/* Header Section */}
				<div className="p-6 text-center border-b border-gray-100">
					<h2 className="text-xl font-bold text-gray-900 mb-2">
						{!isEdit ? "Create Your Interview" : "Update Your Interview"}
					</h2>
					<p className="text-gray-500">
						{!isEdit
							? "Fill in the form below to add new interview"
							: "Edit the details of your interview"}
					</p>
				</div>

				{/* Form Section */}
				<div className="p-6">
					<form className="space-y-6" onSubmit={handleSubmit}>
						{/* Form Fields */}
						<FormFields 
							formData={formData} 
							handleInputChange={handleInputChange} 
							isLoading={isLoading}
							isEdit={isEdit}
							handleCancel={handleCancel}
						/>
					</form>
				</div>
			</div>
		);
	}

	// Modal layout
	return (
		<div className="p-6">
			<form onSubmit={handleSubmit} className="space-y-4">
				{/* Form Fields */}
				<FormFields 
					formData={formData} 
					handleInputChange={handleInputChange} 
					isLoading={isLoading}
					isEdit={isEdit}
					handleCancel={handleCancel}
				/>
			</form>
		</div>
	);
};

// Separate component for form fields to avoid duplication
const FormFields = ({ formData, handleInputChange, isLoading, isEdit, handleCancel }) => (
	<>
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
				onChange={(e) => handleInputChange("description", e.target.value)}
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
				className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
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
		<div className="flex gap-3">
			<button
				type="submit"
				disabled={isLoading}
				className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
			>
				{isLoading
					? isEdit
						? "Updating..."
						: "Creating..."
					: isEdit
					? "Update Interview"
					: "Create Interview"}
			</button>
			<button
				type="button"
				onClick={handleCancel}
				disabled={isLoading}
				className="bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-900 font-semibold py-2 px-4 rounded-lg transition-colors"
			>
				Cancel
			</button>
		</div>
	</>
);

export default InterviewForm;