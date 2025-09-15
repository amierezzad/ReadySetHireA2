function Home() {
  return (
    <div className="container-fluid">
      {/* Page Header */}
      <div className="card bg-white shadow-sm mb-4" style={{ borderRadius: '16px' }}>
        <div className="card-body p-4 d-flex justify-content-between align-items-center">
          <div>
            <h1 className="card-title h2 fw-bold text-dark mb-2">Interviews Overview</h1>
            <p className="card-text text-muted mb-0">Manage your interview campaigns</p>
          </div>
          <button className="btn btn-custom-purple px-4 py-2 fw-semibold">
            Add Interview
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="d-flex gap-3 mb-4">
        <button className="btn btn-dark px-4 py-2 fw-medium" style={{ borderRadius: '12px' }}>
          Filter ▼
        </button>
        <button className="btn btn-dark px-3 py-2 fw-medium" style={{ borderRadius: '12px' }}>
          Sort ▼
        </button>
      </div>

      {/* Interview Cards */}
      <div className="row g-4">
        {/* Frontend Developer Interview Card */}
        <div className="col-12">
          <div className="card shadow-sm" style={{ borderRadius: '16px' }}>
            <div className="card-body p-4">
              {/* Card Header */}
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="flex-grow-1">
                  <h3 className="card-title h5 fw-bold text-dark mb-1">Frontend Developer Interview</h3>
                  <p className="text-muted fw-medium mb-2">Frontend Developer</p>
                  <p className="text-muted small mb-0">React specialist with 3+ years experience</p>
                </div>
                <div className="d-flex align-items-start gap-2">
                  <span className="badge bg-success px-3 py-2 text-uppercase fw-semibold">Published</span>
                  <div className="d-flex gap-1">
                    <button className="btn btn-outline-secondary btn-sm p-2">✏️</button>
                    <button className="btn btn-outline-secondary btn-sm p-2">🗑️</button>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="d-flex gap-4 mb-3">
                <div className="d-flex align-items-center gap-2 text-muted">
                  <span>📝</span>
                  <span>2 Questions</span>
                </div>
                <div className="d-flex align-items-center gap-2 text-muted">
                  <span>👥</span>
                  <span>3 Participants</span>
                </div>
              </div>

              {/* Progress Boxes */}
              <div className="row g-3 mb-3">
                <div className="col-md-4">
                  <div className="p-3 text-center status-completed rounded-3">
                    <div className="h2 fw-bold mb-1">1</div>
                    <div className="fw-semibold small">Completed</div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 text-center status-inprogress rounded-3">
                    <div className="h2 fw-bold mb-1">1</div>
                    <div className="fw-semibold small">In Progress</div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 text-center status-notstarted rounded-3">
                    <div className="h2 fw-bold mb-1">1</div>
                    <div className="fw-semibold small">Not Started</div>
                  </div>
                </div>
              </div>

              {/* Action Tabs */}
              <div className="d-flex gap-3 pt-3 border-top">
                <button className="btn btn-light border d-flex align-items-center gap-2 px-3 py-2">
                  <span>📝</span>
                  <span className="small">Questions (2)</span>
                </button>
                <button className="btn btn-light border d-flex align-items-center gap-2 px-3 py-2">
                  <span>👥</span>
                  <span className="small">Participants (3)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home