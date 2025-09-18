import { Link, useLocation } from "react-router-dom";
import { useState,useEffect } from "react";

function Navigation() {
	const location = useLocation();
	const [isOpen, setIsOpen] = useState(false);

	// Helper function to check if link is active
	const isActive = (path) => {
		return location.pathname === path;
	};

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const closeMenu = () => {
		setIsOpen(false);
	};
    // Disable/enable body scroll when mobile menu opens/closes
useEffect(() => {
	if (isOpen) {
		document.body.style.overflow = 'hidden';
	} else {
		document.body.style.overflow = 'unset';
	}

	// Cleanup function to reset overflow when component unmounts
	return () => {
		document.body.style.overflow = 'unset';
	};
}, [isOpen]);

	return (
		<>
			{/* Desktop Navigation */}
			<nav className="hidden md:flex bg-white shadow-lg rounded-full p-2 space-x-1">
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
					to="/interview"
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

			{/* Mobile Hamburger Menu */}
			<div className="md:hidden relative">
				{/* Hamburger Button */}
				<button
					onClick={toggleMenu}
					className="bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:bg-gray-50"
					aria-label="Toggle menu"
				>
					<div className="w-6 h-6 flex flex-col justify-center items-center">
						<span
							className={`bg-gray-700 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
								isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
							}`}
						></span>
						<span
							className={`bg-gray-700 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
								isOpen ? "opacity-0" : "opacity-100"
							}`}
						></span>
						<span
							className={`bg-gray-700 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
								isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
							}`}
						></span>
					</div>
				</button>
			</div>

			{/* Mobile Full-Screen Overlay Navigation */}
			{isOpen && (
				<div className="md:hidden fixed inset-0 bg-white z-50 overflow-hidden">
					{/* Close Button (X) - positioned absolutely */}
					<button
						onClick={closeMenu}
						className="absolute top-6 right-6 bg-gray-100 hover:bg-gray-200 rounded-full p-3 transition-all duration-200"
						aria-label="Close menu"
					>
						<div className="w-6 h-6 flex flex-col justify-center items-center">
							<span className="bg-gray-700 block h-0.5 w-6 rounded-sm rotate-45 translate-y-0"></span>
							<span className="bg-gray-700 block h-0.5 w-6 rounded-sm -rotate-45 -translate-y-0.5"></span>
						</div>
					</button>

					{/* Full Screen Navigation Links */}
					<div className="flex flex-col justify-start pt-24 px-6 h-full space-y-4">
						<Link
							to="/take-interview"
							onClick={closeMenu}
							className={`w-full px-6 py-4 text-left text-lg font-bold transition-all duration-200 border-b border-gray-100 ${
								isActive("/take-interview")
									? "bg-[var(--primary-green)] text-black shadow-sm rounded-lg border-transparent"
									: "text-gray-700 hover:text-gray-900 hover:bg-[var(--primary-green)] rounded-lg"
							}`}
						>
							Take Interview
						</Link>
						<Link
							to="/questions"
							onClick={closeMenu}
							className={`w-full px-6 py-4 text-left text-lg font-bold transition-all duration-200 border-b border-gray-100 ${
								isActive("/questions")
									? "bg-[var(--primary-green)] text-black shadow-sm rounded-lg border-transparent"
									: "text-gray-700 hover:text-gray-900 hover:bg-[var(--primary-green)] rounded-lg"
							}`}
						>
							Question
						</Link>
						<Link
							to="/"
							onClick={closeMenu}
							className={`w-full px-6 py-4 text-left text-lg font-bold transition-all duration-200 border-b border-gray-100 ${
								isActive("/")
									? "bg-[var(--primary-green)] text-black shadow-sm rounded-lg border-transparent"
									: "text-gray-700 hover:text-gray-900 hover:bg-[var(--primary-green)] rounded-lg"
							}`}
						>
							Home
						</Link>
						<Link
							to="/interview"
							onClick={closeMenu}
							className={`w-full px-6 py-4 text-left text-lg font-bold transition-all duration-200 border-b border-gray-100 ${
								isActive("/add-interview")
									? "bg-[var(--primary-green)] text-black shadow-sm rounded-lg border-transparent"
									: "text-gray-700 hover:text-gray-900 hover:bg-[var(--primary-green)] rounded-lg"
							}`}
						>
							Interviews
						</Link>
						<Link
							to="/applicants"
							onClick={closeMenu}
							className={`w-full px-6 py-4 text-left text-lg font-bold transition-all duration-200 ${
								isActive("/applicants")
									? "bg-[var(--primary-green)] text-black shadow-sm rounded-lg"
									: "text-gray-700 hover:text-gray-900 hover:bg-[var(--primary-green)] rounded-lg"
							}`}
						>
							Applicant
						</Link>
					</div>
				</div>
			)}
		</>
	);
}

export default Navigation;