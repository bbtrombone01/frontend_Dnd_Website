import {useState, useCallback, useEffect} from "react"
import { AuthContext } from "./context/auth-context";
import {Routes,Route} from "react-router-dom"
import Signup from "./Signup";
import Homepage from "./Homepage";
import Login from "./Login";


function App() {

  const [token, setToken] = useState(false)

  const login = useCallback( (token) => {
    setToken(token)
    localStorage.setItem('token', token.token)
  },[])

  const logout = useCallback( () => {
    setToken(null)
    localStorage.removeItem("token")
  },[])

  useEffect(()=>{
  const storedToken = localStorage.getItem("token")
    if(storedToken){
      login(storedToken)
    }
  },[login])

  let routes;

  if(token){
    routes = (
        <Routes >
          <Route path = "/" element ={<Homepage />}/>
        </Routes>
    )
  }else{
    routes = (
    <Routes>
      <Route path ="/" element={<Signup />}/>
      <Route path ="/login" element={<Login />}/>
    </Routes>)
  }

  return (
    <AuthContext.Provider value ={{login: login, logout: logout}} >
      {routes}
    </AuthContext.Provider> 
  )
}

export default App;
