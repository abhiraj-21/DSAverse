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
        <div>
            <div>
                <h2>Create New Study Plan</h2>

                {textAreaIsEmpty && (
                    <div>
                        Please enter at least one problem.
                    </div>
                )}

                <div>
                    <label htmlFor="problemList">
                        Enter Your Problems (One per line)
                    </label>
                    <textarea
                        id="problemList"
                        rows="10"
                        placeholder="e.g., Two Sum\nBinary Search Tree\n..."
                        onChange={handleTextAreaChange}
                    ></textarea>
                </div>

                <div>
                    <button onClick={handleSubmit}>
                        Submit Plan
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateNewStudyPlan;
