// React Icon import
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoPeopleOutline } from "react-icons/io5";
import { PiChatCircleText } from "react-icons/pi";
import { useEffect, useState } from "react";
import { getInterviews, deleteInterview } from "../../services/api";
import Alert from "../common/Alert";
import { useAlert } from "../../hooks/useAlert";
import { Link } from "react-router-dom";

// API calls
const InterviewCard = () => {
	const { alert, showAlert, hideAlert } = useAlert();
	const [interviews, setInterviews] = useState([]);
	const [isDelete, setDelete] = useState(false); // add later refinement

	useEffect(() => {
		const fetchData = async () => {
			try {
				console.log("Testing API Calls...");
				const ivdata = await getInterviews();
				console.log("Got response YES", ivdata);
				setInterviews(ivdata);
			} catch (error) {
				console.error("API Calls Failed...");
			}
		};
		fetchData();
	}, []);

	const handleDeletion = async (interviewId) => {
		try {
			await deleteInterview(interviewId);
			setDelete(true);
			// todo - handle removed id from the array
			setInterviews(
				interviews.filter((interview) => interview.id !== interviewId)
			);
			console.log("Delete Succeed...");
			if (isDelete) {
				showAlert("Interview Deleted Successfully", "warning");
			}
		} catch (error) {
			console.error("Error Delete:", error.message);
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
											<PiChatCircleText className="w-6 h-6 text-black" />{" "}
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
									<span className="bg-green-100 text-green-800 px-3 py-1 text-sm sm:text-base font-semibold rounded-lg">
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
										<Link to={`interview/edit/${interview.id}`}>
											<button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors">
												<FaEdit className="w-6 h-6 text-black" />
											</button>
										</Link>
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
		</>
	);
};
export default InterviewCard;
