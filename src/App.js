import {Routes,Route} from "react-router-dom"
import Signup from "./Signup";
import Homepage from "./homepag";


function App() {
  return <Routes>
    <Route  path ="/" element={<Signup />} />
    <Route  path = "/homepage" element={<Homepage />}/>
  </Routes>
}

export default App;
