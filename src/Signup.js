import {useState} from 'react'

// needs to change names of vairables and come up with css 

function Signup () {
    
    // state for  each form input field, should be updated every keystroke
    const [currentName, setName] = useState("")
    
    const [initalPassword, setInitalPassword] = useState("")
    
    const [confirnedPassword, setConfirmedPassword] = useState("")

    const [currentEmail, setEmail] = useState("")
    
    
    // state for updating error messages  
    const [usernmaeErrorMessage, setUsernameError] = useState("")

    const [initalPasswordErrorMessage, setInitalPasswordError]= useState("")

    const [cofirmedPasswordErrorMessage, setConfirmedPasswordMessage] =useState("")

    //  state for when the form tries to submit each state must be true for form to submit 
    const [usernameStatus, setUsernameStatus]= useState(false)

    const [initalPasswordStatus, setInitalPasswordStatus] = useState(false)

    const [confirnedPasswordStatus, serConfirmedPasswordStatus] = useState(false)

    const [emailStatus, setEmailStatus] = useState(false)


    // updates input fieild state after every key stroke 

    const updateName =(event)=>{
        setName(event.target.value)
    }

    const updateInitalPassword =(event)=>{
        setInitalPassword(event.target.value)
    }

    const updatedConfirmedPassword =(event)=>{
        setConfirmedPassword(event.target.value)
    }

    const updateEmail =(event)=>{
        setEmail(event.target.value)
    }

    // generates an error if the username is to long or short, if the username is 
    // the right length sets username status to true so it can be used for form validation later 

    const usernameBlurr = ()=>{
        if(currentName.length < 6){
            setUsernameError("Your username needs to have at least 6 characters")
        }else if (currentName.length > 12){
            setUsernameError (" Your username needs to have less than 12 charcters")
        }else {
            setUsernameError("")
            setUsernameStatus(true)
        }
    }

    const initalPasswordBlur = () =>{
        // At least one upper case English letter, (?=.*?[A-Z])
        // At least one lower case English letter, (?=.*?[a-z])
        // At least one digit, (?=.*?[0-9])
        // At least one special character, (?=.*?[#?!@$%^&*-])
        // Minimum six and maxium 12 in length ^.{6,12} (with the anchors)
        
        let re = /(?=.*?[#?!@$%^&*-])^.{6,12}$/
        let specialCharcterRe = /(?=.*?[#?!@$%^&*-])/
        
        if(re.test(initalPassword)){
            setInitalPasswordStatus(true)
            setInitalPasswordError("")
        }else if (initalPassword.length < 6){ 
            if(specialCharcterRe.test(initalPassword)){
                setInitalPasswordError("Your password must have at least 6 characters")
            }else{
                setInitalPasswordError("Your password must have at least 6 characters and a speical character")
            }
        }else if(initalPassword.length > 12){
            if(specialCharcterRe.test(initalPassword)){
                setInitalPasswordError("Your password must have less than 12 charcters")
            }else{
                setInitalPasswordError("Your password must have less than 12 charcters and a speical character")
            }
        }
    }
    
    const updatedPasswordBlur = ()=>{
        if(confirnedPassword === initalPassword){
            serConfirmedPasswordStatus(true)
            setConfirmedPasswordMessage("")
        }else {
                setConfirmedPasswordMessage("Your passwords do not match")
        }
    }

    const updateEmailBlur =()=>{
        setEmailStatus(true)
    }

    // will check overall form validity the send post request to node back end. 
    const formSubmit = (event)=>{
        event.preventDefault()
        if(usernameStatus && initalPasswordStatus && confirnedPasswordStatus && emailStatus ){
        
        fetch('http://localhost:5000/test',{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "username": currentName,
                "password": initalPassword,
                "email": currentEmail
              })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        
        
        
        
        
        
            // const postRequestObject = {
            //     "username": usernameStatus,
            //     "password": initalPassword,
            //     "email": currentEmail
            // }
        }
    }

    return (
        <form onSubmit={formSubmit}>
            <input type="text" placeholder="Username" onBlur={usernameBlurr} onChange={updateName}/>
            <br />
            {usernmaeErrorMessage}
            <br />
            <input type="text" placeholder="Password" onChange={updateInitalPassword} onBlur={initalPasswordBlur}/>
            <br />
            {initalPasswordErrorMessage}
            <br />
            <input type="text" placeholder="Confirm Password" onChange={updatedConfirmedPassword} onBlur={updatedPasswordBlur}/>
            <br /> 
            {cofirmedPasswordErrorMessage}
            <br />
            <input type="text" placeholder="Email address" onChange={updateEmail} onBlur={updateEmailBlur}/>
            <br />
            <button > submit</button>
        </form>
        )
}
export default Signup