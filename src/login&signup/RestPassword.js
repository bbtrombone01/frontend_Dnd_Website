import { useState } from "react"
import {useParams} from "react-router-dom"

function ResetPassword(){
    
    const params = useParams()

    // state for holding info
    const [newPassword, setNewPassword]=useState("")

    const [confirmedPassword, setConfirmedPassword]= useState("")

    // state for checking validations 

    const [newPasswordStatus, setNewPasswordStatus] = useState(false)

    const [confirmedPasswordStatus, setConfirmedPasswordStatus] =useState(false)

    const [formState, setFormState] =useState(false)
    




    return <div>

        <p> please enter your new password </p>
        <form>
            <input type="text" placeholder="New Password" />
            <br />
            <input type="text" placeholder="Confirm Password" />
        </form>
    </div>
}

export default ResetPassword