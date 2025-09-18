import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import InterviewList from "./components/interviews/InterviewList";
import QuestionList from "./components/questions/QuestionList";
import ApplicantList from "./components/applicants/ApplicantList";
function App() {
	return (
		<Router>
			<div className="min-h-screen bg-[var(--light-gray)] flex flex-col">
				<Header />
				<div className="flex-t mx-3 py-1">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/interview/:interviewId" element={<InterviewList />}/>
						<Route path="/questions/:interviewId" element={<QuestionList />}/>
						<Route path="applicants/:interviewId" element={<ApplicantList/>}/>
					</Routes>
				</div>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
