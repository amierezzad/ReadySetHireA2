import { useState, useEffect } from "react";
import {
	createApplicant,
	getApplicant,
	updateApplicant,
} from "../../services/api";

const ApplicantForm = ({
	interviewId,
	applicantId,
	onSuccess,
	onCancel,
	isModal = false,
	showAlert,
}) => {
	// Check if in edit mode
	const isEdit = applicantId ? true : false;

	const [formData, setFormData] = useState({
		title: "Mr",
		firstname: "",
		surname: "",
		phone_number: "",
		email_address: "",
		interview_status: "Not Started",
	});

	const [isLoading, setIsLoading] = useState(false);

	// Load applicant data if in edit mode
	useEffect(() => {
		if (isEdit && applicantId) {
			const fetchApplicant = async () => {
				try {
					setIsLoading(true);
					const applicantData = await getApplicant(applicantId);
					if (applicantData && applicantData[0]) {
						setFormData({
							title: applicantData[0].title,
							firstname: applicantData[0].firstname,
							surname: applicantData[0].surname,
							phone_number: applicantData[0].phone_number || "",
							email_address: applicantData[0].email_address,
							interview_status: applicantData[0].interview_status,
						});
					}
				} catch (error) {
					showAlert("Failed to load applicant data", "error");
					console.error("Failed to load applicant data:", error);
				} finally {
					setIsLoading(false);
				}
			};
			fetchApplicant();
		}
	}, [applicantId, isEdit]);

	const handleInputChange = (field, value) => {
		setFormData({ ...formData, [field]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setIsLoading(true);

			if (isEdit) {
				// Update existing applicant
				await updateApplicant(applicantId, formData);
				showAlert("Applicant updated successfully!", "info");
				console.log("Applicant updated successfully");
			} else {
				// Create new applicant
				const applicantData = {
					...formData,
					interview_id: parseInt(interviewId),
				};
				await createApplicant(applicantData);
				showAlert("Applicant created successfully!", "success");
				console.log("Applicant created successfully");
			}

			// Reset form
			setFormData({
				title: "Mr",
				firstname: "",
				surname: "",
				phone_number: "",
				email_address: "",
				interview_status: "Not Started",
			});

			// Call success callback
			if (onSuccess) {
				onSuccess();
			}
		} catch (error) {
			showAlert(`Failed to ${isEdit ? "update" : "create"} applicant`, "error");
			console.error(
				`Failed to ${isEdit ? "update" : "create"} applicant:`,
				error
			);
		} finally {
			setIsLoading(false);
		}
	};

	const handleCancel = () => {
		// Reset form
		setFormData({
			title: "Mr",
			firstname: "",
			surname: "",
			phone_number: "",
			email_address: "",
			interview_status: "Not Started",
		});

		// Call cancel callback
		if (onCancel) {
			onCancel();
		}
	};

	if (isLoading && isEdit) {
		return (
			<div className="p-6">
				<p className="text-center text-gray-500">Loading applicant...</p>
			</div>
		);
	}

	return (
		<div className="p-6">
			<form onSubmit={handleSubmit} className="space-y-4">
				{/* Title Field */}
				<div>
					<label className="block text-sm font-semibold text-gray-900 mb-2">
						Title *
					</label>
					<select
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
						value={formData.title}
						onChange={(e) => handleInputChange("title", e.target.value)}
						required
					>
						<option value="Mr">Mr</option>
						<option value="Ms">Ms</option>
						<option value="Dr">Dr</option>
					</select>
				</div>

				{/* First Name Field */}
				<div>
					<label className="block text-sm font-semibold text-gray-900 mb-2">
						First Name *
					</label>
					<input
						type="text"
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
						placeholder="Enter first name"
						value={formData.firstname}
						onChange={(e) => handleInputChange("firstname", e.target.value)}
						required
					/>
				</div>

				{/* Surname Field */}
				<div>
					<label className="block text-sm font-semibold text-gray-900 mb-2">
						Surname *
					</label>
					<input
						type="text"
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
						placeholder="Enter surname"
						value={formData.surname}
						onChange={(e) => handleInputChange("surname", e.target.value)}
						required
					/>
				</div>

				{/* Phone Number Field */}
				<div>
					<label className="block text-sm font-semibold text-gray-900 mb-2">
						Phone Number
					</label>
					<input
						type="tel"
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
						placeholder="Enter phone number"
						value={formData.phone_number}
						onChange={(e) => handleInputChange("phone_number", e.target.value)}
					/>
				</div>

				{/* Email Address Field */}
				<div>
					<label className="block text-sm font-semibold text-gray-900 mb-2">
						Email Address *
					</label>
					<input
						type="email"
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
						placeholder="Enter email address"
						value={formData.email_address}
						onChange={(e) => handleInputChange("email_address", e.target.value)}
						required
					/>
				</div>

				{/* Interview Status Field */}
				<div>
					<label className="block text-sm font-semibold text-gray-900 mb-2">
						Interview Status *
					</label>
					<select
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
						value={formData.interview_status}
						onChange={(e) => handleInputChange("interview_status", e.target.value)}
						required
					>
						<option value="Not Started">Not Started</option>
						<option value="Completed">Completed</option>
					</select>
				</div>

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
							? "Update Applicant"
							: "Create Applicant"}
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
			</form>
		</div>
	);
};

export default ApplicantForm;