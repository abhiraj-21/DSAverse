import { useNavigate } from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-4 items-center justify-center min-h-screen min-w-screen">
            <h1 className=" text-5xl font-bold text-center text-gray-800">Welcome to DSAverse</h1>

            <div className="flex items-center justify-center gap-4">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-500/90 transition-colors hover:cursor-pointer"
                    onClick={() => navigate("/plans")}
                >
                    View Existing Study Plans
                </button>

                <button
                    className=" text-black px-4 py-2 border-1 rounded hover:bg-blue-500/90 transition-colors hover:cursor-pointer hover:text-white"
                    onClick={() => navigate("/create-plan")}
                >
                    Create New Study Plan
                </button>
            </div>
        </div>
    );
}

export default HomePage;
