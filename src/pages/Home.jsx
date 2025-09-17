import { useState } from "react";
import InterviewCard from "../components/interviews/InterviewCard";
import { Link, useLocation } from "react-router-dom";

const FilterSelect = () => {
	return (
		<select
			defaultValue="Filter"
			className="select w-3/4 ml-2 bg-gray-900 text-white border-gray-700 p-1 shadow-lg rounded-lg"
		>
			<option disabled={true}>Filter</option>
			<option>Published</option>
			<option>Draft</option>
			<option>Completed</option>
			<option>In Progress</option>
			<option>Not Started</option>
		</select>
	);
};
const SortSelect = () => {
	return (
		<select
			defaultValue="Sort"
			className="select mr-3 w-1/4 bg-gray-900 text-white border-gray-700 p-1 shadow-lg rounded-lg"
		>
			<option disabled={true}>Sort</option>
			<option>Latest</option>
			<option>Oldest</option>
		</select>
	);
};

// Sort Dropdown Component
const SortDropdown = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-3 font-medium rounded-xl transition-colors flex items-center gap-2"
			>
				Sort
				<span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
					▼
				</span>
			</button>

			{isOpen && (
				<div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
					<div className="p-2">
						{/* Add your sort options here */}
						<div className="text-gray-600 text-sm p-2">
							Sort options will go here
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
function Home() {
	return (
		<div className="px-6">
			{/* Page Header */}
			<div className="bg-white shadow-lg mb-6 rounded-2xl">
				<div className="p-2 flex justify-between items-center">
					<div className="text-center flex-1">
						<h1 className="text-2xl font-bold text-gray-900 mb-2">
							Interviews Overview
						</h1>
						<p className="text-gray-500">Manage your interview campaign</p>
					</div>
					<button className="bg-[var(--primary-purple)] hover:bg-purple-400 text-black px-3 py-2 font-bold rounded-full transition-colors">
						<Link to="add-interview">Add Interview</Link>
					</button>
				</div>
			</div>

			{/* Filters */}
			<div className="flex gap-3 mb-6">
				<FilterSelect />
				<SortSelect />
			</div>

			{/* Interview Card */}
			<div className="py-6">
				<InterviewCard />
			</div>
		</div>
	);
}

export default Home;
