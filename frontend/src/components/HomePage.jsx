import { useNavigate } from "react-router-dom";

function HomePage(){

    const navigate = useNavigate()

    function onNewStudyPlanClick(){
        navigate("/create-plan")
    }

    return(
        <div className="container">
            <button className="btn btn-success m-5">View Existing Study Plans</button>
            <button className="btn btn-success m-5" onClick={onNewStudyPlanClick}>Create New Study Plans</button>
        </div>
    )
}

export default HomePage