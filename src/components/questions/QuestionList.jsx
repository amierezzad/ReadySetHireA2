// React Icon imports
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoArrowBack, IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getQuestions, deleteQuestion, getInterview } from "../../services/api";
import QuestionForm from "./QuestionForm";
import Alert from "../common/Alert";
import { useAlert } from "../../hooks/useAlert";
const QuestionList = () => {
	const { alert, showAlert, hideAlert } = useAlert();

	const { interviewId } = useParams();

	const [questions, setQuestions] = useState([]);
	const [interview, setInterview] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [modalState, setModalState] = useState({
		isOpen: false,
		mode: null,
		questionId: null,
	});

	useEffect(() => {
		if (interviewId) {
			fetchInterviewData();
			fetchQuestions();
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

	const fetchQuestions = async () => {
		try {
			setIsLoading(true);
			const questionsData = await getQuestions(interviewId);
			setQuestions(questionsData || []);
		} catch (error) {
			console.error("Failed to fetch questions:", error);
			setQuestions([]);
		} finally {
			setIsLoading(false);
		}
	};

	const handleAddQuestion = () => {
		setModalState({
			isOpen: true,
			mode: "add",
			questionId: null,
		});
	};

	const handleEditQuestion = (questionId) => {
		setModalState({
			isOpen: true,
			mode: "edit",
			questionId: questionId,
		});
	};

	const handleCloseModal = () => {
		setModalState({
			isOpen: false,
			mode: null,
			questionId: null,
		});
	};

	const handleFormSuccess = () => {
		fetchQuestions();
		handleCloseModal();
	};

	const handleDelete = async (questionId) => {
		if (window.confirm("Are you sure you want to delete this question?")) {
			try {
				await deleteQuestion(questionId);
				setQuestions(questions.filter((q) => q.id !== questionId));
				showAlert("Question deleted successfully!", "warning");
			} catch (error) {
				console.error("Failed to delete question:", error);
			}
		}
	};

	const getDifficultyColor = (difficulty) => {
		switch (difficulty) {
			case "Easy":
				return "bg-blue-100 text-blue-800";
			case "Intermediate":
				return "bg-orange-100 text-orange-800";
			case "Advanced":
				return "bg-red-100 text-red-800";
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
									Questions Management
								</h2>
								<p className="text-gray-500 font-medium">
									Interview: {interview ? interview.title : "Loading..."}
								</p>
							</div>
							<button
								onClick={handleAddQuestion}
								className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2 self-start sm:self-auto"
							>
								<span className="text-lg">+</span>
								Add Question
							</button>
						</div>
					</div>

					{/* Loading State */}
					{isLoading && (
						<div className="p-8 text-center text-gray-500">
							<p>Loading questions...</p>
						</div>
					)}

					{/* Table Header */}
					{!isLoading && questions.length > 0 && (
						<div className="hidden md:block">
							<div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 font-semibold text-gray-700 text-sm">
								<div className="col-span-5">Question</div>
								<div className="col-span-3">Interview</div>
								<div className="col-span-2">Difficulty</div>
								<div className="col-span-2">Actions</div>
							</div>
						</div>
					)}

					{/* Questions List */}
					{!isLoading && (
						<div className="divide-y divide-gray-100">
							{questions.map((question) => (
								<div key={question.id} className="p-4 sm:p-6">
									{/* Mobile Layout */}
									<div className="md:hidden space-y-3">
										<div>
											<div className="font-medium text-gray-900 mb-2">
												{question.question}
											</div>
											<div className="text-sm text-gray-500 mb-2">
												{interview ? interview.title : "Loading..."}
											</div>
											<div className="flex items-center justify-between">
												<span
													className={`px-2 py-1 text-xs font-semibold rounded-lg ${getDifficultyColor(
														question.difficulty
													)}`}
												>
													{question.difficulty}
												</span>
												<div className="flex gap-2">
													<button
														onClick={() => handleEditQuestion(question.id)}
														className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
													>
														<FaEdit className="w-4 h-4" />
													</button>
													<button
														onClick={() => handleDelete(question.id)}
														className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
													>
														<RiDeleteBin6Line className="w-4 h-4" />
													</button>
												</div>
											</div>
										</div>
									</div>

									{/* Desktop Layout */}
									<div className="hidden md:grid md:grid-cols-12 md:gap-4 md:items-center">
										<div className="col-span-5">
											<div className="font-medium text-gray-900">
												{question.question}
											</div>
										</div>
										<div className="col-span-3">
											<div className="text-gray-500">
												{interview ? interview.title : "Loading..."}
											</div>
										</div>
										<div className="col-span-2">
											<span
												className={`px-3 py-1 text-sm font-semibold rounded-lg ${getDifficultyColor(
													question.difficulty
												)}`}
											>
												{question.difficulty}
											</span>
										</div>
										<div className="col-span-2">
											<div className="flex gap-2">
												<button
													onClick={() => handleEditQuestion(question.id)}
													className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
												>
													<FaEdit className="w-4 h-4 text-black" />
												</button>
												<button
													onClick={() => handleDelete(question.id)}
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
					{!isLoading && questions.length === 0 && (
						<div className="p-8 text-center text-gray-500">
							<p className="mb-4">No questions added yet</p>
							<button
								onClick={handleAddQuestion}
								className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
							>
								Add Your First Question
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
										? "Add New Question"
										: "Edit Question"}
								</h3>
								<button
									onClick={handleCloseModal}
									className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
								>
									<IoClose className="w-6 h-6" />
								</button>
							</div>

							{/* Modal Content */}
							<QuestionForm
								questionId={
									modalState.mode === "edit" ? modalState.questionId : null
								}
								interviewId={interviewId}
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

export default QuestionList;
