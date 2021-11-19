import {useNavigate} from "react-router-dom"
import {useState,useContext} from "react"
import { AuthContext } from "./context/auth-context"


function Login() {

    const naviagte = useNavigate()

    const auth = useContext(AuthContext)

    const [username, setUsername] = useState("")

    const [password, setPassword] = useState("")

    const updateUsername =(event)=>{
        setUsername(event.target.value)
    }

    const updatePassword =(event)=>{
        setPassword(event.target.value)
    }

    const changepage = ()=>{
        naviagte("/")
    }

    const loginRequest = async (event)=>{
        event.preventDefault()

        try{
            
          const test1 = await  fetch('http://localhost:5000/login',{
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify( {
                    "username": username,
                    "password": password
                })
            })

            let test2 = await test1.json()

            auth.login(test2.token)
            changepage()

            
        }catch(error){

             console.log(error)
        }

        // debugger
    }

    return (
        <div>
            <form onSubmit={loginRequest}>
                <input 
                type="text" 
                placeholder="username" 
                onChange={updateUsername}
                />
                <br />
                <input 
                type="text" 
                placeholder="password"
                onChange={updatePassword}
                />
                <br />
                <button> submit</button>
            </form>
            <br />
            <button onClick={changepage}> sign up </button>
        </div>
    )

}

export default Login