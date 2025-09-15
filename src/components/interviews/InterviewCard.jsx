function InterviewCard() {
	return (
		<div className="bg-white shadow-sm rounded-2xl">
			{/* Interview Card */}
			<div className="p-3 sm:p-6">
				<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-0 px-2 sm:px-6">
					{/* Left Section - Interview Info */}
					<div className="flex-shrink-0">
						<h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
							Frontend Developer Interview
						</h3>
						<p className="text-gray-500 font-medium mb-3">Frontend developer</p>
						<div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
							<div className="flex items-center gap-2 text-gray-500">
								<span>📝</span>
								<span className="text-sm sm:text-base">4 Questions</span>
							</div>
							<div className="flex items-center gap-2 text-gray-500">
								<span>👥</span>
								<span className="text-sm sm:text-base">4 Applicants</span>
							</div>
						</div>
					</div>

					{/* Middle Section - Progress Boxes */}
					<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 lg:flex-1 lg:justify-center">
						<div className="p-3 sm:p-4 text-center bg-[var(--primary-green-light)] rounded-xl min-w-[80px] sm:min-w-[100px]">
							<div className="font-semibold text-sm sm:text-base text-black-700">
								Completed
							</div>
							<div className="text-lg sm:text-xl font-bold my-1 text-black-800">
								2
							</div>
						</div>
						<div className="p-3 sm:p-4 text-center bg-[var(--primary-purple-light)] rounded-xl min-w-[80px] sm:min-w-[100px]">
							<div className="font-semibold text-sm sm:text-base text-black-700">
								In Progress
							</div>
							<div className="text-lg sm:text-xl font-bold my-1 text-black-800">
								1
							</div>
						</div>
						<div className="p-3 sm:p-4 text-center bg-gray-200 rounded-xl min-w-[80px] sm:min-w-[100px]">
							<div className="font-semibold text-sm sm:text-base text-black-700">
								Not Started
							</div>
							<div className="text-lg sm:text-xl font-bold my-1 text-black-800">
								2
							</div>
						</div>
					</div>

					{/* Right Section - Status and Actions */}
					<div className="flex flex-col sm:items-center flex-row items-start sm:items-center gap-3 sm:gap-4 lg:gap-10 lg:flex-shrink-0">
						<span className="bg-green-100 text-green-800 px-3 py-1 text-sm sm:text-base font-semibold rounded-lg">
							Published
						</span>

						<div className="flex flex-col gap-2">
							<button className="flex items-center gap-2 px-3 py-1 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors text-sm sm:text-base">
								<span>👥</span>
								<span>Applicants</span>
							</button>
							<button className="flex items-center gap-2 px-3 py-1 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors text-sm sm:text-base">
								<span>📝</span>
								<span>Questions</span>
							</button>
						</div>

						<div className="flex gap-3 sm:justify-center gap-4">
							<button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
								✏️
							</button>
							<button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
								🗑️
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default InterviewCard;
