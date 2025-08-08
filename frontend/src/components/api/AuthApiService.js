import {apiClient} from "./ApiClient.js";

export const loginApi = (credentials) => apiClient.post("/login", credentials )