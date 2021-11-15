import React, {useContext} from "react"
import {AuthContext} from "./context/auth-context"

function Homepage(){

    const auth = useContext(AuthContext)
    
    return (
        <div>
        <p> i am the Homepage for now </p>
        <button onClick={auth.logout}> click me to logout</button>
        </div>
    )
}


export default Homepage