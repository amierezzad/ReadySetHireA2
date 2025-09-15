import { Link, useLocation } from 'react-router-dom'

function Header() {
  const location = useLocation()
  
  // Helper function to check if link is active
  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  return (
    <nav className="navbar navbar-light bg-white shadow-sm mb-4 mx-3 mt-3" style={{ borderRadius: '16px' }}>
      <div className="container-fluid">
        {/* Logo */}
        <span className="navbar-brand fw-bold fs-4 text-dark mb-0">
          ReadySetHire
          <span className="text-muted fs-6 ms-2">- Smart. Simple. Scalable.</span>
        </span>
        
        {/* Navigation Pills */}
        <ul className="nav nav-pills bg-light p-2 rounded-3">
          <li className="nav-item">
            <Link 
              to="/take-interview" 
              className={`nav-link ${isActive('/take-interview')}`}
            >
              Take Interview
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/questions" 
              className={`nav-link ${isActive('/questions')}`}
            >
              Question
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/')}`}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/interviews" 
              className={`nav-link ${isActive('/interviews')}`}
            >
              Interviews
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/applicants" 
              className={`nav-link ${isActive('/applicants')}`}
            >
              Applicant
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header