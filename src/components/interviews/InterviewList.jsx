// React Icon import
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoPeopleOutline, IoClose } from "react-icons/io5";
import { PiChatCircleText } from "react-icons/pi";
import { useEffect, useState } from "react";
import { getInterviews, deleteInterview } from "../../services/api";
import InterviewForm from "./InterviewForm";
import Alert from "../common/Alert";
import { useAlert } from "../../hooks/useAlert";
import { Link } from "react-router-dom";

const InterviewList = () => {
	const { alert, showAlert, hideAlert } = useAlert();
	const [interviews, setInterviews] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [modalState, setModalState] = useState({
		isOpen: false,
		mode: null,
		interviewId: null,
	});

	useEffect(() => {
		fetchInterviews();
	}, []);

	const fetchInterviews = async () => {
		try {
			setIsLoading(true);
			console.log("Testing API Calls...");
			const ivdata = await getInterviews();
			console.log("Got response YES", ivdata);
			setInterviews(ivdata || []);
		} catch (error) {
			console.error("API Calls Failed...", error);
			setInterviews([]);
		} finally {
			setIsLoading(false);
		}
	};

	const handleAddInterview = () => {
		setModalState({
			isOpen: true,
			mode: "add",
			interviewId: null,
		});
	};

	const handleEditInterview = (interviewId) => {
		setModalState({
			isOpen: true,
			mode: "edit",
			interviewId: interviewId,
		});
	};

	const handleCloseModal = () => {
		setModalState({
			isOpen: false,
			mode: null,
			interviewId: null,
		});
	};

	const handleFormSuccess = () => {
		fetchInterviews();
		handleCloseModal();
	};

	const handleDeletion = async (interviewId) => {
		if (window.confirm("Are you sure you want to delete this interview?")) {
			try {
				await deleteInterview(interviewId);
				setInterviews(
					interviews.filter((interview) => interview.id !== interviewId)
				);
				console.log("Delete Succeed...");
				showAlert("Interview Deleted Successfully", "warning");
			} catch (error) {
				console.error("Error Delete:", error.message);
				showAlert("Failed to delete interview", "error");
			}
		}
	};

	const getStatusColor = (status) => {
		switch (status) {
			case "Published":
				return "bg-green-100 text-green-800";
			case "Draft":
				return "bg-yellow-100 text-yellow-800";
			case "Archived":
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
				{/* Header Section */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
					<div>
						<h2 className="text-xl font-bold text-gray-900 mb-1">
							Interviews Management
						</h2>
						<p className="text-gray-500 font-medium">
							Manage your interview processes
						</p>
					</div>
					<button
						onClick={handleAddInterview}
						className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2 self-start sm:self-auto"
					>
						<span className="text-lg">+</span>
						Add Interview
					</button>
				</div>

				{/* Loading State */}
				{isLoading && (
					<div className="p-8 text-center text-gray-500">
						<p>Loading interviews...</p>
					</div>
				)}

				{/* Interview Cards - Same as original InterviewCard */}
				{!isLoading && (
					<div className="space-y-4">
						{interviews.map((interview) => (
							<div key={interview.id} className="bg-white shadow-sm rounded-2xl">
								{/* Interview Card */}
								<div className="p-3 sm:p-6">
									<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-0 px-2 sm:px-6">
										{/* Left Section - Interview Info */}
										<div className="flex-shrink-0">
											<h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
												{interview.title}
											</h3>
											<p className="text-gray-500 font-medium mb-3">
												{interview.job_role}
											</p>
											<div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
												<div className="flex items-center gap-2 text-gray-500">
													<PiChatCircleText className="w-6 h-6 text-black" />
													<span className="text-sm sm:text-base">4 Questions</span>
												</div>
												<div className="flex items-center gap-2 text-gray-500">
													<IoPeopleOutline className="w-6 h-6 text-black" />
													<span className="text-sm sm:text-base">4 Applicants</span>
												</div>
											</div>
										</div>

										{/* Middle Section - Progress Boxes */}
										<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 lg:flex-1 lg:justify-center">
											<div className="p-3 sm:p-4 text-center bg-[var(--primary-green-light)] rounded-xl min-w-[80px] sm:min-w-[100px]">
												<div className="font-semibold text-sm sm:text-base">
													Completed
												</div>
												<div className="text-lg sm:text-xl font-bold my-1">2</div>
											</div>
											<div className="p-3 sm:p-4 text-center bg-[var(--primary-purple-light)] rounded-xl min-w-[80px] sm:min-w-[100px]">
												<div className="font-semibold text-sm sm:text-base">
													In Progress
												</div>
												<div className="text-lg sm:text-xl font-bold my-1">1</div>
											</div>
											<div className="p-3 sm:p-4 text-center bg-gray-200 rounded-xl min-w-[80px] sm:min-w-[100px]">
												<div className="font-semibold text-sm sm:text-base">
													Not Started
												</div>
												<div className="text-lg sm:text-xl font-bold my-1">2</div>
											</div>
										</div>

										{/* Right Section - Status and Actions */}
										<div className="flex flex-col sm:items-center flex-row items-start sm:items-center gap-3 sm:gap-4 lg:gap-10 lg:flex-shrink-0">
											<span className={`px-3 py-1 text-sm sm:text-base font-semibold rounded-lg ${getStatusColor(interview.status)}`}>
												{interview.status}
											</span>

											<div className="flex flex-col gap-2">
												<Link to={`applicants/${interview.id}`}>
													<button className="flex items-center gap-2 px-3 py-1 text-black font-bold hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors text-sm sm:text-base">
														<IoPeopleOutline className="w-6 h-6 text-black" />
														<span>Applicants</span>
													</button>
												</Link>
												<Link to={`questions/${interview.id}`}>
													<button className="flex items-center gap-2 px-3 py-1 text-black font-bold hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors text-sm sm:text-base">
														<PiChatCircleText className="w-6 h-6 text-black" />
														<span>Questions</span>
													</button>
												</Link>
											</div>

											<div className="flex gap-3 sm:justify-center gap-4">
												<button
													onClick={() => handleEditInterview(interview.id)}
													className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
												>
													<FaEdit className="w-6 h-6 text-black" />
												</button>
												<button
													onClick={() => handleDeletion(interview.id)}
													className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
												>
													<RiDeleteBin6Line className="w-6 h-6 text-black" />
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				)}

				{/* Empty State */}
				{!isLoading && interviews.length === 0 && (
					<div className="p-8 text-center text-gray-500 bg-white rounded-2xl">
						<p className="mb-4">No interviews created yet</p>
						<button
							onClick={handleAddInterview}
							className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
						>
							Create Your First Interview
						</button>
					</div>
				)}

				{/* Modal */}
				{modalState.isOpen && (
					<div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
						<div className="bg-white rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl">
							{/* Modal Header */}
							<div className="flex items-center justify-between p-6 border-b border-gray-100">
								<h3 className="text-xl font-bold text-gray-900">
									{modalState.mode === "add"
										? "Create New Interview"
										: "Edit Interview"}
								</h3>
								<button
									onClick={handleCloseModal}
									className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
								>
									<IoClose className="w-6 h-6" />
								</button>
							</div>

							{/* Modal Content */}
							<InterviewForm
								interviewId={
									modalState.mode === "edit" ? modalState.interviewId : null
								}
								onSuccess={handleFormSuccess}
								onCancel={handleCloseModal}
								showAlert={showAlert}
								isModal={true}
							/>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default InterviewList;