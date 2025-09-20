import { useState } from "react";
import InterviewList from "../components/interviews/InterviewList";

const FilterSelect = () => {
	return (
		<select
			defaultValue="Filter"
			className="select w-full sm:w-auto min-w-[150px] bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
		>
			<option disabled={true}>Filter by Status</option>
			<option>Published</option>
			<option>Draft</option>
			<option>Archived</option>
		</select>
	);
};

const SortSelect = () => {
	return (
		<select
			defaultValue="Sort"
			className="select w-full sm:w-auto min-w-[150px] bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
		>
			<option disabled={true}>Sort by</option>
			<option>Latest</option>
			<option>Oldest</option>
			<option>A-Z</option>
			<option>Z-A</option>
		</select>
	);
};

const StatusSelect = () => {
	return (
		<select
			defaultValue="Status"
			className="select w-full sm:w-auto min-w-[150px] bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
		>
			<option disabled={true}>Filter by Progress</option>
			<option>Completed</option>
			<option>Not Started</option>
		</select>
	);
};

function Home() {
	return (
		<div className="bg-[var(--light-gray)]">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
				{/* Dashboard Stats Section */}
				<div className="mb-6">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
						{/* Total Interviews */}
						<div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm font-medium text-gray-500 mb-1">
										Total Interviews
									</p>
									<p className="text-2xl font-bold text-gray-900">12</p>
								</div>
								<div className="p-3 bg-purple-100 rounded-full">
									<svg
										className="w-6 h-6 text-purple-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
										/>
									</svg>
								</div>
							</div>
						</div>

						{/* Active Interviews */}
						<div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm font-medium text-gray-500 mb-1">
										Published
									</p>
									<p className="text-2xl font-bold text-green-600">8</p>
								</div>
								<div className="p-3 bg-green-100 rounded-full">
									<svg
										className="w-6 h-6 text-green-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</div>
							</div>
						</div>

						{/* Total Applicants */}
						<div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm font-medium text-gray-500 mb-1">
										Total Applicants
									</p>
									<p className="text-2xl font-bold text-blue-600">47</p>
								</div>
								<div className="p-3 bg-blue-100 rounded-full">
									<svg
										className="w-6 h-6 text-blue-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
										/>
									</svg>
								</div>
							</div>
						</div>

						{/* Completion Rate */}
						<div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm font-medium text-gray-500 mb-1">
										Completion Rate
									</p>
									<p className="text-2xl font-bold text-orange-600">73%</p>
								</div>
								<div className="p-3 bg-orange-100 rounded-full">
									<svg
										className="w-6 h-6 text-orange-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
										/>
									</svg>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Filter Controls */}
				<div className="mb-6">
					<div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border border-gray-100">
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-1">
									Filter & Sort
								</h3>
								<p className="text-sm text-gray-500">
									Customize your interview view
								</p>
							</div>
							<div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
								<FilterSelect />
								<StatusSelect />
								<SortSelect />
							</div>
						</div>
					</div>
				</div>

				{/* Interview List */}
				<div>
					<InterviewList />
				</div>
			</div>
		</div>
	);
}

export default Home;
