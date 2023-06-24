import { PAGES } from "../enum";
function Header({ currentPage, changePage }) {
  const onMenuClick = (value) => {
    changePage(value);
  };
  return (
    <header id="nav-color" className="fixed-top">
      <nav  className="navbar navbar-expand-lg navbar-dark">
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
                <span
                  className={
                    currentPage === PAGES.EMPLOYEE_LIST
                      ? "nav-link active"
                      : "nav-link"
                  }
                  onClick={() => onMenuClick(PAGES.EMPLOYEE_LIST)}
                >
                  Employees
                </span>
              </li>
              <li className="nav-item">
                <span
                  className={
                    currentPage === PAGES.ADD_EMPLOYEE
                      ? "nav-link active"
                      : "nav-link"
                  }
                  onClick={() => onMenuClick(PAGES.ADD_EMPLOYEE)}
                >
                  Add Employee
                </span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
