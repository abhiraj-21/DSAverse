import { Link } from "react-router-dom";
import {useAuth} from "../Security/AuthContext.jsx";

function Header() {

    const authContext = useAuth()
    const isAuthenticated = authContext.isAuthenticated

    return (
    <div className="container">
      <header className="border-bottom border-light border-5 mb-5 p-2">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a
              className="navbar-brand"
              href="https://www.linkedin.com/in/abhiraj07/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Abhiraj
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    {isAuthenticated && <Link className="nav-link" to="/plans">View Plans</Link>}
                </li>
                <li className="nav-item">
                    {isAuthenticated && <Link className="nav-link" to="/create-plan">Create Plan</Link>}
                </li>
              </ul>

              <ul className="navbar-nav">
                <li className="nav-item">
                    {!isAuthenticated && <Link className="nav-link" to="/login">Login</Link>}
                </li>
                <li className="nav-item">
                    {isAuthenticated && <Link className="nav-link" to="/logout">Logout</Link>}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
