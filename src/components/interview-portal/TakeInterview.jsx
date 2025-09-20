import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import AudioRecorder from "./AudioRecorder";
import Alert from "../common/Alert";
import { useAlert } from "../../hooks/useAlert";
import { getInterview, getApplicant, getQuestions } from "../../services/api";

const TakeInterview = () => {
	const { alert, showAlert, hideAlert } = useAlert();
	const { interviewId, applicantId } = useParams();

	// State management
	const [interview, setInterview] = useState(null);
	const [applicant, setApplicant] = useState(null);
	const [questions, setQuestions] = useState([]);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [answers, setAnswers] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [interviewStarted, setInterviewStarted] = useState(false);
	const [interviewCompleted, setInterviewCompleted] = useState(false);

	useEffect(() => {
		if (interviewId && applicantId) {
			fetchTakeInterviewData();
		}
	}, [interviewId, applicantId]);

	const fetchTakeInterviewData = async () => {
		try {
			const interviewData = await getInterview(interviewId);
			const applicantData = await getApplicant(applicantId);
			const questionData = await getQuestions(interviewId);
			if (interviewData && interviewData[0]) {
				setInterview(interviewData[0]);
			}
			if (applicantData && applicantData[0]) {
				setApplicant(applicantData[0]);
			}
			if (questionData && questionData.length > 0) {
				setQuestions(questionData);
			}
		} catch (error) {
			console.error("Failed to fetch interview data:", error);
			showAlert("Failed to load interview data", "error");
		} finally {
			setIsLoading(false);
		}
	};

	const handleStartInterview = () => {
		setInterviewStarted(true);
		showAlert(
			"Interview started! Please answer each question using the audio recorder.",
			"info"
		);
	};

	const handleNextQuestion = () => {
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		} else {
			// Complete interview
			setInterviewCompleted(true);
			showAlert(
				"Interview completed successfully! Thank you for your time.",
				"success"
			);
		}
	};

	const handleAudioSubmit = (audioData, transcription) => {
		// Save answer for current question
		setAnswers({
			...answers,
			[questions[currentQuestionIndex].id]: {
				audio: audioData,
				transcription: transcription,
			},
		});
		showAlert("Answer recorded successfully!", "success");
	};

	const currentQuestion = questions[currentQuestionIndex];
	const progress =
		questions.length > 0
			? ((currentQuestionIndex + 1) / questions.length) * 100
			: 0;

	if (isLoading) {
		return (
			<div className="min-h-screen bg-[var(--light-gray)] flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
					<p className="text-gray-600">Loading interview...</p>
				</div>
			</div>
		);
	}

	return (
		<>
			<Alert
				show={alert.show}
				type={alert.type}
				message={alert.message}
				onClose={hideAlert}
			/>

			<div className="bg-[var(--light-gray)] py-6">
				<div className="max-w-4xl mx-auto px-4">
					{/* Welcome Screen */}
					{!interviewStarted && !interviewCompleted && (
						<div className="bg-white shadow-sm rounded-2xl p-8">
							<div className="text-center mb-8">
								<h1 className="text-3xl font-bold text-gray-900 mb-4">
									Welcome to Your Interview
								</h1>
								<div className="w-24 h-1 bg-purple-500 mx-auto rounded-full"></div>
							</div>

							<div className="space-y-6">
								{/* Applicant Details */}
								<div className="bg-gray-50 rounded-xl p-6">
									<h2 className="text-xl font-bold text-gray-900 mb-4">
										Applicant Details:
									</h2>
									<div className="space-y-2">
										<p className="text-gray-700">
											<span className="font-semibold">Name:</span>{" "}
											{applicant?.title} {applicant?.firstname}{" "}
											{applicant?.surname}
										</p>
										<p className="text-gray-700">
											<span className="font-semibold">Email:</span>{" "}
											{applicant?.email_address}
										</p>
									</div>
								</div>

								{/* Interview Details */}
								<div className="bg-gray-50 rounded-xl p-6">
									<h2 className="text-xl font-bold text-gray-900 mb-4">
										Interview:
									</h2>
									<div className="space-y-2">
										<p className="text-gray-700">
											<span className="font-semibold">Title:</span>{" "}
											{interview?.title}
										</p>
										<p className="text-gray-700">
											<span className="font-semibold">Description:</span>{" "}
											{interview?.description}
										</p>
										<p className="text-gray-700">
											<span className="font-semibold">Total Questions:</span>{" "}
											{questions.length}
										</p>
									</div>
								</div>

								{/* Instructions */}
								<div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-6">
									<h3 className="text-lg font-semibold text-blue-900 mb-3">
										Interview Instructions:
									</h3>
									<ul className="space-y-2 text-blue-800">
										<li className="flex items-start">
											<span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
											You will be presented with one question at a time
										</li>
										<li className="flex items-start">
											<span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
											Use the audio recorder to answer each question
										</li>
										<li className="flex items-start">
											<span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
											You cannot return to previous questions
										</li>
										<li className="flex items-start">
											<span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
											Take your time to provide thoughtful answers
										</li>
									</ul>
								</div>

								{/* Start Button */}
								<div className="text-center pt-4">
									<button
										onClick={handleStartInterview}
										className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-4 px-8 rounded-lg transition-colors text-lg"
									>
										Start Interview
									</button>
								</div>
							</div>
						</div>
					)}

					{/* Question Screen */}
					{interviewStarted && !interviewCompleted && currentQuestion && (
						<div className="bg-white shadow-sm rounded-2xl overflow-hidden">
							{/* Progress Header */}
							<div className="bg-gray-50 p-6 border-b border-gray-100">
								<div className="flex items-center justify-between mb-4">
									<h2 className="text-xl font-bold text-gray-900">
										Question {currentQuestionIndex + 1} of {questions.length}
									</h2>
									<span
										className={`px-3 py-1 text-sm font-semibold rounded-lg ${
											currentQuestion.difficulty === "Easy"
												? "bg-green-100 text-green-800"
												: currentQuestion.difficulty === "Intermediate"
												? "bg-yellow-100 text-yellow-800"
												: "bg-red-100 text-red-800"
										}`}
									>
										{currentQuestion.difficulty}
									</span>
								</div>

								{/* Progress Bar */}
								<div className="w-full bg-gray-200 rounded-full h-2">
									<div
										className="bg-purple-500 h-2 rounded-full transition-all duration-300"
										style={{ width: `${progress}%` }}
									></div>
								</div>
								<p className="text-sm text-gray-600 mt-2">
									{Math.round(progress)}% Complete
								</p>
							</div>

							{/* Question Content */}
							<div className="p-8">
								<div className="mb-8">
									<h3 className="text-2xl font-bold text-gray-900 mb-4">
										{currentQuestion.question}
									</h3>
									<p className="text-gray-600">
										Please record your answer using the audio recorder below.
										You can pause and resume recording as needed.
									</p>
								</div>

								{/* Audio Recorder */}
								<div className="mb-8">
									{/* <AudioRecorder
										onAudioSubmit={handleAudioSubmit}
										questionId={currentQuestion.id}
									/> */}
								</div>

								{/* Next Button */}
								<div className="flex justify-between items-center">
									<p className="text-sm text-gray-500">
										Note: You cannot return to previous questions
									</p>
									<button
										onClick={handleNextQuestion}
										disabled={!answers[currentQuestion.id]}
										className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
									>
										{currentQuestionIndex === questions.length - 1
											? "Complete Interview"
											: "Next Question"}
									</button>
								</div>
							</div>
						</div>
					)}

					{/* Completion Screen */}
					{interviewCompleted && (
						<div className="bg-white shadow-sm rounded-2xl p-8 text-center">
							<div className="mb-8">
								<div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
									<svg
										className="w-10 h-10 text-green-500"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</div>
								<h1 className="text-3xl font-bold text-gray-900 mb-4">
									Thank You for Completing the Interview!
								</h1>
								<p className="text-lg text-gray-600 mb-6">
									Your responses have been recorded successfully. We will review
									your answers and get back to you soon.
								</p>
							</div>

							<div className="bg-gray-50 rounded-xl p-6 mb-6">
								<h3 className="text-lg font-semibold text-gray-900 mb-3">
									Interview Summary
								</h3>
								<div className="space-y-2 text-gray-700">
									<p>
										<span className="font-semibold">Interview:</span>{" "}
										{interview?.title}
									</p>
									<p>
										<span className="font-semibold">Questions Answered:</span>{" "}
										{questions.length}
									</p>
									<p>
										<span className="font-semibold">Status:</span>{" "}
										<span className="text-green-600 font-semibold">
											Completed
										</span>
									</p>
								</div>
							</div>

							<p className="text-sm text-gray-500">
								You may now close this window. Our team will be in touch with
								you regarding the next steps.
							</p>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default TakeInterview;
