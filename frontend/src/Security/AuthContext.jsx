import {createContext, useContext, useState} from "react";
import {loginApi} from "../components/api/AuthApiService.js";

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }){

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [username, setUsername] = useState(null)

    const login = async (username, password) => {
        const credentials = { username, password }

        try {
            const response = await loginApi(credentials)

            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token)
                setIsAuthenticated(true)
                setUsername(response.data.username)
                return true
            } else {
                setIsAuthenticated(false)
                return false
            }

        } catch (error) {
            console.log('Login Failed', error)
            setIsAuthenticated(false)
            return false
        }
    }

    const logout = () => {
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={ {login, logout, username, isAuthenticated} }>
            { children }
        </AuthContext.Provider>
    )
}