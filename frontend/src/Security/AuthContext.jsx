import {createContext, useContext, useEffect, useState} from "react";
import {loginApi, registerApi} from "../components/api/AuthApiService.js";

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }){

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [username, setUsername] = useState(null)

    useEffect(()=>{
        load()
    }, [])

    const load = () => {
        if(localStorage.getItem('token') != null && localStorage.getItem('username') != null){
            setIsAuthenticated(true)
            setUsername(localStorage.getItem('username'))
        }
    }

    const login = async (username, password) => {
        const credentials = { username, password }

        try {
            const response = await loginApi(credentials)

            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('username', response.data.username)
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
        setUsername(null)
        localStorage.removeItem('token')
        localStorage.removeItem('username')
    }

    const register = async (username, password, email, isActivated ) => {
        const credentials = { username, password, email, isActivated }

        try{
            const response = await registerApi(credentials)
            console.log(response.status)
            return response.status === 201
        }catch(error){
            console.log("Registration Failed",error)
            return false
        }
    }

    return (
        <AuthContext.Provider value={ {login, logout, username, isAuthenticated, register} }>
            { children }
        </AuthContext.Provider>
    )
}