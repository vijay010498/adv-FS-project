// Header.js

import { Link, useLocation } from "react-router-dom";


function Header() {
  const location = useLocation();

  return (
    <header id="nav-color" className="fixed-top">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <span className="navbar-brand">
            <h3>Employee Management System</h3>
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  to="/"
                  className={
                    location.pathname === "/"
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  Employees
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/add-employee"
                  className={
                    location.pathname === "/add-employee"
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  Add Employee
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
