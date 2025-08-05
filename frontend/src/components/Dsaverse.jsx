import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./homePage";
import CreateNewStudyPlan from "./CreateNewStudyPlan";
import ListAllStudyPlans from "./ListAllStudyPlans";
import Header from "./Header";

export default function Dsaverese(){
    return(
        <div className="Dsaverse">
            <BrowserRouter>
                <Header />  
                <Routes>
                    <Route path="/" element={<HomePage />}/>
                    <Route path="/create-plan" element={<CreateNewStudyPlan />}/>
                    <Route path="/plans" element={<ListAllStudyPlans />}/>
                </Routes>
            </BrowserRouter> 
        </div>
    )
}