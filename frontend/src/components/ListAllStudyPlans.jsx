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
        <div className='flex flex-col items-center justify-center min-h-screen min-w-screen gap-4'>
            <h2 className='text-3xl font-semibold'>Your Study Plan</h2>

            <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
                <table className='w-full text-sm text-left rtl:text-right text-gray-400'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                        <th scope="col" className='px-6 py-3'>Plan ID</th>
                        <th scope="col" className='px-6 py-3'>Created At</th>
                        <th scope="col" className='px-6 py-3'>Problem</th>
                        <th scope="col" className='px-6 py-3'>Completed</th>
                    </tr>
                    </thead>
                    <tbody>
                    {plan?.problemList?.map((problem, index) => (
                        <tr key={problem.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'>
                            <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{index === 0 ? plan.id : ""}</td>
                            <td className='px-6 py-4 text-red-100'>{index === 0 ? plan.createdAt : ""}</td>
                            <td className='px-6 py-4 text-red-100'>{problem.problemName}</td>
                            <td className='px-6 py-4 text-red-100'>
                                <input
                                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                                    type="checkbox"
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
