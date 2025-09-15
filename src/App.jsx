import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Home from "./pages/Home";

function App() {
	return (
		<Router>
			<div className="min-h-screen">
				<Header />
				<div className="container mx-auto py-4">
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
