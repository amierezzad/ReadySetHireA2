import { Link, useLocation } from "react-router-dom";

function Header() {
	const location = useLocation();

	// Helper function to check if link is active
	const isActive = (path) => {
		return location.pathname === path;
	};

	return (
		<header className="mx-3 mb-1">
			<div className="bg-[var(--light-gray)] rounded-full px-6 py-5">
				<div className="flex justify-between items-center">
					{/* Logo */}
					<div className="text-gray-700 font-medium flex items-center justify-center flex-1">
						<h1 className="font-bold text-lg text-[var(--dark-green)]">
							ReadySetHire - Smart. Simple. Scalable.
						</h1>
					</div>

					{/* Navigation Pills */}
					<nav className="flex bg-white shadow-lg rounded-full p-2 space-x-1">
						<Link
							to="/take-interview"
							className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-200 flex items-center justify-center ${
								isActive("/take-interview")
									? "bg-[var(--primary-green)] text-black shadow-sm"
									: "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
							}`}
						>
							Take Interview
						</Link>
						<Link
							to="/questions"
							className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-200 flex items-center justify-center ${
								isActive("/questions")
									? "bg-[var(--primary-green)] text-black shadow-sm"
									: "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
							}`}
						>
							Question
						</Link>
						<Link
							to="/"
							className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-200 flex items-center justify-center ${
								isActive("/")
									? "bg-[var(--primary-green)] text-black shadow-sm"
									: "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
							}`}
						>
							Home
						</Link>
						<Link
							to="/add-interview"
							className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-200 flex items-center justify-center ${
								isActive("/add-interview")
									? "bg-[var(--primary-green)] text-black shadow-sm"
									: "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
							}`}
						>
							Interviews
						</Link>
						<Link
							to="/applicants"
							className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-200 flex items-center justify-center ${
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
