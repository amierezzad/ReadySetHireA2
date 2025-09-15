import { Link, useLocation } from "react-router-dom";

function Header() {
	const location = useLocation();

	// Helper function to check if link is active
	const isActive = (path) => {
		return location.pathname === path;
	};

	return (
		<header className="mx-3 mt-3 mb-6">
			<div className="bg-white rounded-full px-6 py-3">
				<div className="flex justify-between items-center">
					{/* Logo */}
					<div className="text-gray-700 font-medium flex items-center justify-center flex-1">
						<h3 className="font-bold text-lg">
							ReadySetHire - Smart. Simple. Scalable.
						</h3>
					</div>

					{/* Navigation Pills */}
					<nav className="flex bg-gray-100 rounded-full p-1 space-x-1">
						<Link
							to="/take-interview"
							className={`px-8 py-2 rounded-full text-sm font-bold transition-all duration-200 flex items-center justify-center whitespace-nowrap ${
								isActive("/take-interview")
									? "bg-[var(--primary-green)] text-black shadow-sm"
									: "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
							}`}
						>
							Take Interview
						</Link>
						<Link
							to="/questions"
							className={`px-8 py-2 rounded-full text-sm font-bold transition-all duration-200 flex items-center justify-center whitespace-nowrap ${
								isActive("/questions")
									? "bg-[var(--primary-green)] text-black shadow-sm"
									: "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
							}`}
						>
							Question
						</Link>
						<Link
							to="/"
							className={`px-8 py-2 rounded-full text-sm font-bold transition-all duration-200 flex items-center justify-center whitespace-nowrap ${
								isActive("/")
									? "bg-[var(--primary-green)] text-black shadow-sm"
									: "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
							}`}
						>
							Home
						</Link>
						<Link
							to="/interviews"
							className={`px-8 py-2 rounded-full text-sm font-bold transition-all duration-200 flex items-center justify-center whitespace-nowrap ${
								isActive("/interviews")
									? "bg-[var(--primary-green)] text-black shadow-sm"
									: "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
							}`}
						>
							Interviews
						</Link>
						<Link
							to="/applicants"
							className={`px-8 py-2 rounded-full text-sm font-bold transition-all duration-200 flex items-center justify-center whitespace-nowrap ${
								isActive("/applicants")
									? "bg-[var(--primary-green)] text-black shadow-sm"
									: "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
							}`}
						>
							Applicant
						</Link>
					</nav>
				</div>
			</div>
		</header>
	);
}

export default Header;
