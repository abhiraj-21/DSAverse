import { useNavigate } from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
            <h1 className="display-4 mb-4">Welcome to DSAverse</h1>

            <div className="d-flex flex-column flex-sm-row gap-3 mt-3">
                <button
                    className="btn btn-outline-primary"
                    onClick={() => navigate("/plans")}
                >
                    View Existing Study Plans
                </button>

                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/create-plan")}
                >
                    Create New Study Plan
                </button>
            </div>
        </div>
    );
}

export default HomePage;
