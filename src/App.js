import {useState, useCallback, useEffect} from "react"
import { AuthContext } from "./context/auth-context";
import {Routes,Route} from "react-router-dom"
import Signup from "./Signup";
import Homepage from "./Homepage";


function App() {

  const [token, setToken] = useState(false)

  const login = useCallback( (token) => {
    setToken(token)
    localStorage.setItem('token', token.token)
    // debugger
  },[])

  const logout = useCallback( () => {
    // debugger
    setToken(null)
    localStorage.removeItem("token")
  },[])

  useEffect(()=>{
    const storedToken = localStorage.getItem("token")
    if(storedToken){
      login(storedToken)
    }
    // debugger
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
    </Routes>)
  }

  return (
    <AuthContext.Provider value ={{login: login, logout: logout}} >
      {routes}
      {/* <Routes>
        <Route  path ="/" element={<Signup />} />
        <Route  path = "/homepage" element={<Homepage />}/>
      </Routes> */}
    </AuthContext.Provider> 
  )
}

export default App;
