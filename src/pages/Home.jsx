function Home() {
	return (
		<div className="container mx-auto px-4">
			{/* Page Header */}
			<div className="bg-white shadow-sm mb-6 rounded-2xl">
				<div className="p-6 flex justify-between items-center">
					<div>
						<h1 className="text-2xl font-bold text-gray-900 mb-2">
							Interviews Overview
						</h1>
						<p className="text-gray-500 mb-0">
							Manage your interview campaigns
						</p>
					</div>
					<button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 font-semibold rounded-lg transition-colors">
						Add Interview
					</button>
				</div>
			</div>

			{/* Filters */}
			<div className="flex gap-3 mb-6">
				<button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 font-medium rounded-xl transition-colors">
					Filter ▼
				</button>
				<button className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-3 font-medium rounded-xl transition-colors">
					Sort ▼
				</button>
			</div>

			{/* Interview Cards */}
			<div className="space-y-6">
				{/* Frontend Developer Interview Card */}
				<div className="w-full">
					<div className="bg-white shadow-sm rounded-2xl">
						<div className="p-6">
							{/* Card Header */}
							<div className="flex justify-between items-start mb-4">
								<div className="flex-grow">
									<h3 className="text-xl font-bold text-gray-900 mb-1">
										Frontend Developer Interview
									</h3>
									<p className="text-gray-500 font-medium mb-2">
										Frontend Developer
									</p>
									<p className="text-gray-400 text-sm mb-0">
										React specialist with 3+ years experience
									</p>
								</div>
								<div className="flex items-start gap-2">
									<span className="bg-green-100 text-green-800 px-3 py-2 text-xs uppercase font-semibold rounded-lg">
										Published
									</span>
									<div className="flex gap-1">
										<button className="border border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-700 p-2 rounded-lg transition-colors">
											✏️
										</button>
										<button className="border border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-700 p-2 rounded-lg transition-colors">
											🗑️
										</button>
									</div>
								</div>
							</div>

							{/* Stats */}
							<div className="flex gap-6 mb-4">
								<div className="flex items-center gap-2 text-gray-500">
									<span>📝</span>
									<span>2 Questions</span>
								</div>
								<div className="flex items-center gap-2 text-gray-500">
									<span>👥</span>
									<span>3 Participants</span>
								</div>
							</div>

							{/* Progress Boxes */}
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
								<div className="p-4 text-center bg-green-50 border border-green-200 rounded-xl">
									<div className="text-2xl font-bold mb-1 text-green-800">
										1
									</div>
									<div className="font-semibold text-sm text-green-700">
										Completed
									</div>
								</div>
								<div className="p-4 text-center bg-purple-50 border border-purple-200 rounded-xl">
									<div className="text-2xl font-bold mb-1 text-purple-800">
										1
									</div>
									<div className="font-semibold text-sm text-purple-700">
										In Progress
									</div>
								</div>
								<div className="p-4 text-center bg-gray-50 border border-gray-200 rounded-xl">
									<div className="text-2xl font-bold mb-1 text-gray-800">1</div>
									<div className="font-semibold text-sm text-gray-700">
										Not Started
									</div>
								</div>
							</div>

							{/* Action Tabs */}
							<div className="flex gap-3 pt-4 border-t border-gray-200">
								<button className="bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 flex items-center gap-2 px-4 py-2 rounded-lg transition-colors">
									<span>📝</span>
									<span className="text-sm">Questions (2)</span>
								</button>
								<button className="bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 flex items-center gap-2 px-4 py-2 rounded-lg transition-colors">
									<span>👥</span>
									<span className="text-sm">Participants (3)</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
