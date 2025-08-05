import { apiClient } from "./ApiClient"


export const savePlanApi = (problems) => apiClient.post("/save-plan", problems)

export const retrievePlansApi = () => apiClient.get("/get-all-plans")