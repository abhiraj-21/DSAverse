import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import HomePage from "./homePage";
import CreateNewStudyPlan from "./CreateNewStudyPlan";
import ListAllStudyPlans from "./ListAllStudyPlans";
import Header from "./Header";
import Login from "./Login.jsx";
import AuthProvider, {useAuth} from "../Security/AuthContext.jsx";
import Welcome from "./Welcome.jsx";
import Logout from "./Logout.jsx";
import Register from "./Register.jsx";

export default function Dsaverese(){

    const AuthenticatedRoute = ({children}) => {
        const authContext = useAuth()
        const isAuthenticated = authContext.isAuthenticated
        if(isAuthenticated){
            return children
        }else{
            return <Navigate to="/" />
        }
    }

    return(
        <div className="Dsaverse">
            <AuthProvider>
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path="/" element={<HomePage />}/>
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path="/create-plan" element={
                            <AuthenticatedRoute>
                                <CreateNewStudyPlan />
                            </AuthenticatedRoute>
                        }/>
                        <Route path="/plans" element={
                            <AuthenticatedRoute>
                                <ListAllStudyPlans />
                            </AuthenticatedRoute>
                        }/>
                        <Route path='/welcome/:username' element={
                            <AuthenticatedRoute>
                                <Welcome />
                            </AuthenticatedRoute>
                        } />
                        <Route path='/logout' element={
                            <AuthenticatedRoute>
                                <Logout />
                            </AuthenticatedRoute>
                        } />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}