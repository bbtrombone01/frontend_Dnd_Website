import {createContext} from "react"

export const AuthContext  = createContext({
    isLogedin: false,
    token: null, 
    login: ()=>{}, 
    logout: ()=>{}})