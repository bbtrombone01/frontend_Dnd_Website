import {useNavigate} from "react-router-dom"
import {useState,useContext} from "react"
import { AuthContext } from "./context/auth-context"


function Login() {

    const naviagte = useNavigate()

    const auth = useContext(AuthContext)

    // sets state for input fields
    const [username, setUsername] = useState("")

    const [password, setPassword] = useState("")

    // set state for handling error messages

    const [errorMessage, setErrorMessage] =useState("")

    // updates state after each keystroke 
    const updateUsername =(event)=>{
        setUsername(event.target.value)
    }

    const updatePassword =(event)=>{
        setPassword(event.target.value)
    }

    // navigtes away to login page when there is no token
    // navigates to homepage when the user has a token
    const changePage = ()=>{
        naviagte("/")
    }


    const loginRequest = async (event)=>{
        
        event.preventDefault()

        // fetch request to see if the user exist in the system
        try{  
          const fetchedData = await  fetch('http://localhost:5000/login',{
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify( {
                    "username": username,
                    "password": password
                })
            })

            // may want to add try catch blocks 
            let userInfo = await fetchedData.json()

            // expect a userInfo.message there is a problem
            // else you should have a token
            if(userInfo){
                if(userInfo.message){
                    setErrorMessage(userInfo.message)
                }else{
                    auth.login(userInfo.token)
                    changePage()
                }
            }
        }catch(error){
             setErrorMessage("Could not connect to the server at this time please try again later")
        }
    }

    return (
        <div>
            <form onSubmit={loginRequest}>
                <input type="text" placeholder="username" onChange={updateUsername}/>
                <br/>
                <input type="text" placeholder="password" onChange={updatePassword}/>
                <br/>
                <button> submit</button>
            </form>
            {errorMessage}
            <br/>
            <button onClick={changePage}> sign up </button>
        </div>
    )
}

export default Login