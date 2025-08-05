import { apiClient } from "./ApiClient"


export const savePlanApi = (problems) => apiClient.post("/save-plan", problems)