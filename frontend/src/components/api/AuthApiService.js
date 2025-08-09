import {apiClient} from "./ApiClient.js";

export const loginApi = (credentials) => apiClient.post("/login", credentials )

export const registerApi = (credentials) => apiClient.post("/register", credentials )