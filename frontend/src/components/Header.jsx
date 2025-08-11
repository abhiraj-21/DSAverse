import { Link } from "react-router-dom";
import { useAuth } from "../Security/AuthContext.jsx";

function Header() {
    const authContext = useAuth();
    const isAuthenticated = authContext.isAuthenticated;

    return (
        <header className=" bg-indigo-300 text-black shadow-lg fixed top-0 left-0 right-0 z-50 text-xl">
            <nav className="flex p-4">
                <div className="flex items-center justify-between w-full">
                    <a
                        href="https://www.linkedin.com/in/abhiraj07/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <h1 className="text-3xl" >Abhiraj</h1>
                    </a>

                    <div className="flex items-center space-x-4">
                        <ul className="flex items-center space-x-4">
                            <li className="flex items-center space-x-4">
                                <Link to="/">Home</Link>
                            </li>
                            {isAuthenticated && (
                                <>
                                    <li>
                                        <Link to="/plans">View Plans</Link>
                                    </li>
                                    <li>
                                        <Link to="/create-plan">Create Plan</Link>
                                    </li>
                                </>
                            )}
                        </ul>

                        <ul>
                            {!isAuthenticated ? (
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                            ) : (
                                <li>
                                    <Link to="/logout">Logout</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
