import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Home from "./pages/Home";

function App() {
	return (
		<Router>
			<div className="min-h-screen bg-[var(--light-gray)]">
				<Header />
				<div className="mx-3 py-1">
					<Routes>
						<Route path="/" element={<Home />} />
					</Routes>
				</div>
				{/* <Footer /> */}
			</div>
		</Router>
	);
}

export default App;
