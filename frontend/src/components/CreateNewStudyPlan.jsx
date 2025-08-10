import { useState } from "react";
import { savePlanApi } from "./api/StudyPlanApiService";
import { useNavigate } from "react-router-dom";

function CreateNewStudyPlan() {
    const [problemList, setProblemList] = useState("");
    const [textAreaIsEmpty, setTextAreaEmpty] = useState(false);

    const navigate = useNavigate();

    function handleSubmit(event) {
        if (!problemList || problemList.trim() === "") {
            setTextAreaEmpty(true);
            return;
        }

        const problems = { problemList: problemList.split("\n") };

        savePlanApi(problems)
            .then(() => navigate("/plans"))
            .catch((error) => console.log(error))
            .finally(() => console.log("cleanUP"));
    }

    function handleTextAreaChange(event) {
        setProblemList(event.target.value);
        if (textAreaIsEmpty) setTextAreaEmpty(false); // Clear error once user starts typing
    }

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 text-light">
            <div className="w-100" style={{ maxWidth: "600px" }}>
                <h2 className="mb-4 text-center">Create New Study Plan</h2>

                {textAreaIsEmpty && (
                    <div className="alert alert-warning" role="alert">
                        Please enter at least one problem.
                    </div>
                )}

                <div className="mb-3">
                    <label htmlFor="problemList" className="form-label">
                        Enter Your Problems (One per line)
                    </label>
                    <textarea
                        id="problemList"
                        className="form-control"
                        rows="10"
                        placeholder="e.g., Two Sum\nBinary Search Tree\n..."
                        onChange={handleTextAreaChange}
                    ></textarea>
                </div>

                <div className="d-grid">
                    <button className="btn btn-success" onClick={handleSubmit}>
                        Submit Plan
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateNewStudyPlan;
