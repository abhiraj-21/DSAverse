import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./homePage";
import CreateNewStudyPlan from "./CreateNewStudyPlan";

export default function Dsaverese(){
    return(
        <div className="Dsaverse">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />}/>
                    <Route path="/create-plan" element={<CreateNewStudyPlan />}/>
                </Routes>
            </BrowserRouter> 
        </div>
    )
}