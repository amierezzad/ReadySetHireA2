import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/common/Header'
// import Footer from './components/common/Footer'
import Home from './pages/Home'
// import Interviews from './pages/Interviews'
// import Questions from './pages/Questions'
// import Applicants from './pages/Applicants'
// import TakeInterview from './pages/TakeInterview'

function App() {
  return (
    <Router>
      <div className="min-vh-100">
        <Header />
        <div className="container-py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/interviews" element={<Interviews />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/applicants" element={<Applicants />} />
            <Route path="/take-interview/:id" element={<TakeInterview />} /> */}
          </Routes>
        </div>
        {/* <Footer /> */}
      </div>
    </Router>
  )
}

export default App