import { useEffect, useState } from "react"
import {retrievePlansApi, updateProblemStatusApi} from "./api/StudyPlanApiService"

function ListAllStudyPlans(){

    const [plan, setPlan] = useState(null)

    useEffect(
        () => refreshStudyPlans(),[]
    )

    function refreshStudyPlans(){
        retrievePlansApi().then( (response) => setPlan(response.data))
                          .catch( (error) => console.log(error))
    }

    const updateProblem = (id, isChecked) =>{
        updateProblemStatusApi(id, isChecked).then( () => refreshStudyPlans())
        .catch( (error) => console.log(error) )
    }

    return(
        <div className="ListAllStudyPlans">
            <h1>Your Plans</h1>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Created At</td>
                            <td>Problem List</td>
                        </tr>
                    </thead>
                    <tbody>
                        {plan?.problemList?.map((problem, index) => (
                            <tr key={problem.id}>
                                <td>{index === 0 ? plan.id : ""}</td>
                                <td>{index === 0 ? plan.createdAt : ""}</td>
                                <td>{problem.problemName}</td>
                                <td><input type='checkbox' checked={problem.completed} onChange={(e) => updateProblem(problem.id, e.target.checked)} /></td>
                            </tr>
                        ))}
                    </tbody>    
                </table>
            </div>
        </div>
    )
}

export default ListAllStudyPlans