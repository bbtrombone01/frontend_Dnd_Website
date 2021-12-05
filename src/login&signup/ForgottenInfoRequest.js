import {useState} from "react"


function ForgottenInfoRequest (){

    // state for  user input 
    const [email, setEmail] = useState("")

    // state for display messages 

    const [displayMessage, setDisplayMessage] = useState("")

    // changes email state on every key stroke

    const setEmailState =(event)=>{
        setEmail(event.target.value)
    }

    // POST request, sends user input to backend for validation 
    // backend will retun a message based on Email status.  

    const test = async (event)=>{
        event.preventDefault()
        
        try{

           let testCase = await fetch("http://localhost:5000/forgot",{
                method:"POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: email
                })
            })

            let finalmessage =  await testCase.json()
            
            setDisplayMessage(finalmessage.message)

        }catch(error){
            setDisplayMessage("Could not connect to server, please try again at a later time.")
        }
    }

    return <div>
        <p> please enter your email and we will send you an email with your username and link to reset your password. </p>
        <form onSubmit={test}>
            <input type="text" placeholder={"email"} onChange={setEmailState} />
            <button> submit</button>
        </form>
        {displayMessage}
    </div>
}

export default ForgottenInfoRequest