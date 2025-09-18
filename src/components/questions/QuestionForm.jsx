import { useState, useEffect } from "react";
import {
	createQuestion,
	getQuestion,
	updateQuestion,
} from "../../services/api";

const QuestionForm = ({
	interviewId,
	questionId,
	onSuccess,
	onCancel,
	isModal = false,
	showAlert,
}) => {
	// Check if in edit mode
	const isEdit = questionId ? true : false;

	const [formData, setFormData] = useState({
		question: "",
		difficulty: "Easy",
	});

	const [isLoading, setIsLoading] = useState(false);

	// Load question data if in edit mode
	useEffect(() => {
		if (isEdit && questionId) {
			const fetchQuestion = async () => {
				try {
					setIsLoading(true);
					const questionData = await getQuestion(questionId);
					if (questionData && questionData[0]) {
						setFormData({
							question: questionData[0].question,
							difficulty: questionData[0].difficulty,
						});
					}
				} catch (error) {
					showAlert("Failed to load question data", "error");
					console.error("Failed to load question data:", error);
				} finally {
					setIsLoading(false);
				}
			};
			fetchQuestion();
		}
	}, [questionId, isEdit]);

	const handleInputChange = (field, value) => {
		setFormData({ ...formData, [field]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setIsLoading(true);

			if (isEdit) {
				// Update existing question
				await updateQuestion(questionId, formData);
				showAlert("Question updated successfully!", "info");

				console.log("Question updated successfully");
			} else {
				// Create new question
				const questionData = {
					...formData,
					interview_id: parseInt(interviewId),
				};
				await createQuestion(questionData);
				showAlert("Question created successfully!", "success ");

				console.log("Question created successfully");
			}

			// Reset form
			setFormData({ question: "", difficulty: "Easy" });

			// Call success callback
			if (onSuccess) {
				onSuccess();
			}
		} catch (error) {
			showAlert(`Failed to ${isEdit ? "update" : "create"} question`, "error");

			console.error(
				`Failed to ${isEdit ? "update" : "create"} question:`,
				error
			);
		} finally {
			setIsLoading(false);
		}
	};

	const handleCancel = () => {
		// Reset form
		setFormData({ question: "", difficulty: "Easy" });

		// Call cancel callback
		if (onCancel) {
			onCancel();
		}
	};

	if (isLoading && isEdit) {
		return (
			<div className="p-6">
				<p className="text-center text-gray-500">Loading question...</p>
			</div>
		);
	}

	return (
		<div className="p-6">
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block text-sm font-semibold text-gray-900 mb-2">
						Question *
					</label>
					<textarea
						rows="3"
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
						placeholder="Enter your interview question"
						value={formData.question}
						onChange={(e) => handleInputChange("question", e.target.value)}
						required
					/>
				</div>

				<div>
					<label className="block text-sm font-semibold text-gray-900 mb-2">
						Difficulty *
					</label>
					<select
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
						value={formData.difficulty}
						onChange={(e) => handleInputChange("difficulty", e.target.value)}
						required
					>
						<option value="Easy">Easy</option>
						<option value="Intermediate">Intermediate</option>
						<option value="Advanced">Advanced</option>
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
							? "Update Question"
							: "Create Question"}
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

export default QuestionForm;
