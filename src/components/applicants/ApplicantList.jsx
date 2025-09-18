// React Icon imports
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoArrowBack, IoClose } from "react-icons/io5";
import { MdContentCopy } from "react-icons/md";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getApplicants, deleteApplicant, getInterview } from "../../services/api";
import ApplicantForm from "./ApplicantForm";
import Alert from "../common/Alert";
import { useAlert } from "../../hooks/useAlert";

const ApplicantList = () => {
	const { alert, showAlert, hideAlert } = useAlert();

	const { interviewId } = useParams();

	const [applicants, setApplicants] = useState([]);
	const [interview, setInterview] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [modalState, setModalState] = useState({
		isOpen: false,
		mode: null,
		applicantId: null,
	});

	useEffect(() => {
		if (interviewId) {
			fetchInterviewData();
			fetchApplicants();
		}
	}, [interviewId]);

	const fetchInterviewData = async () => {
		try {
			const interviewData = await getInterview(interviewId);
			if (interviewData && interviewData[0]) {
				setInterview(interviewData[0]);
			}
		} catch (error) {
			console.error("Failed to fetch interview data:", error);
		}
	};

	const fetchApplicants = async () => {
		try {
			setIsLoading(true);
			const applicantsData = await getApplicants(interviewId);
			setApplicants(applicantsData || []);
		} catch (error) {
			console.error("Failed to fetch applicants:", error);
			setApplicants([]);
		} finally {
			setIsLoading(false);
		}
	};

	const handleAddApplicant = () => {
		setModalState({
			isOpen: true,
			mode: "add",
			applicantId: null,
		});
	};

	const handleEditApplicant = (applicantId) => {
		setModalState({
			isOpen: true,
			mode: "edit",
			applicantId: applicantId,
		});
	};

	const handleCloseModal = () => {
		setModalState({
			isOpen: false,
			mode: null,
			applicantId: null,
		});
	};

	const handleFormSuccess = () => {
		fetchApplicants();
		handleCloseModal();
	};

	const handleDelete = async (applicantId) => {
		if (window.confirm("Are you sure you want to delete this applicant?")) {
			try {
				await deleteApplicant(applicantId);
				setApplicants(applicants.filter((a) => a.id !== applicantId));
				showAlert("Applicant deleted successfully!", "warning");
			} catch (error) {
				console.error("Failed to delete applicant:", error);
			}
		}
	};

	const generateInterviewLink = (applicantId) => {
		const baseUrl = window.location.origin;
		return `${baseUrl}/take-interview/${interviewId}/${applicantId}`;
	};

	const handleCopyLink = (applicantId) => {
		const link = generateInterviewLink(applicantId);
		navigator.clipboard.writeText(link).then(() => {
			showAlert("Interview link copied to clipboard!", "info");
		}).catch(() => {
			showAlert("Failed to copy link", "error");
		});
	};

	const getStatusColor = (status) => {
		switch (status) {
			case "Completed":
				return "bg-green-100 text-green-800";
			case "Not Started":
				return "bg-gray-100 text-gray-800";
			default:
				return "bg-gray-100 text-gray-800";
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
			<div className="space-y-6">
				{/* Back Navigation */}
				<Link
					to="/"
					className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
				>
					<IoArrowBack className="w-4 h-4" />
					Back to Interviews
				</Link>

				<div className="bg-white shadow-sm rounded-2xl">
					{/* Header Section */}
					<div className="p-4 sm:p-6 border-b border-gray-100">
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
							<div>
								<h2 className="text-xl font-bold text-gray-900 mb-1">
									Applicants Management
								</h2>
								<p className="text-gray-500 font-medium">
									Interview: {interview ? interview.title : "Loading..."}
								</p>
							</div>
							<button
								onClick={handleAddApplicant}
								className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2 self-start sm:self-auto"
							>
								<span className="text-lg">+</span>
								Add Applicant
							</button>
						</div>
					</div>

					{/* Loading State */}
					{isLoading && (
						<div className="p-8 text-center text-gray-500">
							<p>Loading applicants...</p>
						</div>
					)}

					{/* Table Header */}
					{!isLoading && applicants.length > 0 && (
						<div className="hidden lg:block">
							<div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 font-semibold text-gray-700 text-sm">
								<div className="col-span-2">Name</div>
								<div className="col-span-2">Email</div>
								<div className="col-span-1">Phone</div>
								<div className="col-span-2">Interview</div>
								<div className="col-span-2">Status</div>
								<div className="col-span-3">Actions</div>
							</div>
						</div>
					)}

					{/* Applicants List */}
					{!isLoading && (
						<div className="divide-y divide-gray-100">
							{applicants.map((applicant) => (
								<div key={applicant.id} className="p-4 sm:p-6">
									{/* Mobile Layout */}
									<div className="lg:hidden space-y-3">
										<div>
											<div className="font-medium text-gray-900 mb-2">
												{applicant.title} {applicant.firstname} {applicant.surname}
											</div>
											<div className="text-sm text-gray-500 mb-2">
												Email: {applicant.email_address}
											</div>
											{applicant.phone_number && (
												<div className="text-sm text-gray-500 mb-2">
													Phone: {applicant.phone_number}
												</div>
											)}
											<div className="text-sm text-gray-500 mb-2">
												{interview ? interview.title : "Loading..."}
											</div>
											<div className="flex items-center justify-between mb-3">
												<span
													className={`px-2 py-1 text-xs font-semibold rounded-lg ${getStatusColor(
														applicant.interview_status
													)}`}
												>
													{applicant.interview_status}
												</span>
											</div>
											<div className="flex gap-2 flex-wrap">
												<button
													onClick={() => handleCopyLink(applicant.id)}
													className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-lg transition-colors flex items-center gap-1"
												>
													<MdContentCopy className="w-3 h-3" />
													Copy Link
												</button>
												<button
													className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded-lg transition-colors"
												>
													Take Interview
												</button>
												<button
													onClick={() => handleEditApplicant(applicant.id)}
													className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
												>
													<FaEdit className="w-4 h-4" />
												</button>
												<button
													onClick={() => handleDelete(applicant.id)}
													className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
												>
													<RiDeleteBin6Line className="w-4 h-4" />
												</button>
											</div>
										</div>
									</div>

									{/* Desktop Layout */}
									<div className="hidden lg:grid lg:grid-cols-12 lg:gap-4 lg:items-center">
										<div className="col-span-2">
											<div className="font-medium text-gray-900">
												{applicant.title} {applicant.firstname} {applicant.surname}
											</div>
										</div>
										<div className="col-span-2">
											<div className="text-gray-500">
												{applicant.email_address}
											</div>
										</div>
										<div className="col-span-1">
											<div className="text-gray-500">
												{applicant.phone_number || "N/A"}
											</div>
										</div>
										<div className="col-span-2">
											<div className="text-gray-500">
												{interview ? interview.title : "Loading..."}
											</div>
										</div>
										<div className="col-span-2">
											<span
												className={`px-3 py-1 text-sm font-semibold rounded-lg ${getStatusColor(
													applicant.interview_status
												)}`}
											>
												{applicant.interview_status}
											</span>
										</div>
										<div className="col-span-3">
											<div className="flex gap-2 items-center flex-wrap">
												<button
													onClick={() => handleCopyLink(applicant.id)}
													className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-lg transition-colors flex items-center gap-1"
												>
													<MdContentCopy className="w-3 h-3" />
													Copy Link
												</button>
												<button
													className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded-lg transition-colors"
												>
													Take Interview
												</button>
												<button
													onClick={() => handleEditApplicant(applicant.id)}
													className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
												>
													<FaEdit className="w-4 h-4 text-black" />
												</button>
												<button
													onClick={() => handleDelete(applicant.id)}
													className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
												>
													<RiDeleteBin6Line className="w-4 h-4 text-black" />
												</button>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					)}

					{/* Empty State */}
					{!isLoading && applicants.length === 0 && (
						<div className="p-8 text-center text-gray-500">
							<p className="mb-4">No applicants added yet</p>
							<button
								onClick={handleAddApplicant}
								className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
							>
								Add Your First Applicant
							</button>
						</div>
					)}
				</div>

				{/* Modal */}
				{modalState.isOpen && (
					<div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
						<div className="bg-white rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl">
							{/* Modal Header */}
							<div className="flex items-center justify-between p-6 border-b border-gray-100">
								<h3 className="text-xl font-bold text-gray-900">
									{modalState.mode === "add"
										? "Add New Applicant"
										: "Edit Applicant"}
								</h3>
								<button
									onClick={handleCloseModal}
									className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
								>
									<IoClose className="w-6 h-6" />
								</button>
							</div>

							{/* Modal Content */}
							<ApplicantForm
								applicantId={
									modalState.mode === "edit" ? modalState.applicantId : null
								}
								interviewId={interviewId}
								onSuccess={handleFormSuccess}
								onCancel={handleCloseModal}
								showAlert={showAlert}
							/>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default ApplicantList;