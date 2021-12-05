import {useState, useCallback, useEffect} from "react"
import { AuthContext } from "./context/auth-context";
import {Routes,Route} from "react-router-dom"
import Signup from "./login&signup/Signup";
import Homepage from "./Homepage";
import Login from "./login&signup/Login";
import ForgottenInfoRequest from "./login&signup/ForgottenInfoRequest";
import ResetPassword from "./login&signup/RestPassword";


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
      <Route path="/forgotInfo" element={<ForgottenInfoRequest />}/>
      <Route path ="/reset-password/:params" element={<ResetPassword />} />
    </Routes>)
  }

  return (
    <AuthContext.Provider value ={{login: login, logout: logout}} >
      {routes}
    </AuthContext.Provider> 
  )
}

export default App;
