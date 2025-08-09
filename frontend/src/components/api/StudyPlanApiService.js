import { apiClient } from "./ApiClient"


export const savePlanApi = (problems) => apiClient.post("/save-plan", problems, {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
})

export const retrievePlansApi = () => apiClient.get("/get-all-plans", {
    headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
})