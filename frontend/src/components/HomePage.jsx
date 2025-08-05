import { useNavigate } from "react-router-dom";

function HomePage(){

    const navigate = useNavigate()

    function onNewStudyPlanClick(){
        navigate("/create-plan")
    }

    function onViewPlanClick(){
        navigate("/plans")
    }

    return(
        <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "80vh", // Adjust so it doesn't collide with fixed header
                    }}>
                        <h1>Welcome to DSAverse</h1>
                        <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
                            <button onClick={() => navigate("/plans")}>View Existing Study Plans</button>
                            <button onClick={() => navigate("/create-plan")}>Create New Study Plans</button>
                        </div>
        </div>
    )
}

export default HomePage