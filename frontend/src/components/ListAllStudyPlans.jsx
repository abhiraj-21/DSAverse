import { useEffect, useState } from "react";
import { retrievePlansApi, updateProblemStatusApi } from "./api/StudyPlanApiService";

function ListAllStudyPlans() {
    const [plan, setPlan] = useState(null);

    useEffect(() => {
        refreshStudyPlans();
    }, []);

    function refreshStudyPlans() {
        retrievePlansApi()
            .then((response) => setPlan(response.data))
            .catch((error) => console.log(error));
    }

    const updateProblem = (id, isChecked) => {
        updateProblemStatusApi(id, isChecked)
            .then(() => refreshStudyPlans())
            .catch((error) => console.log(error));
    };

    return (
        <div className="container my-5 text-light">
            <h2 className="mb-4 text-center">Your Study Plan</h2>

            <div className="table-responsive">
                <table className="table table-dark table-hover table-bordered align-middle">
                    <thead className="table-light text-dark">
                    <tr>
                        <th scope="col">Plan ID</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Problem</th>
                        <th scope="col">Completed</th>
                    </tr>
                    </thead>
                    <tbody>
                    {plan?.problemList?.map((problem, index) => (
                        <tr key={problem.id}>
                            <td>{index === 0 ? plan.id : ""}</td>
                            <td>{index === 0 ? plan.createdAt : ""}</td>
                            <td>{problem.problemName}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={problem.completed}
                                    onChange={(e) => updateProblem(problem.id, e.target.checked)}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListAllStudyPlans;
