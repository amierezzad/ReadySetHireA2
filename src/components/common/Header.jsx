import Navigation from "./Navigation";

function Header() {
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

					{/* Navigation Component */}
					<Navigation />
				</div>
			</div>
		</header>
	);
}

export default Header;