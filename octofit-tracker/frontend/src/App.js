import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  const navItems = [
    { to: '/activities', label: 'Activities' },
    { to: '/leaderboard', label: 'Leaderboard' },
    { to: '/teams', label: 'Teams' },
    { to: '/users', label: 'Users' },
    { to: '/workouts', label: 'Workouts' }
  ];

  return (
    <Router>
      <div className="app-shell">
        <nav className="navbar navbar-expand-lg app-nav sticky-top">
          <div className="container py-2">
            <Link className="navbar-brand fw-bold" to="/">Octofit Tracker</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#octofitMainNav"
              aria-controls="octofitMainNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="octofitMainNav">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {navItems.map(({ to, label }) => (
                  <li className="nav-item" key={to}>
                    <NavLink
                      className={({ isActive }) => `nav-link px-3 ${isActive ? 'active' : ''}`}
                      to={to}
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>

        <main className="container py-4">
          <Routes>
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route
              path="/"
              element={(
                <section className="hero card border-0 shadow-sm">
                  <div className="card-body p-4 p-md-5">
                    <p className="text-uppercase fw-semibold mb-2 hero-kicker">Fitness and teamwork</p>
                    <h1 className="display-5 fw-bold mb-3">Track every rep, run and result in one place.</h1>
                    <p className="lead text-secondary mb-4">
                      Octofit helps teams monitor activities, compare leaderboards and discover personalized workouts.
                    </p>
                    <div className="d-flex flex-wrap gap-2">
                      <Link className="btn btn-primary btn-lg" to="/activities">View activities</Link>
                      <Link className="btn btn-outline-primary btn-lg" to="/leaderboard">Open leaderboard</Link>
                    </div>
                  </div>
                </section>
              )}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
