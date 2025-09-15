import { Link, useLocation } from "react-router-dom";

function Header() {
	const location = useLocation();

	// Helper function to check if link is active
	const isActive = (path) => {
		return location.pathname === path;
	};

	return (
		<nav className="bg-white shadow-sm mb-6 mx-3 mt-3 rounded-2xl">
			<div className="px-6 py-4">
				<div className="flex justify-between items-center">
					{/* Logo */}
					<div className="font-bold text-xl text-gray-900">
						ReadySetHire
						<span className="text-gray-500 text-base ml-2 font-normal">
							- Smart. Simple. Scalable.
						</span>
					</div>

					{/* Navigation Pills */}
					<ul className="flex bg-gray-100 p-2 rounded-xl space-x-1">
						<li>
							<Link
								to="/take-interview"
								className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
									isActive("/take-interview")
										? "bg-white text-blue-600 shadow-sm"
										: "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
								}`}
							>
								Take Interview
							</Link>
						</li>
						<li>
							<Link
								to="/questions"
								className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
									isActive("/questions")
										? "bg-white text-blue-600 shadow-sm"
										: "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
								}`}
							>
								Question
							</Link>
						</li>
						<li>
							<Link
								to="/"
								className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
									isActive("/")
										? "bg-white text-blue-600 shadow-sm"
										: "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
								}`}
							>
								Home
							</Link>
						</li>
						<li>
							<Link
								to="/interviews"
								className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
									isActive("/interviews")
										? "bg-white text-blue-600 shadow-sm"
										: "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
								}`}
							>
								Interviews
							</Link>
						</li>
						<li>
							<Link
								to="/applicants"
								className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
									isActive("/applicants")
										? "bg-white text-blue-600 shadow-sm"
										: "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
								}`}
							>
								Applicant
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Header;
