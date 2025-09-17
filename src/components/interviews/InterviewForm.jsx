const InterviewForm = () => {
	return (
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
				<form className="space-y-6">
					{/* Title Field */}
					<div>
						<label className="block text-sm font-semibold text-gray-900 mb-2">
							Title *
						</label>
						<input
							type="text"
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
							placeholder="Enter interview title"
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
						/>
					</div>

					{/* Status Field */}
					<div>
						<label className="block text-sm font-semibold text-gray-900 mb-2">
							Status *
						</label>
						<select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
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
	);
};

export default InterviewForm;
