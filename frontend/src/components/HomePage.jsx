import { useState } from "react"

function HomePage(){

    const [problemList, setProblemList] = useState(null)
    const [textAreaIsEmpty, setTextAreaEmpty] = useState(false)

    function handleSubmit(event){
        if(!problemList || problemList.trim() === ""){
            setTextAreaEmpty(true)
            return;
        }
        
        const problems = problemList.split("\n")
        console.log(problems)
    }

    function handleTextAreaChange(event){
        setProblemList(event.target.value)
    }

    return(
        <div>
            {textAreaIsEmpty && <div>Enter atleast one line</div>}
            <div>
                <label>Enter Your Problems Here (One Problem Per Line): </label>
            </div>
            <textarea cols="30" rows="10" onChange={handleTextAreaChange}></textarea>
            <div>
                <button className="btn btn-success" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default HomePage